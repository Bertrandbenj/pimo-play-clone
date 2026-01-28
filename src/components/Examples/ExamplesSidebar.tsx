import { ChevronRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { exampleCategories, Example } from '@/data/examples';

interface ExamplesSidebarProps {
  onSelectExample: (example: Example) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function ExamplesSidebar({ onSelectExample, isOpen, onToggle }: ExamplesSidebarProps) {
  if (!isOpen) {
    return (
      <div className="h-full border-r bg-muted/30 flex flex-col items-center py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="writing-mode-vertical rotate-180 h-auto py-4 px-2"
        >
          <span className="flex items-center gap-1">
            Examples
            <ChevronRight className="h-3 w-3" />
          </span>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-64 h-full border-r bg-muted/30 flex flex-col">
      <div className="px-3 py-2 border-b flex items-center justify-between">
        <h2 className="font-semibold text-sm">Examples</h2>
        <Button variant="ghost" size="sm" onClick={onToggle} className="h-6 w-6 p-0">
          <ChevronRight className="h-4 w-4 rotate-180" />
        </Button>
      </div>
      
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
    </div>
  );
}
