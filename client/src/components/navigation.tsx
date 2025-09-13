import { useState } from "react";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "glass-strong border-b border-border/30 shadow-lg" : "glass-light"
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
                  className="text-foreground hover:text-accent hover-glow transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-glass-bg shadow-sm"
                  data-testid={`nav-link-${link.href}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-glass-bg transition-all duration-300 hover-glow"
                  data-testid="mobile-menu-toggle"
                  aria-label="Open mobile navigation menu"
                >
                  <Menu className="text-foreground h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[85%] max-w-sm glass-strong border-l border-border/20 backdrop-blur-lg"
                data-testid="mobile-sidebar"
              >
                <SheetHeader className="mb-8">
                  <SheetTitle className="text-left">
                    <h2 className="text-2xl font-bold gradient-text-primary font-serif">Sarah Chen</h2>
                    <p className="text-sm text-muted-foreground mt-1 font-normal">Financial Technology Expert</p>
                  </SheetTitle>
                </SheetHeader>
                
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link, index) => (
                    <SheetClose asChild key={link.href}>
                      <button
                        onClick={() => handleNavClick(link.href)}
                        className="flex items-center px-4 py-3 text-left text-foreground hover:text-accent hover:bg-glass-bg rounded-lg transition-all duration-300 font-medium text-base group hover-lift"
                        data-testid={`mobile-nav-link-${link.href}`}
                        style={{ 
                          animationDelay: `${index * 0.1}s`,
                          opacity: 0,
                          animation: 'fade-in-up 0.6s ease-out forwards'
                        }}
                      >
                        <span className="group-hover:translate-x-2 transition-transform duration-300">
                          {link.label}
                        </span>
                      </button>
                    </SheetClose>
                  ))}
                </nav>
                
                <Separator className="my-8 bg-border/20" />
                
                <div className="space-y-4" role="complementary" aria-label="Contact information">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Connect</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm text-foreground/80" role="listitem">
                      <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
                      <span aria-label="Email address">sarah.chen@example.com</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-foreground/80" role="listitem">
                      <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                      <span aria-label="Phone number">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-foreground/80" role="listitem">
                      <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                      <span aria-label="Location">San Francisco, CA</span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs text-muted-foreground text-center">
                    © 2024 Sarah Chen. All rights reserved.
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

    </nav>
  );
}
