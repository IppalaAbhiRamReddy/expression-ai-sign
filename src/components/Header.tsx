
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Translate", href: "/live-translate" },
    { name: "Learn", href: "/learn" },
    { name: "Contact", href: "/about" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  // Scroll to top when navigating to new pages
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavClick = (href: string, itemName: string) => {
    if (href.startsWith("#")) {
      // For anchor links, implement smooth scrolling
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // For route navigation, scroll to top after navigation
      navigate(href);
      setTimeout(() => window.scrollTo(0, 0), 100);
    }
    setIsMenuOpen(false);
  };

  const handleSignUpClick = () => {
    navigate('/auth?mode=signup');
    window.scrollTo(0, 0);
  };

  const handleLoginClick = () => {
    navigate('/auth?mode=login');
    window.scrollTo(0, 0);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" role="banner">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 transition-transform hover:scale-105" onClick={() => window.scrollTo(0, 0)}>
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500"></div>
              <span className="text-xl font-bold text-foreground">SignVerse</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href, item.name)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-2 py-1 cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Auth Buttons */}
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={handleLoginClick}>
                Login
              </Button>
              <Button size="sm" onClick={handleSignUpClick}>
                Sign Up
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href, item.name)}
                  className="block w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-2 border-t space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleLoginClick}>
                  Login
                </Button>
                <Button size="sm" className="w-full" onClick={handleSignUpClick}>
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
