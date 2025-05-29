import { SidebarInset, SidebarProvider } from "@/components/ui";
import { AppSidebar } from "@/components/layout/sidebar";
import { SiteHeader } from "@/components/layout/header";

import { getAuthenticatedUser } from "@/repositories/user";

const AN_AUTHENTICATED_USER = "名無しのユーザー";

export default async function Root() {
  const user = await getAuthenticatedUser();

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader userName={user?.userName || AN_AUTHENTICATED_USER} />
      </SidebarInset>
    </SidebarProvider>
  );
}
