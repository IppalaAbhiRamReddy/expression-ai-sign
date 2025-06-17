
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Upload } from "lucide-react";
import { DashboardView } from "@/pages/Dashboard";

interface QuickToolsPanelProps {
  onNavigate: (view: DashboardView) => void;
}

export function QuickToolsPanel({ onNavigate }: QuickToolsPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={() => onNavigate("live-translate")}
              className="w-full h-20 text-lg"
              size="lg"
            >
              <Video className="mr-2 h-6 w-6" />
              Start Live Translation
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={() => onNavigate("upload")}
              variant="outline"
              className="w-full h-20 text-lg"
              size="lg"
            >
              <Upload className="mr-2 h-6 w-6" />
              Upload Video for Translation
            </Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
