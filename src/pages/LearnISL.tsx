
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Users, Coffee, Hand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LearningModulesGrid } from "@/components/LearningModulesGrid";
import { LearningProgressWidget } from "@/components/LearningProgressWidget";
import { ExtrasSection } from "@/components/ExtrasSection";
import { LearningActions } from "@/components/LearningActions";
import { useNavigate } from "react-router-dom";

const LearnISL = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center text-sm text-muted-foreground mb-4">
            <button 
              onClick={() => navigate("/dashboard")}
              className="hover:text-foreground flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Dashboard
            </button>
            <span className="mx-2">&gt;</span>
            <span className="text-foreground">Learning</span>
          </nav>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Learn Indian Sign Language</h1>
            <p className="text-xl text-muted-foreground">
              Understand alphabets, expressions, and daily signs through videos &amp; photos
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8" role="main">
        {/* Learning Progress Widget */}
        <LearningProgressWidget />

        {/* Learning Modules Grid */}
        <LearningModulesGrid />

        {/* Additional Resources */}
        <ExtrasSection />

        {/* Learning Actions */}
        <LearningActions />
      </main>

      {/* Learning Footer */}
      <footer className="border-t py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">ISL Guidelines</a>
            <a href="#" className="hover:text-foreground">Certification</a>
            <a href="#" className="hover:text-foreground">FAQs</a>
            <a href="#" className="hover:text-foreground">Feedback</a>
          </div>
          <div className="text-center text-sm text-muted-foreground mt-4">
            © 2025 SignVerse Learning Platform
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LearnISL;
