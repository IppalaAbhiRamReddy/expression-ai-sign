
import { Link } from "react-router-dom";
import { 
  Home, 
  Video, 
  Upload, 
  GraduationCap, 
  Activity, 
  Settings, 
  LogOut,
  Globe
} from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { DashboardView } from "@/pages/Dashboard";

interface DashboardSidebarProps {
  currentView: DashboardView;
  onNavigate: (view: DashboardView) => void;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    view: "overview" as DashboardView,
  },
  {
    title: "Live Translate",
    icon: Video,
    view: "live-translate" as DashboardView,
  },
  {
    title: "Upload Translate",
    icon: Upload,
    view: "upload" as DashboardView,
  },
  {
    title: "Learn ISL",
    icon: GraduationCap,
    view: "learn" as DashboardView,
  },
  {
    title: "Activity History",
    icon: Activity,
    view: "activity" as DashboardView,
  },
  {
    title: "Settings",
    icon: Settings,
    view: "settings" as DashboardView,
  },
];

export function DashboardSidebar({ currentView, onNavigate }: DashboardSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <Link to="/" className="flex items-center space-x-2 px-2 py-4">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500"></div>
          <span className="text-xl font-bold">SignVerse</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu role="navigation">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={currentView === item.view}
                    onClick={() => onNavigate(item.view)}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/" className="w-full justify-start text-red-600 hover:text-red-700">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
