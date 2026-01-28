import Editor from '@monaco-editor/react';
import { RefreshCw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OutputViewerProps {
  value: string;
  onRefresh: () => void;
  isLoading?: boolean;
}

export function OutputViewer({ value, onRefresh, isLoading = false }: OutputViewerProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-muted px-3 py-1.5 text-sm font-medium border-b flex items-center justify-between">
        <span>Output JSON</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
          className="h-6 px-2"
        >
          {isLoading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <RefreshCw className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          language="json"
          theme="vs-dark"
          value={value}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: 'on',
            readOnly: true,
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 2,
            folding: true,
            renderLineHighlight: 'none',
          }}
        />
      </div>
    </div>
  );
}
