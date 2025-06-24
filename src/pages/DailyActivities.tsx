
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Play, CheckCircle, Clock, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

interface LessonStatus {
  activity: string;
  completed: boolean;
  inProgress: boolean;
}

const dailyActivities = [
  "Walking",
  "Running", 
  "Swimming",
  "Cycling",
  "Eating",
  "Drinking",
  "Sleeping",
  "Bathing",
  "Reading",
  "Writing"
];

const DailyActivities = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<LessonStatus[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem("ISL_DailyActivities_Progress");
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    } else {
      // Initialize all lessons as not started
      const initialProgress = dailyActivities.map(activity => ({
        activity,
        completed: false,
        inProgress: false,
      }));
      setProgress(initialProgress);
      localStorage.setItem("ISL_DailyActivities_Progress", JSON.stringify(initialProgress));
    }
  }, []);

  const completedCount = progress.filter(lesson => lesson.completed).length;
  const progressPercentage = (completedCount / 10) * 100;

  const handleLessonClick = (activity: string) => {
    setSelectedLesson(activity);
    setIsModalOpen(true);
    
    // Mark as in progress if not completed
    const updatedProgress = progress.map(lesson => 
      lesson.activity === activity && !lesson.completed 
        ? { ...lesson, inProgress: true }
        : lesson
    );
    setProgress(updatedProgress);
    localStorage.setItem("ISL_DailyActivities_Progress", JSON.stringify(updatedProgress));
  };

  const markAsCompleted = (activity: string) => {
    const updatedProgress = progress.map(lesson => 
      lesson.activity === activity 
        ? { ...lesson, completed: true, inProgress: false }
        : lesson
    );
    setProgress(updatedProgress);
    localStorage.setItem("ISL_DailyActivities_Progress", JSON.stringify(updatedProgress));
    setIsModalOpen(false);
  };

  const getStatusIcon = (lesson: LessonStatus) => {
    if (lesson.completed) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (lesson.inProgress) return <Clock className="h-5 w-5 text-orange-600" />;
    return <Square className="h-5 w-5 text-gray-400" />;
  };

  const getStatusText = (lesson: LessonStatus) => {
    if (lesson.completed) return "Completed";
    if (lesson.inProgress) return "In Progress";
    return "Not Started";
  };

  const scrollToLessons = () => {
    document.getElementById("activities-lessons")?.scrollIntoView({ behavior: "smooth" });
  };

  const navigateToNext = () => {
    if (!selectedLesson) return;
    const currentIndex = dailyActivities.indexOf(selectedLesson);
    if (currentIndex < dailyActivities.length - 1) {
      const nextActivity = dailyActivities[currentIndex + 1];
      setSelectedLesson(nextActivity);
    }
  };

  const navigateToPrevious = () => {
    if (!selectedLesson) return;
    const currentIndex = dailyActivities.indexOf(selectedLesson);
    if (currentIndex > 0) {
      const prevActivity = dailyActivities[currentIndex - 1];
      setSelectedLesson(prevActivity);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        role="heading"
      >
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center text-sm text-muted-foreground mb-4">
            <button 
              onClick={() => navigate("/learn")}
              className="hover:text-foreground flex items-center"
              aria-label="Back to Learning Path"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Learning Path
            </button>
          </nav>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Learn Daily Activities in ISL</h1>
            <p className="text-xl text-muted-foreground">
              Understand and express common everyday activities using sign language.
            </p>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8 space-y-8" role="main">
        {/* Start Learning CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-orange-50 border-none">
            <CardHeader>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 text-center md:text-left">
                  <CardTitle className="text-2xl mb-3">Start Learning Daily Activities</CardTitle>
                  <p className="text-muted-foreground mb-4">
                    Short lessons showing signs for daily routine actions.
                  </p>
                  <Button 
                    onClick={scrollToLessons}
                    size="lg"
                    aria-label="Start Daily Activities"
                  >
                    Start Learning Activities
                  </Button>
                </div>
                <div className="text-6xl md:text-8xl">
                  🏃‍♂️
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Progress</CardTitle>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Progress: {completedCount} of 10 activities completed</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <Progress 
                  value={progressPercentage} 
                  className="h-3"
                  role="progressbar"
                  aria-valuenow={completedCount}
                  aria-valuemax={10}
                  aria-label={`Learning progress: ${completedCount} of 10 activities completed`}
                />
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Lesson Grid */}
        <section id="activities-lessons">
          <h2 className="text-2xl font-bold mb-6">Daily Activity Lessons</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {progress.map((lesson, index) => (
              <motion.div
                key={lesson.activity}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card 
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => handleLessonClick(lesson.activity)}
                  role="button"
                  tabIndex={0}
                  aria-label={`ISL lesson for ${lesson.activity}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleLessonClick(lesson.activity);
                    }
                  }}
                >
                  <CardContent className="p-4">
                    {/* Thumbnail */}
                    <div className="w-full aspect-square bg-gradient-to-br from-blue-100 to-orange-100 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                      <span className="text-2xl">🏃‍♂️</span>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <Play className="h-6 w-6 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold mb-2 text-center">{lesson.activity}</h3>

                    {/* Status */}
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      {getStatusIcon(lesson)}
                      <span className={`
                        ${lesson.completed ? 'text-green-600' : ''}
                        ${lesson.inProgress ? 'text-orange-600' : ''}
                        ${!lesson.completed && !lesson.inProgress ? 'text-gray-400' : ''}
                      `}>
                        {getStatusText(lesson)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer Navigation */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t pt-8"
          role="navigation"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <Button
              variant="outline"
              onClick={() => navigate("/learn")}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Learning Home
            </Button>
            <Button
              onClick={() => navigate("/learn")}
              className="flex items-center"
            >
              Continue to: Family Signs
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Button>
          </div>
        </motion.footer>
      </main>

      {/* Lesson Video Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent 
          className="sm:max-w-[600px]"
          aria-modal="true"
          aria-labelledby="lesson-title"
        >
          <DialogHeader>
            <DialogTitle id="lesson-title">
              {selectedLesson} - ISL Sign
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Video Player */}
            <div className="w-full aspect-video bg-gradient-to-br from-blue-100 to-orange-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Video player would be embedded here</p>
                <p className="text-xs text-gray-500 mt-1">
                  Learn how to sign "{selectedLesson}" in ISL
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground">
              Learn how to sign "{selectedLesson}" in ISL. Practice the hand movement and gestures shown in the video.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <div className="flex gap-2 flex-1">
                <Button
                  variant="outline"
                  onClick={navigateToPrevious}
                  disabled={!selectedLesson || dailyActivities.indexOf(selectedLesson) === 0}
                  className="flex-1"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={navigateToNext}
                  disabled={!selectedLesson || dailyActivities.indexOf(selectedLesson) === dailyActivities.length - 1}
                  className="flex-1"
                >
                  Next
                </Button>
              </div>
              <Button 
                onClick={() => selectedLesson && markAsCompleted(selectedLesson)}
                className="sm:w-auto"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Completed
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DailyActivities;
