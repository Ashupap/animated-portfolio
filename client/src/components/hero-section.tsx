import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import VideoBackground from "@/components/video-background";
import { VideoAssetManager, VIDEO_CONFIG } from "@/lib/video-assets";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const { scrollToSection } = useScrollAnimation();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Get hero video asset
  const heroAsset = VideoAssetManager.getHeroAsset();

  return (
    <section
      id="home"
      className="min-h-screen text-primary-foreground relative overflow-hidden"
    >
      {/* Video Background with enhanced overlay */}
      <VideoBackground
        asset={heroAsset}
        enableStarfield={true}
        overlayOpacity={0.5}
        overlayGradient={VIDEO_CONFIG.HERO_OVERLAY_GRADIENT}
        pauseOnHidden={true}
        className="z-0"
        data-testid="hero-video-background"
      />

      {/* Additional glass-morphism overlay for better text readability */}
      <div className="absolute inset-0 glass-light bg-gradient-to-br from-primary/30 via-transparent to-primary/40 z-[3]"></div>
      
      <div className="relative z-[10] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-lg font-medium text-accent mb-4">Finance Professional</div>
            <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 leading-tight">
              <span className="block gradient-text-hero">Sarah</span>
              <span className="block gradient-text">Chen</span>
            </h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, delay: 0.5 }}
              className="text-xl md:text-2xl mb-8 font-light overflow-hidden whitespace-nowrap border-r-2 border-accent"
            >
              Strategic Financial Consultant & CPA
            </motion.div>
            
            <p className="text-lg mb-10 text-primary-foreground/90 leading-relaxed max-w-xl">
              Transforming businesses through strategic financial planning, comprehensive analysis, and innovative solutions. 
              15+ years of expertise in corporate finance and consulting.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => scrollToSection("portfolio")}
                className="glass-light bg-accent/20 text-primary-foreground border border-accent/30 px-8 py-4 rounded-lg font-semibold hover:glass-strong hover:bg-accent/30 hover:border-accent/50 transition-all duration-400 hover-lift hover-glow shadow-lg"
                data-testid="button-view-portfolio"
              >
                View My Work
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("contact")}
                className="glass border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:glass-strong hover:bg-primary-foreground/20 hover:border-primary-foreground/50 transition-all duration-400 hover-glow shadow-lg"
                data-testid="button-contact"
              >
                Get In Touch
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
                alt="Sarah Chen - Finance Professional"
                className="w-80 h-80 md:w-96 md:h-96 rounded-full object-cover border-8 border-accent shadow-2xl hover-lift"
              />
              <div className="absolute -bottom-4 -right-4 glass-strong bg-accent/20 text-primary-foreground border border-accent/30 rounded-full p-4 shadow-xl hover-glow">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
        transition={prefersReducedMotion ? {} : { duration: 2, repeat: Infinity }}
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer glass rounded-full p-3 border border-primary-foreground/20 hover:glass-strong transition-all duration-300 ${prefersReducedMotion ? 'motion-reduce' : ''}`}
        onClick={() => scrollToSection("about")}
        data-testid="scroll-indicator"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToSection("about");
          }
        }}
        aria-label="Scroll to About section"
      >
        <ChevronDown className="text-primary-foreground text-2xl" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
