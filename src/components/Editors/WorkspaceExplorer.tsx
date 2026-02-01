import { useEffect, useState, useCallback } from 'react';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { File, Folder, ChevronDown, ChevronRight, RefreshCw } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}

interface WorkspaceExplorerProps {
  onFileSelect: (path: string, content: string) => void;
  selectedFile: string | null;
}

function FileTree({ nodes, onFileSelect, selectedFile }: { nodes: FileNode[], onFileSelect: (path: string, content: string) => void, selectedFile: string | null }) {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const handleFileClick = async (path: string) => {
    try {
      const response = await fetch(`/api/file/${path}`);
      if (response.ok) {
        const content = await response.text();
        onFileSelect(path, content);
      } else {
        toast({
          title: 'Error loading file',
          description: `Failed to fetch file: ${path}`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Unknown error fetching file content',
        variant: 'destructive',
      });
    }
  };

  const toggleFolder = (path: string) => {
    setOpenFolders(prev => ({ ...prev, [path]: !prev[path] }));
  };

  return (
    <SidebarMenu>
      {nodes.map((node) => (
        <SidebarMenuItem key={node.path}>
          {node.type === 'folder' ? (
            <Collapsible open={openFolders[node.path] || false} onOpenChange={() => toggleFolder(node.path)}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton size="sm" className="w-full justify-start gap-1 px-2 pr-2">
                  {openFolders[node.path] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  <Folder className="h-4 w-4 mr-1" />
                  <span className="flex-1 text-left">{node.name}</span>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4">
                {node.children && <FileTree nodes={node.children} onFileSelect={onFileSelect} selectedFile={selectedFile} />}
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <SidebarMenuButton
              size="sm"
              onClick={() => handleFileClick(node.path)}
              className={cn("w-full justify-start gap-1 px-2", { 'bg-accent text-accent-foreground': selectedFile === node.path })}
            >
              <File className="h-4 w-4 mr-1" />
              {node.name}
            </SidebarMenuButton>
          )}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export function WorkspaceExplorer({ onFileSelect, selectedFile }: WorkspaceExplorerProps) {
  const [files, setFiles] = useState<FileNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchFiles = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/files');
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setFiles(data);
        } else if (data && Array.isArray(data.children)) {
          setFiles(data.children);
        }
      } else {
        toast({
          title: 'Error loading workspace',
          description: 'Failed to fetch workspace files.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Unknown error fetching workspace files',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return (
    <SidebarGroup>
      <div className="flex justify-between items-center pr-2 mb-1">
        <SidebarGroupLabel>Workspace</SidebarGroupLabel>
        <SidebarMenuButton size="sm" onClick={fetchFiles} className="h-6 w-6 p-1" tooltip="Refresh Workspace">
          <RefreshCw className="h-3.5 w-3.5" />
        </SidebarMenuButton>
      </div>
      {isLoading ? (
        <div className="space-y-2 px-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      ) : (
        <FileTree nodes={files} onFileSelect={onFileSelect} selectedFile={selectedFile} />
      )}
    </SidebarGroup>
  );
}