import { useState, useCallback } from 'react';
import { PimoHeader } from '@/components/Layout/PimoHeader';
import { ExamplesSidebar } from '@/components/Examples/ExamplesSidebar';
import { MaskingConfigPanel } from '@/components/Editors/MaskingConfigPanel';
import { InputEditor } from '@/components/Editors/InputEditor';
import { OutputViewer } from '@/components/Editors/OutputViewer';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import { executePimo } from '@/services/pimoApi';
import { defaultExample, Example } from '@/data/examples';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [yamlConfig, setYamlConfig] = useState(defaultExample.yaml);
  const [jsonInput, setJsonInput] = useState(defaultExample.input);
  const [jsonOutput, setJsonOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const handleExecute = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await executePimo(yamlConfig, jsonInput);
      if (result.error) {
        toast({
          title: "Execution Error",
          description: result.error,
          variant: "destructive",
        });
        setJsonOutput('');
      } else {
        setJsonOutput(result.output);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [yamlConfig, jsonInput]);
  
  const handleSelectExample = useCallback((example: Example) => {
    setYamlConfig(example.yaml);
    setJsonInput(example.input);
    setJsonOutput('');
    toast({
      title: "Example Loaded",
      description: example.name,
    });
  }, []);
  
  return (
    <div className="h-screen flex flex-col bg-background">
      <PimoHeader />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Examples Sidebar */}
        <ExamplesSidebar
          onSelectExample={handleSelectExample}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        
        {/* Main Editor Area */}
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* Left Panel - Masking Config */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <MaskingConfigPanel
              yamlValue={yamlConfig}
              onYamlChange={setYamlConfig}
            />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Right Panel - Input/Output */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={50} minSize={20}>
                <InputEditor value={jsonInput} onChange={setJsonInput} />
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              <ResizablePanel defaultSize={50} minSize={20}>
                <OutputViewer
                  value={jsonOutput}
                  onRefresh={handleExecute}
                  isLoading={isLoading}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Index;
