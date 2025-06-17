
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Upload, Brain, Globe } from "lucide-react";

const cardData = [
  {
    title: "Recent Live Translations",
    value: "12",
    subtitle: "This week",
    icon: Video,
    color: "text-blue-600",
  },
  {
    title: "Video Uploads",
    value: "8",
    subtitle: "Total processed",
    icon: Upload,
    color: "text-green-600",
  },
  {
    title: "NMF Accuracy",
    value: "94%",
    subtitle: "Last session",
    icon: Brain,
    color: "text-purple-600",
  },
  {
    title: "Preferred Language",
    value: "Hindi",
    subtitle: "Current setting",
    icon: Globe,
    color: "text-orange-600",
  },
];

export function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardData.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.subtitle}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
