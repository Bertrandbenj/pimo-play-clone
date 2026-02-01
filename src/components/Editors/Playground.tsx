import { useState } from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
// import { MaskingConfigPanel } from './Editors/MaskingConfigPanel';
// import { WorkspaceExplorer } from './Editors/WorkspaceExplorer';

export function Playground() {
  const [yamlValue, setYamlValue] = useState('');

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Pimo Playground</h2>
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        <SidebarContent>
          {/* Other sidebar items can go here */}
          {/* <WorkspaceExplorer /> */}
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex-1 p-4">
          <div className="h-full max-h-[calc(100vh-2rem)]">
            {/* <MaskingConfigPanel yamlValue={yamlValue} onYamlChange={setYamlValue} /> */}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}