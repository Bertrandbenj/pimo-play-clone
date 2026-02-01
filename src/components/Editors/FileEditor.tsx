import Editor from '@monaco-editor/react';

interface FileEditorProps {
  value: string;
  path: string;
}

export function FileEditor({ value, path }: FileEditorProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-muted px-3 py-1.5 text-sm font-medium border-b">
        File: {path}
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          language="yaml"
          theme="vs-dark"
          value={value}
          options={{
            readOnly: true,
            minimap: { enabled: false },
          }}
        />
      </div>
    </div>
  );
}