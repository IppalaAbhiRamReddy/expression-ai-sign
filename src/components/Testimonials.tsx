
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "SignVerse has revolutionized how I communicate with my hearing friends. The accuracy is incredible!",
      name: "Priya Sharma",
      role: "Deaf Community Advocate",
      location: "Mumbai",
      avatar: "👩"
    },
    {
      quote: "As a teacher at a deaf school, this tool has made classroom communication so much more effective.",
      name: "Rajesh Kumar",
      role: "Special Education Teacher", 
      location: "Delhi",
      avatar: "👨‍🏫"
    },
    {
      quote: "The learning modules helped me master ISL basics in just a few weeks. Highly recommended!",
      name: "Anita Patel",
      role: "Student",
      location: "Ahmedabad", 
      avatar: "👩‍🎓"
    },
    {
      quote: "Finally, a platform that understands the nuances of Indian Sign Language and cultural context.",
      name: "Dr. Suresh Mehta",
      role: "Accessibility Researcher",
      location: "Bangalore",
      avatar: "👨‍⚕️"
    }
  ];

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50/50 to-orange-50/50" role="region" aria-label="User testimonials">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from our community of users who are breaking communication barriers every day.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto relative">
          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <ArrowUp className="h-4 w-4 rotate-[-90deg]" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <ArrowDown className="h-4 w-4 rotate-[-90deg]" />
          </Button>

          {/* Testimonial Card */}
          <div className="px-16">
            <Card className="text-center shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader className="pb-6">
                {/* Avatar */}
                <div className="text-6xl mb-4" aria-hidden="true">
                  {testimonials[currentTestimonial].avatar}
                </div>
                
                {/* Quote */}
                <CardDescription className="text-lg leading-relaxed text-foreground font-medium italic max-w-2xl mx-auto">
                  "{testimonials[currentTestimonial].quote}"
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* User Info */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground text-lg">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-muted-foreground">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentTestimonial].location}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                role="tab"
                aria-selected={index === currentTestimonial}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">4.8/5</div>
            <div className="text-sm text-muted-foreground">User Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">500K+</div>
            <div className="text-sm text-muted-foreground">Translations</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
