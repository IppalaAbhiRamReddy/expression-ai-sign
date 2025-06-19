
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="relative py-20 overflow-hidden" role="region" aria-label="Join the movement">
      {/* Background with Video Placeholder */}
      <div className="absolute inset-0 z-0">
        {/* Dimmed background with gradient overlay */}
        <div className="w-full h-full bg-gradient-to-br from-blue-900/90 via-purple-900/90 to-orange-900/90"></div>
        {/* Video pattern placeholder */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M50 15L60 35L80 35L65 50L70 70L50 60L30 70L35 50L20 35L40 35Z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Join the{" "}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Movement
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Be part of a community that's breaking down communication barriers and making 
            the world more inclusive for the deaf and hard-of-hearing community.
          </p>

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-orange-400 mb-1">Free</div>
              <div className="text-sm text-gray-300">To Get Started</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">24/7</div>
              <div className="text-sm text-gray-300">Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1">Secure</div>
              <div className="text-sm text-gray-300">& Private</div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-8 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              asChild
            >
              <Link to="/auth">Create Free Account</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900 py-4 px-8 transition-all duration-300"
            >
              Learn More
            </Button>
          </div>

          {/* Additional Info */}
          <p className="text-sm text-gray-400 mt-8">
            No credit card required • Start translating in under 2 minutes • Join 10,000+ users
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-transparent rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-lg"></div>
    </section>
  );
};

export default CallToAction;
