import { useLocation, NavLink } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Award,
  Calendar,
  House,
  Lamp,
  LayoutDashboard,
  MessageCircleWarning,
  User2,
} from "lucide-react";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Rooms",
    url: "/rooms",
    icon: House,
  },
  {
    title: "Complaints",
    url: "/complaints",
    icon: MessageCircleWarning,
  },
  {
    title: "Events",
    url: "/events",
    icon: Calendar,
  },
  {
    title: "Facility",
    url: "/facilities",
    icon: Lamp,
  },
  {
    title: "Merit",
    url: "/merit",
    icon: Award,
  },
  {
    title: "User",
    url: "/users",
    icon: User2,
  },
];

export const MainSidebar = () => {
  const { pathname } = useLocation();

  return (
    <Sidebar collapsible="icon" className="pt-16 border-none z-40">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
