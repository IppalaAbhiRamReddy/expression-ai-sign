
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Record or Upload",
      description: "Start by recording live video or uploading an ISL video file through our user-friendly interface.",
      icon: "🎥"
    },
    {
      step: "02", 
      title: "AI Detection & Analysis",
      description: "Our advanced AI detects hand movements, facial expressions, and body language for comprehensive analysis.",
      icon: "🤖"
    },
    {
      step: "03",
      title: "Contextual Translation",
      description: "Get accurate text output with cultural context, emotional cues, and grammatically correct sentences.",
      icon: "💬"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50/50 to-orange-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our three-step process makes ISL translation simple, accurate, and accessible to everyone.
          </p>
        </div>

        {/* Timeline/Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection Line (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 left-full w-12 h-0.5 bg-gradient-to-r from-blue-200 to-orange-200 transform translate-x-0 z-0"></div>
                )}
                
                <Card className="relative z-10 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    {/* Step Number */}
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 text-white font-bold text-lg mx-auto mb-4">
                      {step.step}
                    </div>
                    
                    {/* Icon */}
                    <div className="text-4xl mb-4" aria-hidden="true">
                      {step.icon}
                    </div>
                    
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <CardDescription className="text-muted-foreground leading-relaxed" aria-describedby={`step-${index + 1}-description`}>
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Demo Placeholder */}
        <div className="mt-16 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="relative rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-gray-100 to-gray-200 aspect-video">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎬</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Interactive Demo</h3>
                  <p className="text-gray-600">See our AI in action with real-time ISL translation</p>
                </div>
              </div>
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer group">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <div className="w-0 h-0 border-l-[20px] border-l-blue-600 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
