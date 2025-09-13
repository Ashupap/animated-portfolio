import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "home" },
  { label: "About", href: "about" },
  { label: "Services", href: "services" },
  { label: "Portfolio", href: "portfolio" },
  { label: "Skills", href: "skills" },
  { label: "Contact", href: "contact" },
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isScrolled, scrollToSection } = useScrollAnimation();

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold gradient-text font-serif">Sarah Chen</h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-foreground hover:text-accent transition-colors duration-300 font-medium"
                  data-testid={`nav-link-${link.href}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="block px-3 py-2 text-foreground hover:text-accent transition-colors duration-300 font-medium w-full text-left"
                data-testid={`mobile-nav-link-${link.href}`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
