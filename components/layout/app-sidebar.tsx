"use client";
import { type ComponentProps } from "react";
import Link from "next/link";
import { Notebook, Gauge, List, Users, Wrench } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import NavMain from "@/components/layout/nav-main";
import NavUser from "@/components/layout/nav-user";

const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => (
  <Sidebar collapsible="offcanvas" {...props}>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="data-[slot=sidebar-menu-button]:!p-1.5"
          >
            <Link href="/">
              <Notebook className="!size-5" />
              <span className="text-base font-semibold">CRM</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <NavMain
        items={[
          {
            title: "Dashboard",
            url: "/",
            icon: Gauge,
          },
          {
            title: "Orders",
            url: "/orders",
            icon: List,
          },
          {
            title: "Customers",
            url: "/customers",
            icon: Users,
          },
          {
            title: "Workshops",
            url: "/workshops",
            icon: Wrench,
          },
        ]}
      />
    </SidebarContent>
    <SidebarFooter>
      <NavUser
        user={{
          firstName: "CRM Admin",
          lastName: "Admin",
          fullName: "CRM Admin",
          email: "admin@crm.com",
          profileUrl:
            "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=CRM%20Admin",
        }}
      />
    </SidebarFooter>
  </Sidebar>
);

export default AppSidebar;
