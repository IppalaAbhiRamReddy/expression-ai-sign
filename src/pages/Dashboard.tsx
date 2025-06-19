import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { OverviewCards } from "@/components/OverviewCards";
import { QuickToolsPanel } from "@/components/QuickToolsPanel";
import { ActivityFeed } from "@/components/ActivityFeed";
import { LearningShortcut } from "@/components/LearningShortcut";
import { UserProfilePanel } from "@/components/UserProfilePanel";

export type DashboardView = "overview" | "live-translate" | "upload" | "learn" | "settings";

const Dashboard = () => {
  const [currentView, setCurrentView] = useState<DashboardView>("overview");
  const navigate = useNavigate();

  const handleNavigate = (view: DashboardView) => {
    if (view === "live-translate") {
      navigate("/live-translate");
    } else if (view === "learn") {
      navigate("/learn");
    } else if (view === "settings") {
      navigate("/settings");
    } else {
      setCurrentView(view);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case "overview":
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <OverviewCards />
            <QuickToolsPanel onNavigate={handleNavigate} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ActivityFeed />
              <LearningShortcut />
            </div>
          </motion.div>
        );
      case "settings":
        return <UserProfilePanel />;
      case "upload":
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Upload Translation</h2>
              <p className="text-muted-foreground">Upload translation feature coming soon...</p>
            </div>
          </div>
        );
      case "learn":
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Learn ISL</h2>
              <p className="text-muted-foreground">Learning modules coming soon...</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar currentView={currentView} onNavigate={handleNavigate} />
        <SidebarInset className="flex-1">
          <DashboardHeader />
          <main className="flex-1 p-6" role="main">
            {renderContent()}
          </main>
          <footer className="border-t py-4 px-6">
            <div className="text-center text-sm text-muted-foreground">
              © 2025 SignVerse | Privacy | Terms
            </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
