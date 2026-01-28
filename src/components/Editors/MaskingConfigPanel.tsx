import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { YamlEditor } from './YamlEditor';
import { GraphView } from './GraphView';
import { LocalStorageEditor } from './LocalStorageEditor';
import { FileCode, GitBranch, HardDrive } from 'lucide-react';

interface MaskingConfigPanelProps {
  yamlValue: string;
  onYamlChange: (value: string) => void;
}

export function MaskingConfigPanel({ yamlValue, onYamlChange }: MaskingConfigPanelProps) {
  const handleLoadFromLocal = (yaml: string) => {
    onYamlChange(yaml);
  };
  
  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="yaml" className="flex flex-col h-full">
        <div className="border-b px-2">
          <TabsList className="h-10 bg-transparent">
            <TabsTrigger value="yaml" className="gap-1.5 data-[state=active]:bg-muted">
              <FileCode className="h-3.5 w-3.5" />
              YAML
            </TabsTrigger>
            <TabsTrigger value="graph" className="gap-1.5 data-[state=active]:bg-muted">
              <GitBranch className="h-3.5 w-3.5" />
              Graph
            </TabsTrigger>
            <TabsTrigger value="local" className="gap-1.5 data-[state=active]:bg-muted">
              <HardDrive className="h-3.5 w-3.5" />
              Local
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="yaml" className="flex-1 m-0 overflow-hidden">
          <YamlEditor value={yamlValue} onChange={onYamlChange} />
        </TabsContent>
        
        <TabsContent value="graph" className="flex-1 m-0 overflow-hidden">
          <GraphView yamlConfig={yamlValue} />
        </TabsContent>
        
        <TabsContent value="local" className="flex-1 m-0 overflow-hidden">
          <LocalStorageEditor onLoadToMain={handleLoadFromLocal} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
