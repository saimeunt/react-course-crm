"use client";
import { usePathname } from "next/navigation";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const NavMain = ({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) => {
  const pathname = usePathname();
  const isActive = (url: string) => {
    if (url === "/" && pathname === "/") {
      return true;
    } else if (url === "/orders" && pathname.startsWith("/orders")) {
      return true;
    } else if (url === "/customers" && pathname.startsWith("/customers")) {
      return true;
    } else if (url === "/workshops" && pathname.startsWith("/workshops")) {
      return true;
    }
    return false;
  };
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={isActive(item.url)}
                asChild
              >
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavMain;
