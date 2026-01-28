import Editor from '@monaco-editor/react';

interface InputEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function InputEditor({ value, onChange }: InputEditorProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-muted px-3 py-1.5 text-sm font-medium border-b">
        Input JSON
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          language="json"
          theme="vs-dark"
          value={value}
          onChange={(val) => onChange(val ?? '')}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 2,
            folding: true,
            renderLineHighlight: 'line',
          }}
        />
      </div>
    </div>
  );
}
