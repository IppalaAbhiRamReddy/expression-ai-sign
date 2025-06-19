import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, Hand, Smile, Coffee, Users } from "lucide-react";
import { Link } from "react-router-dom";

const learningModules = [
  {
    title: "Sign Language Alphabets",
    progress: 75,
    icon: Hand,
    color: "text-blue-600",
  },
  {
    title: "Basic Greetings",
    progress: 60,
    icon: Smile,
    color: "text-green-600",
  },
  {
    title: "Daily Activities",
    progress: 45,
    icon: Coffee,
    color: "text-purple-600",
  },
  {
    title: "Family Meeting",
    progress: 20,
    icon: Users,
    color: "text-orange-600",
  },
];

export function LearningShortcut() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <GraduationCap className="mr-2 h-5 w-5" />
          Continue Learning
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {learningModules.map((module, index) => (
          <motion.div
            key={module.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <module.icon className={`h-4 w-4 ${module.color}`} />
                <span className="font-medium text-sm">{module.title}</span>
              </div>
              <span className="text-sm text-muted-foreground">{module.progress}%</span>
            </div>
            <Progress value={module.progress} className="h-2" />
          </motion.div>
        ))}
        
        <Button className="w-full mt-4" variant="outline" asChild>
          <Link to="/learn">Go to Learning Section</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
