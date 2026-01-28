import { useMemo } from 'react';
import { Card } from '@/components/ui/card';

interface GraphViewProps {
  yamlConfig: string;
}

interface MaskNode {
  selector: string;
  maskType: string;
  details: string;
}

function parseYamlToNodes(yaml: string): MaskNode[] {
  const nodes: MaskNode[] = [];
  
  // Simple YAML parsing for visualization
  const lines = yaml.split('\n');
  let currentSelector = '';
  let currentMask = '';
  
  for (const line of lines) {
    const selectorMatch = line.match(/jsonpath:\s*["']?([^"'\n]+)["']?/);
    if (selectorMatch) {
      currentSelector = selectorMatch[1];
    }
    
    const maskMatch = line.match(/^\s+(randomChoiceInUri|randomDate|randomInt|regex|randomUUID|constant|hash|remove|template|ff1|weightedChoice|add|masks):/);
    if (maskMatch && currentSelector) {
      currentMask = maskMatch[1];
      nodes.push({
        selector: currentSelector,
        maskType: currentMask,
        details: line.trim(),
      });
      currentSelector = '';
    }
  }
  
  return nodes;
}

export function GraphView({ yamlConfig }: GraphViewProps) {
  const nodes = useMemo(() => parseYamlToNodes(yamlConfig), [yamlConfig]);
  
  if (nodes.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <p className="text-lg font-medium">No masking rules detected</p>
          <p className="text-sm mt-1">Add masking configuration in the YAML tab</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full p-4 overflow-auto bg-muted/30">
      <div className="flex flex-col gap-4">
        {/* Input Node */}
        <div className="flex justify-center">
          <Card className="px-4 py-2 bg-primary text-primary-foreground font-medium">
            Input JSON
          </Card>
        </div>
        
        {/* Arrow */}
        <div className="flex justify-center">
          <div className="w-0.5 h-6 bg-border" />
        </div>
        
        {/* Mask Nodes */}
        {nodes.map((node, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <Card className="px-4 py-3 min-w-[200px] max-w-[300px]">
              <div className="text-xs text-muted-foreground mb-1">Selector</div>
              <div className="font-mono text-sm mb-2 text-primary">{node.selector}</div>
              <div className="text-xs text-muted-foreground mb-1">Mask</div>
              <div className="font-medium text-sm">{node.maskType}</div>
            </Card>
            
            {index < nodes.length - 1 && (
              <div className="w-0.5 h-4 bg-border" />
            )}
          </div>
        ))}
        
        {/* Arrow */}
        <div className="flex justify-center">
          <div className="w-0.5 h-6 bg-border" />
        </div>
        
        {/* Output Node */}
        <div className="flex justify-center">
          <Card className="px-4 py-2 bg-accent text-accent-foreground font-medium border-2 border-primary">
            Output JSON
          </Card>
        </div>
      </div>
    </div>
  );
}
