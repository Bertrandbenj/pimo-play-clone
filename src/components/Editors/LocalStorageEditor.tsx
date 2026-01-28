import { useState, useEffect, useCallback } from 'react';
import { Save, Copy, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { YamlEditor } from './YamlEditor';
import { toast } from '@/hooks/use-toast';

interface LocalStorageEditorProps {
  onLoadToMain: (yaml: string) => void;
}

export function LocalStorageEditor({ onLoadToMain }: LocalStorageEditorProps) {
  const { storedValue, setValue, clearValue, lastSaved } = useLocalStorage('pimo-local-config');
  const [localValue, setLocalValue] = useState(storedValue);
  
  // Debounced auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== storedValue) {
        setValue(localValue);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [localValue, storedValue, setValue]);
  
  const handleSave = useCallback(() => {
    setValue(localValue);
    toast({
      title: "Saved",
      description: "Configuration saved to local storage",
    });
  }, [localValue, setValue]);
  
  const handleLoadToMain = useCallback(() => {
    onLoadToMain(localValue);
    toast({
      title: "Loaded",
      description: "Configuration copied to YAML editor",
    });
  }, [localValue, onLoadToMain]);
  
  const handleClear = useCallback(() => {
    clearValue();
    setLocalValue(storedValue);
    toast({
      title: "Cleared",
      description: "Local storage has been reset to default",
    });
  }, [clearValue, storedValue]);
  
  const formatDate = (date: Date | null) => {
    if (!date) return 'Never';
    return date.toLocaleString();
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-muted border-b gap-2">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Last saved: {formatDate(lastSaved)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={handleSave} className="h-7 px-2">
            <Save className="h-3.5 w-3.5 mr-1" />
            Save
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLoadToMain} className="h-7 px-2">
            <Copy className="h-3.5 w-3.5 mr-1" />
            Load to Editor
          </Button>
          <Button variant="ghost" size="sm" onClick={handleClear} className="h-7 px-2 text-destructive hover:text-destructive">
            <Trash2 className="h-3.5 w-3.5 mr-1" />
            Clear
          </Button>
        </div>
      </div>
      
      {/* Editor */}
      <div className="flex-1">
        <YamlEditor value={localValue} onChange={setLocalValue} />
      </div>
    </div>
  );
}
