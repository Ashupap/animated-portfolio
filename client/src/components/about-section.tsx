import { motion } from "framer-motion";
import { GraduationCap, Trophy, CheckCircle, Star, TrendingUp, Users, Shield, Brain, Briefcase, Award } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

// Static color class mappings to prevent Tailwind JIT purging
const colorClasses = {
  primary: {
    glass: "glass bg-primary/20 text-primary border border-primary/30",
    dot: "bg-primary"
  },
  accent: {
    glass: "glass bg-accent/20 text-accent border border-accent/30", 
    dot: "bg-accent"
  }
};

const aboutCards = [
  {
    id: "intro",
    title: "Sarah Chen, CPA",
    type: "intro",
    content: "15+ years transforming financial landscapes for Fortune 500 companies and emerging businesses.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    icon: Briefcase,
    color: "primary",
    span: "col-span-1 md:col-span-2 lg:col-span-2",
  },
  {
    id: "education",
    title: "Education & Credentials",
    type: "list",
    icon: GraduationCap,
    color: "primary",
    items: [
      "MBA in Finance - Wharton School",
      "CPA (Certified Public Accountant)",
      "CFA (Chartered Financial Analyst)",
      "FRM (Financial Risk Manager)",
    ],
    span: "col-span-1 row-span-1",
  },
  {
    id: "experience",
    title: "Experience",
    type: "stats",
    icon: TrendingUp,
    color: "accent",
    stats: [
      { label: "Years Experience", value: "15+" },
      { label: "Portfolio Value", value: "$500M+" },
      { label: "Client Savings", value: "40%" },
      { label: "Transformations", value: "150+" },
    ],
    span: "col-span-1 lg:row-span-2",
  },
  {
    id: "recognition",
    title: "Recognition & Leadership",
    type: "list",
    icon: Award,
    color: "primary",
    items: [
      "Industry Speaker & Thought Leader",
      "Finance Excellence Award 2023",
      "Top 40 Under 40 Finance Professionals",
      "Published Financial Analyst",
    ],
    span: "col-span-1 md:col-span-2 lg:col-span-1",
  },
  {
    id: "expertise",
    title: "Core Expertise",
    type: "skills",
    icon: Brain,
    color: "accent",
    skills: [
      { name: "Financial Analysis", level: 95 },
      { name: "Strategic Planning", level: 92 },
      { name: "Risk Management", level: 88 },
      { name: "Team Leadership", level: 90 },
    ],
    span: "col-span-1 md:col-span-2 lg:col-span-1",
  },
  {
    id: "approach",
    title: "My Approach",
    type: "philosophy",
    icon: Shield,
    color: "primary",
    content: "Combining analytical precision with strategic vision to deliver sustainable financial growth and operational excellence.",
    span: "col-span-1",
  },
];

export default function AboutSection() {
  const { elementRef, hasIntersected } = useIntersectionObserver();
  
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Animation configs with reduced motion support
  const getAnimationProps = (animationType: 'scale' | 'slideUp' | 'slideRight', delay = 0) => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        animate: hasIntersected ? { opacity: 1 } : {},
        transition: { duration: 0.3, delay }
      };
    }
    
    const animations = {
      scale: {
        initial: { opacity: 0, scale: 0.95 },
        animate: hasIntersected ? { opacity: 1, scale: 1 } : {},
        transition: { duration: 0.6, delay }
      },
      slideUp: {
        initial: { opacity: 0, y: 30 },
        animate: hasIntersected ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.6, delay }
      },
      slideRight: {
        initial: { opacity: 0, x: 30 },
        animate: hasIntersected ? { opacity: 1, x: 0 } : {},
        transition: { duration: 0.6, delay }
      }
    };
    
    return animations[animationType];
  };

  const renderCard = (card: typeof aboutCards[0], index: number) => {
    const baseClasses = "glass-strong rounded-2xl shadow-xl hover-lift hover-glow border border-border/20 overflow-hidden";
    
    switch (card.type) {
      case "intro":
        return (
          <motion.div
            key={card.id}
            {...getAnimationProps('scale', index * 0.1)}
            className={`${baseClasses} ${card.span} relative`}
            data-testid={`about-card-${card.id}`}
          >
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary via-accent to-primary"></div>
            <div className="relative p-8 h-full flex flex-col justify-between">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-3xl font-bold font-serif mb-2 gradient-text-accent">{card.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{card.content}</p>
                </div>
                <div className={`${colorClasses[card.color as keyof typeof colorClasses].glass} p-3 rounded-xl shadow-lg flex-shrink-0 ml-4`}>
                  <card.icon className="w-6 h-6" aria-hidden="true" />
                </div>
              </div>
              <div className="mt-4">
                <img
                  src={card.image}
                  alt="Professional finance workspace"
                  className="rounded-xl shadow-lg w-full h-32 object-cover"
                />
              </div>
            </div>
          </motion.div>
        );
      
      case "list":
        return (
          <motion.div
            key={card.id}
            {...getAnimationProps('slideUp', index * 0.1)}
            className={`${baseClasses} ${card.span} p-6`}
            data-testid={`about-card-${card.id}`}
          >
            <div className="flex items-center mb-4">
              <div className={`${colorClasses[card.color as keyof typeof colorClasses].glass} p-3 rounded-lg mr-3 shadow-lg`}>
                <card.icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold font-serif gradient-text-primary">{card.title}</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {card.items?.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-center">
                  <CheckCircle className="text-accent mr-2 w-3 h-3 flex-shrink-0" aria-hidden="true" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        );
      
      case "stats":
        return (
          <motion.div
            key={card.id}
            {...getAnimationProps('slideRight', index * 0.1)}
            className={`${baseClasses} ${card.span} p-6`}
            data-testid={`about-card-${card.id}`}
          >
            <div className="flex items-center mb-6">
              <div className={`${colorClasses[card.color as keyof typeof colorClasses].glass} p-3 rounded-lg mr-3 shadow-lg`}>
                <card.icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold font-serif">{card.title}</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {card.stats?.map((stat, statIndex) => (
                <div key={statIndex} className="text-center p-3 glass-light rounded-lg">
                  <div className="text-2xl font-bold gradient-text-static mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case "skills":
        return (
          <motion.div
            key={card.id}
            {...getAnimationProps('slideUp', index * 0.1)}
            className={`${baseClasses} ${card.span} p-6`}
            data-testid={`about-card-${card.id}`}
          >
            <div className="flex items-center mb-4">
              <div className={`${colorClasses[card.color as keyof typeof colorClasses].glass} p-3 rounded-lg mr-3 shadow-lg`}>
                <card.icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold font-serif gradient-text-primary">{card.title}</h3>
            </div>
            <div className="space-y-3">
              {card.skills?.map((skill, skillIndex) => (
                <div key={skillIndex} className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{skill.name}</span>
                    <span className="text-accent font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="progress-bar h-2 rounded-full"
                      style={{ 
                        '--progress-width': `${skill.level}%`,
                        width: hasIntersected ? `${skill.level}%` : '0%'
                      } as any}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case "philosophy":
        return (
          <motion.div
            key={card.id}
            {...getAnimationProps('scale', index * 0.1)}
            className={`${baseClasses} ${card.span} p-6 flex flex-col justify-center text-center relative`}
            data-testid={`about-card-${card.id}`}
          >
            <div className="absolute inset-0 opacity-5 bg-gradient-to-tr from-accent via-primary to-accent"></div>
            <div className="relative">
              <div className={`${colorClasses[card.color as keyof typeof colorClasses].glass} p-4 rounded-xl shadow-lg mx-auto mb-4 w-fit`}>
                <card.icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold font-serif mb-3 gradient-text-primary">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.content}</p>
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section id="about" className="py-20 bg-muted" ref={elementRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...getAnimationProps('slideUp', 0)}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 gradient-text">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Dedicated finance professional with a proven track record of driving growth and optimizing financial performance for Fortune 500 companies and emerging businesses.
          </p>
        </motion.div>

        {/* Improved Grid Layout with Better Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-min">
          {aboutCards.map((card, index) => renderCard(card, index))}
        </div>
      </div>
    </section>
  );
}
