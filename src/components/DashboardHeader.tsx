
import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Globe, User } from "lucide-react";
import { DashboardView } from "@/pages/Dashboard";

interface DashboardHeaderProps {
  onNavigate: (view: DashboardView) => void;
}

export function DashboardHeader({ onNavigate }: DashboardHeaderProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  
  const languages = ["English", "हिंदी", "తెలుగు"];

  return (
    <header className="flex h-16 items-center justify-between border-b px-6" role="banner">
      <div className="flex items-center space-x-4">
        <SidebarTrigger />
        <div>
          <h1 className="text-lg font-semibold">Hi, Abhi! 👋</h1>
          <p className="text-sm text-muted-foreground">Welcome back to SignVerse</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Language Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" aria-label="Select language">
              <Globe className="h-4 w-4 mr-2" />
              {selectedLanguage}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {languages.map((language) => (
              <DropdownMenuItem 
                key={language}
                onClick={() => setSelectedLanguage(language)}
              >
                {language}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onNavigate("settings")}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onNavigate("settings")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
