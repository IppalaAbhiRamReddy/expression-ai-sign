
import { motion } from "framer-motion";
import { ArrowLeft, Brain, Globe, Wifi, GraduationCap, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const principles = [
    {
      icon: Brain,
      title: "AI with Context",
      description: "We go beyond hand signs by interpreting expressions."
    },
    {
      icon: Globe,
      title: "Regional Language Support",
      description: "Multiple Indian languages, one platform."
    },
    {
      icon: Wifi,
      title: "Offline Ready",
      description: "Access ISL tools without the internet."
    },
    {
      icon: GraduationCap,
      title: "Learn ISL",
      description: "Tools for learners and interpreters alike."
    }
  ];

  const team = [
    {
      name: "Abhiram",
      role: "Team Lead",
      email: "22BQ1A4261@vvit.net",
      avatar: "A"
    },
    {
      name: "Veda",
      role: "Team Member",
      email: "22BQ1A42B3@vvit.net",
      avatar: "V"
    },
    {
      name: "Arun",
      role: "Team Member",
      email: "22BQ1A42B7@vvit.net",
      avatar: "A"
    },
    {
      name: "Rakesh",
      role: "Team Member",
      email: "22BQ1A42B8@vvit.net",
      avatar: "R"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" role="banner">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center text-sm text-muted-foreground mb-4">
            <button 
              onClick={() => navigate("/dashboard")}
              className="hover:text-foreground flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Dashboard
            </button>
          </nav>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <h1 className="text-4xl font-bold tracking-tight" role="heading">About SignVerse</h1>
            <p className="text-xl text-muted-foreground">
              Built with empathy. Powered by AI. Designed for inclusion.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-16" role="main">
        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          aria-labelledby="mission-heading"
        >
          <div>
            <h2 id="mission-heading" className="text-3xl font-bold mb-6">Why We Built This</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              SignVerse exists to bridge the communication gap for the deaf and hard-of-hearing community 
              by capturing the full expression of Indian Sign Language — including facial movements, 
              head tilts, and posture — using AI.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-6xl">🤝</span>
            </div>
          </div>
        </motion.section>

        {/* Core Principles */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          aria-labelledby="principles-heading"
        >
          <h2 id="principles-heading" className="text-3xl font-bold text-center mb-12">Our Core Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                role="listitem"
              >
                <Card className="h-full hover:scale-[1.03] transition-transform duration-200 hover:shadow-lg">
                  <CardHeader className="text-center">
                    <principle.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <CardTitle className="text-lg">{principle.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center">{principle.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          aria-labelledby="team-heading"
        >
          <h2 id="team-heading" className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                role="listitem"
              >
                <Card className="text-center hover:scale-[1.03] transition-transform duration-200">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {member.avatar}
                    </div>
                    <CardTitle>{member.name}</CardTitle>
                    <Badge variant="secondary">{member.role}</Badge>
                  </CardHeader>
                  <CardContent>
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-sm text-muted-foreground hover:text-primary flex items-center justify-center gap-2"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-4 w-4" />
                      {member.email}
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
          aria-labelledby="contact-heading"
        >
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle id="contact-heading">Want to Collaborate or Support?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                We're always open to educators, NGOs, or devs who want to make sign language tools better.
              </p>
              <div className="flex items-center justify-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:22BQ1A4261@vvit.net" className="hover:text-primary">
                  22BQ1A4261@vvit.net
                </a>
              </div>
              <Button asChild>
                <a href="mailto:22BQ1A4261@vvit.net?subject=Collaboration Inquiry&body=Hello SignVerse Team,%0D%0A%0D%0AI am interested in collaborating with your project.%0D%0A%0D%0ABest regards">
                  Send Us a Message
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.section>
      </main>

      {/* Page Footer */}
      <footer className="border-t py-8" role="contentinfo">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 SignVerse | Built by students for India's inclusive communication future.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="#privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</a>
            <a href="#terms" className="text-sm text-muted-foreground hover:text-primary">Terms</a>
            <a href="#sitemap" className="text-sm text-muted-foreground hover:text-primary">Sitemap</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
