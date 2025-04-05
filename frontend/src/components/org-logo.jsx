import * as React from "react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function OrgLogo({
  teams
}) {
  const { isMobile } = useSidebar()



  return (
    (<SidebarMenu>
      <SidebarMenuItem>
        
      </SidebarMenuItem>
    </SidebarMenu>)
  );
}