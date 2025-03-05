import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Calendar, Home, Inbox, Search, Settings, Cog } from "lucide-react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

import { Button } from "./ui/button";

type AppSidebarProps = {
  projectId: string;
};

export function AppSidebar({ projectId }: AppSidebarProps) {
  const baseUrl = `/dashboard/${[projectId]}`;
  const sidebarGroups = [
    {
      name: "Marketing",
      items: [
        {
          title: "Dashboard",
          url: `${baseUrl}`,
          icon: Home,
        },
        {
          title: "Campaigns",
          url: `${baseUrl}/campaigns`,
          icon: Inbox,
        },
        {
          title: "Automations",
          url: `${baseUrl}/automations`,
          icon: Cog,
        },
        {
          title: "Audience",
          url: `${baseUrl}/audience`,
          icon: Search,
        },
        {
          title: "Send Email",
          url: `${baseUrl}/composer`,
          icon: Calendar,
        },
      ],
    },
    {
      name: "Settings",
      items: [
        {
          title: "Project",
          url: `/dashboard/${projectId}/settings`,
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="h-12 flex items-center">
          <h3 className="font-bold text-2xl uppercase">NoxisFlow</h3>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {sidebarGroups.map((group) => (
          <SidebarGroup key={group.name}>
            <SidebarGroupLabel>{group.name}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Link href="/dashboard">
          <Button className="w-full bg-inherit" variant="outline">
            <FaArrowLeft />
            Seleziona progetto
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
