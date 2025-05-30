"use client";

import * as React from "react";

import { ContentGroup } from "./content-group";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { ROUTING_PATHS } from "@/constants/paths";
import { NAV_HOME, NAV_STOCK } from "@/constants/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href={ROUTING_PATHS.root}>
                <span className="text-base font-semibold">KAIKETSUKUN</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ContentGroup {...NAV_HOME} />
        <ContentGroup {...NAV_STOCK} />
      </SidebarContent>
    </Sidebar>
  );
}
