
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

const LearningPreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const learningModules = [
    {
      title: "Basic Greetings",
      level: "Beginner",
      duration: "15 min",
      thumbnail: "👋",
      description: "Learn essential greeting signs like hello, goodbye, and nice to meet you."
    },
    {
      title: "Family Members",
      level: "Beginner", 
      duration: "20 min",
      thumbnail: "👨‍👩‍👧‍👦",
      description: "Master signs for family relationships and household vocabulary."
    },
    {
      title: "Daily Activities",
      level: "Intermediate",
      duration: "25 min", 
      thumbnail: "🏃‍♂️",
      description: "Express everyday actions and routines with confidence."
    },
    {
      title: "Emotions & Feelings",
      level: "Intermediate",
      duration: "30 min",
      thumbnail: "😊",
      description: "Convey complex emotions and psychological states effectively."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % learningModules.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + learningModules.length) % learningModules.length);
  };

  return (
    <section id="learn" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Start Learning ISL
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive lessons designed to help you master Indian Sign Language at your own pace.
          </p>
        </div>

        {/* Learning Path Preview */}
        <div className="max-w-4xl mx-auto">
          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Arrows */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
              onClick={prevSlide}
              aria-label="Previous lesson"
            >
              <ArrowUp className="h-4 w-4 rotate-[-90deg]" />
            </Button>
            
            <Button
              variant="outline" 
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
              onClick={nextSlide}
              aria-label="Next lesson"
            >
              <ArrowDown className="h-4 w-4 rotate-[-90deg]" />
            </Button>

            {/* Carousel Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-16">
              {[currentSlide, (currentSlide + 1) % learningModules.length].map((index, slideIndex) => {
                const module = learningModules[index];
                return (
                  <Card 
                    key={`${index}-${slideIndex}`} 
                    className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <CardHeader className="text-center pb-4">
                      {/* Video Thumbnail Placeholder */}
                      <div className="relative w-full aspect-video bg-gradient-to-br from-blue-100 to-orange-100 rounded-lg mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-6xl">{module.thumbnail}</div>
                        </div>
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                            <div className="w-0 h-0 border-l-[12px] border-l-blue-600 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                          </div>
                        </div>
                      </div>

                      <CardTitle className="text-lg font-semibold text-foreground">
                        {module.title}
                      </CardTitle>
                      
                      {/* Level & Duration */}
                      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          module.level === 'Beginner' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {module.level}
                        </span>
                        <span>{module.duration}</span>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <CardDescription className="text-center text-muted-foreground leading-relaxed">
                        {module.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 space-x-2" role="tablist" aria-label="Lesson navigation">
              {learningModules.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to lesson ${index + 1}`}
                  role="tab"
                  aria-selected={index === currentSlide}
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
              Explore Learning Path
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningPreview;
