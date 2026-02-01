import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Sidebar, SidebarContent, SidebarHeader, SidebarSeparator, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { exampleCategories, Example } from '@/data/examples';
import { WorkspaceExplorer } from '../Editors/WorkspaceExplorer';

interface ExamplesSidebarProps {
  onSelectExample: (example: Example) => void;
  isOpen: boolean;
  onToggle: () => void;
  onFileSelect: (path: string, content: string) => void;
  selectedFile: string | null;
}

export function ExamplesSidebar({ onSelectExample, isOpen, onToggle, onFileSelect, selectedFile }: ExamplesSidebarProps) {
  const { open } = useSidebar();
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="font-semibold text-lg">NINŎ Playground</h2>
        <SidebarTrigger onClick={onToggle} />
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="flex-1">
          <Accordion type="multiple" defaultValue={['Data Generation']} className="px-2">
            {exampleCategories.map((category) => (
              <AccordionItem key={category.name} value={category.name}>
                <AccordionTrigger className="text-sm py-2 hover:no-underline">
                  {category.name}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1">
                    {category.examples.map((example) => (
                      <Button
                        key={example.id}
                        variant="ghost"
                        size="sm"
                        className="justify-start h-auto py-1.5 px-2 text-xs font-normal"
                        onClick={() => onSelectExample(example)}
                      >
                        <div className="text-left">
                          <div className="font-medium">{example.name}</div>
                          <div className="text-muted-foreground text-[10px]">
                            {example.description}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
        <SidebarSeparator />
        <WorkspaceExplorer onFileSelect={onFileSelect} selectedFile={selectedFile} />
      </SidebarContent>
    </Sidebar>
  );
}
