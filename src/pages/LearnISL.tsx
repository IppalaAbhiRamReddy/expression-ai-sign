
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LearningModulesGrid } from "@/components/LearningModulesGrid";
import { LearningProgressWidget } from "@/components/LearningProgressWidget";
import { ExtrasSection } from "@/components/ExtrasSection";
import { LearningActions } from "@/components/LearningActions";

const LearnISL = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <header className="border-b" role="banner">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <nav aria-label="Breadcrumb">
              <span className="text-sm text-muted-foreground">Dashboard > Learning</span>
            </nav>
          </div>
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" role="heading" aria-level={1}>
              Learn Indian Sign Language
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Understand alphabets, expressions, and daily signs through videos & photos
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LearningModulesGrid onModuleSelect={setSelectedModule} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ExtrasSection />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <LearningProgressWidget />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <LearningActions />
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link to="#" className="hover:text-foreground transition-colors">ISL Guidelines</Link>
            <Link to="#" className="hover:text-foreground transition-colors">Certification</Link>
            <Link to="#" className="hover:text-foreground transition-colors">FAQs</Link>
            <Link to="#" className="hover:text-foreground transition-colors">Feedback</Link>
          </div>
          <div className="text-center mt-4 text-sm text-muted-foreground">
            © 2025 SignVerse | Learn ISL with confidence
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LearnISL;
