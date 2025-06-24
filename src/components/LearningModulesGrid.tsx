
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, Hand, Smile, Coffee, Users, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LearningModule {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  icon: any;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

interface LearningModulesGridProps {
  onModuleSelect: (moduleId: string) => void;
}

const learningModules: LearningModule[] = [
  {
    id: "alphabets",
    title: "Sign Language Alphabets",
    description: "Learn the complete ISL alphabet and basic letter formations for communication.",
    thumbnail: "🔤",
    icon: Hand,
    progress: 30,
    totalLessons: 26,
    completedLessons: 8,
    duration: "45 min",
    level: "Beginner"
  },
  {
    id: "greetings", 
    title: "Basic Greetings",
    description: "Master essential greeting signs like hello, goodbye, and nice to meet you.",
    thumbnail: "👋",
    icon: Smile,
    progress: 60,
    totalLessons: 15,
    completedLessons: 9,
    duration: "30 min",
    level: "Beginner"
  },
  {
    id: "daily-activities",
    title: "Daily Activities", 
    description: "Express everyday actions and routines with confidence and clarity.",
    thumbnail: "☕",
    icon: Coffee,
    progress: 20,
    totalLessons: 20,
    completedLessons: 4,
    duration: "60 min",
    level: "Intermediate"
  },
  {
    id: "family-meeting",
    title: "Family Signs",
    description: "Learn signs for family relationships and communication in family gatherings.",
    thumbnail: "👨‍👩‍👧‍👦",
    icon: Users,
    progress: 0,
    totalLessons: 8,
    completedLessons: 0,
    duration: "40 min",
    level: "Intermediate"
  }
];

export function LearningModulesGrid({ onModuleSelect }: LearningModulesGridProps) {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleModuleClick = (module: LearningModule) => {
    if (module.id === "alphabets") {
      navigate("/learn/alphabets");
    } else if (module.id === "greetings") {
      navigate("/learn/greetings");
    } else if (module.id === "daily-activities") {
      navigate("/learn/daily-activities");
    } else if (module.id === "family-meeting") {
      navigate("/learn/family-signs");
    } else {
      onModuleSelect(module.id);
    }
  };

  return (
    <section>
      <div className="flex items-center mb-6">
        <GraduationCap className="h-6 w-6 mr-2 text-blue-600" />
        <h2 className="text-2xl font-bold">Learning Modules</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list">
        {learningModules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            role="listitem"
          >
            <Card 
              className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onMouseEnter={() => setHoveredModule(module.id)}
              onMouseLeave={() => setHoveredModule(null)}
            >
              <CardHeader className="pb-4">
                {/* Thumbnail with Play Overlay */}
                <div className="relative w-full aspect-video bg-gradient-to-br from-blue-100 to-orange-100 rounded-lg mb-4 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl">{module.thumbnail}</div>
                  </div>
                  {hoveredModule === module.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/20 flex items-center justify-center"
                    >
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <Play className="h-6 w-6 text-blue-600 ml-1" />
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <module.icon className="h-5 w-5 mr-2 text-blue-600" />
                    {module.title}
                  </CardTitle>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    module.level === 'Beginner' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {module.level}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span>{module.completedLessons} of {module.totalLessons} lessons</span>
                  <span>{module.duration}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                  {module.description}
                </CardDescription>

                <Button 
                  className="w-full"
                  onClick={() => handleModuleClick(module)}
                  aria-label={`Start learning ${module.title}`}
                >
                  {module.progress > 0 ? "Continue Learning" : "Start Learning"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
