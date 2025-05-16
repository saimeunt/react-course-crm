import { type ReactNode, type CSSProperties } from "react";
import AppSidebar from "@/components/layout/app-sidebar";
import SiteHeader from "@/components/layout/site-header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const SidebarLayout = ({ children }: { children: ReactNode }) => (
  <SidebarProvider
    style={
      {
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as CSSProperties
    }
  >
    <AppSidebar variant="inset" />
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          {children}
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
);

export default SidebarLayout;
