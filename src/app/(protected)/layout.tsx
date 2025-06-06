import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar";
import { SiteHeader } from "@/components/layout/header";

import { fetchUser } from "@/features/user/repositories";

const AN_AUTHENTICATED_USER = "名無しのユーザー";

export default async function ProtectedRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchUser();

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader userName={user?.userName || AN_AUTHENTICATED_USER} />
        <div className="@container/main flex flex-1 flex-col">
          <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
