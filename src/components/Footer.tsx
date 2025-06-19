
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Live Translation", href: "/live-translate" },
        { name: "Upload Video", href: "/live-translate" },
        { name: "Learning Path", href: "#learn" },
        { name: "API Access", href: "#api" }
      ]
    },
    {
      title: "Resources", 
      links: [
        { name: "Help Center", href: "#help" },
        { name: "ISL Dictionary", href: "#dictionary" },
        { name: "Community Forum", href: "#forum" },
        { name: "Blog", href: "#blog" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Careers", href: "#careers" },
        { name: "Press Kit", href: "#press" },
        { name: "Contact", href: "#contact" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Terms of Service", href: "#terms" },
        { name: "Accessibility", href: "#accessibility" },
        { name: "Data Security", href: "#security" }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500"></div>
              <span className="text-xl font-bold">SignVerse</span>
            </div>
            
            {/* Mission */}
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering communication through AI-powered Indian Sign Language translation. 
              Breaking barriers, building bridges.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Stay Updated</h4>
              <div className="flex space-x-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                  aria-label="Subscribe to newsletter"
                />
                <Button variant="secondary" className="bg-blue-600 hover:bg-blue-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.href.startsWith("/") ? (
                      <Link 
                        to={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm focus:outline-none focus:text-white focus:underline"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a 
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm focus:outline-none focus:text-white focus:underline"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2024 SignVerse. All rights reserved. Made with ❤️ for accessibility.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm mr-2">Follow us:</span>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Follow us on YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <div className="h-5 w-5 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded"></div>
              </a>
            </div>
          </div>
        </div>

        {/* Accessibility Statement */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <p className="text-gray-400 text-xs text-center">
            SignVerse is committed to accessibility. This website follows WCAG 2.1 guidelines. 
            For accessibility support, contact <a href="mailto:accessibility@signverse.com" className="text-blue-400 hover:text-blue-300 underline">accessibility@signverse.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
