
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const FeaturesSection = () => {
  const features = [
    {
      icon: "📹",
      title: "Live Video Translation",
      description: "Real-time ISL translation with instant text output and speech synthesis."
    },
    {
      icon: "📤",
      title: "Upload Video Translation",
      description: "Process recorded videos with batch translation and downloadable results."
    },
    {
      icon: "😊",
      title: "Facial Expression Detection",
      description: "Advanced NMF detection for emotional context and non-manual markers."
    },
    {
      icon: "🌐",
      title: "Multilingual Output",
      description: "Translate to Telugu, Hindi, English and other regional languages."
    },
    {
      icon: "🎓",
      title: "ISL Learning Path",
      description: "Interactive lessons and practice sessions for learning sign language."
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Key Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools designed to make sign language communication accessible and seamless for everyone.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="grid">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-border hover:border-blue-200"
              role="gridcell"
            >
              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">Ready to experience the future of sign language translation?</p>
          <Link 
            to="/live-translate" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
          >
            Try it now →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
