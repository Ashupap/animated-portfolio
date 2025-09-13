import { motion, useAnimation } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useEffect, useState } from "react";
import { 
  Calculator, 
  BarChart3, 
  TrendingUp, 
  Shield, 
  Database, 
  PieChart, 
  FileSpreadsheet,
  Brain,
  Award,
  Building2,
  DollarSign,
  Target,
  Activity,
  Code,
  BookOpen,
  CreditCard,
  Briefcase,
  LineChart,
  Users,
  Settings
} from "lucide-react";

// Finance Skills Data Structure
const financeSkills = [
  // Software & Technology (first ring - inner)
  { 
    id: 'excel', 
    name: 'Excel Advanced', 
    category: 'software', 
    icon: FileSpreadsheet, 
    level: 95,
    ring: 1,
    color: 'primary'
  },
  { 
    id: 'powerbi', 
    name: 'Power BI', 
    category: 'software', 
    icon: BarChart3, 
    level: 90,
    ring: 1,
    color: 'accent'
  },
  { 
    id: 'tableau', 
    name: 'Tableau', 
    category: 'software', 
    icon: PieChart, 
    level: 88,
    ring: 1,
    color: 'primary'
  },
  { 
    id: 'sap', 
    name: 'SAP', 
    category: 'software', 
    icon: Building2, 
    level: 85,
    ring: 1,
    color: 'accent'
  },
  { 
    id: 'python', 
    name: 'Python', 
    category: 'software', 
    icon: Code, 
    level: 80,
    ring: 1,
    color: 'primary'
  },
  { 
    id: 'sql', 
    name: 'SQL', 
    category: 'software', 
    icon: Database, 
    level: 85,
    ring: 1,
    color: 'accent'
  },

  // Finance Expertise (second ring - middle)
  { 
    id: 'financial-analysis', 
    name: 'Financial Analysis', 
    category: 'expertise', 
    icon: Calculator, 
    level: 95,
    ring: 2,
    color: 'primary'
  },
  { 
    id: 'risk-management', 
    name: 'Risk Management', 
    category: 'expertise', 
    icon: Shield, 
    level: 92,
    ring: 2,
    color: 'accent'
  },
  { 
    id: 'valuation', 
    name: 'Valuation', 
    category: 'expertise', 
    icon: DollarSign, 
    level: 90,
    ring: 2,
    color: 'primary'
  },
  { 
    id: 'ma-advisory', 
    name: 'M&A Advisory', 
    category: 'expertise', 
    icon: Briefcase, 
    level: 88,
    ring: 2,
    color: 'accent'
  },
  { 
    id: 'tax-strategy', 
    name: 'Tax Strategy', 
    category: 'expertise', 
    icon: CreditCard, 
    level: 87,
    ring: 2,
    color: 'primary'
  },
  { 
    id: 'auditing', 
    name: 'Auditing', 
    category: 'expertise', 
    icon: BookOpen, 
    level: 85,
    ring: 2,
    color: 'accent'
  },
  { 
    id: 'financial-modeling', 
    name: 'Financial Modeling', 
    category: 'expertise', 
    icon: LineChart, 
    level: 93,
    ring: 2,
    color: 'primary'
  },
  { 
    id: 'strategic-planning', 
    name: 'Strategic Planning', 
    category: 'expertise', 
    icon: Target, 
    level: 91,
    ring: 2,
    color: 'accent'
  },

  // Certifications & Standards (third ring - outer)
  { 
    id: 'cpa', 
    name: 'CPA', 
    category: 'certification', 
    icon: Award, 
    level: 100,
    ring: 3,
    color: 'primary'
  },
  { 
    id: 'cfa', 
    name: 'CFA', 
    category: 'certification', 
    icon: TrendingUp, 
    level: 100,
    ring: 3,
    color: 'accent'
  },
  { 
    id: 'frm', 
    name: 'FRM', 
    category: 'certification', 
    icon: Shield, 
    level: 100,
    ring: 3,
    color: 'primary'
  },
  { 
    id: 'mba', 
    name: 'MBA', 
    category: 'certification', 
    icon: Brain, 
    level: 100,
    ring: 3,
    color: 'accent'
  },
  { 
    id: 'gaap', 
    name: 'GAAP', 
    category: 'standards', 
    icon: BookOpen, 
    level: 95,
    ring: 3,
    color: 'primary'
  },
  { 
    id: 'ifrs', 
    name: 'IFRS', 
    category: 'standards', 
    icon: Building2, 
    level: 90,
    ring: 3,
    color: 'accent'
  },
  { 
    id: 'sox', 
    name: 'SOX Compliance', 
    category: 'standards', 
    icon: Settings, 
    level: 88,
    ring: 3,
    color: 'primary'
  },
  { 
    id: 'leadership', 
    name: 'Team Leadership', 
    category: 'soft-skills', 
    icon: Users, 
    level: 92,
    ring: 3,
    color: 'accent'
  },
];

// Static color class mappings to prevent Tailwind JIT purging
const colorClasses = {
  primary: {
    glass: "glass bg-primary/20 text-primary border border-primary/30",
    dot: "bg-primary",
    glow: "shadow-lg shadow-primary/20"
  },
  accent: {
    glass: "glass bg-accent/20 text-accent border border-accent/30",
    dot: "bg-accent", 
    glow: "shadow-lg shadow-accent/20"
  }
};

// Ring configuration
const ringConfig = {
  1: { radius: 120, count: 6, speed: 60 }, // Inner ring - software
  2: { radius: 200, count: 8, speed: 45 }, // Middle ring - expertise  
  3: { radius: 280, count: 8, speed: 30 }  // Outer ring - certifications
};

interface SkillItemProps {
  skill: typeof financeSkills[0];
  index: number;
  ringIndex: number;
  totalInRing: number;
  isVisible: boolean;
  isPaused: boolean;
}

function SkillItem({ skill, index, ringIndex, totalInRing, isVisible, isPaused }: SkillItemProps) {
  const ringConf = ringConfig[skill.ring as keyof typeof ringConfig];
  const angle = (360 / totalInRing) * index;
  
  // Calculate position
  const x = Math.cos((angle * Math.PI) / 180) * ringConf.radius;
  const y = Math.sin((angle * Math.PI) / 180) * ringConf.radius;

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.div
      className={`absolute flex flex-col items-center cursor-pointer skill-item`}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isVisible ? { 
        opacity: 1, 
        scale: 1,
        rotate: prefersReducedMotion ? 0 : -360
      } : {}}
      transition={{
        opacity: { duration: 0.6, delay: index * 0.05 },
        scale: { duration: 0.6, delay: index * 0.05 },
        rotate: prefersReducedMotion ? {} : {
          duration: ringConf.speed,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }
      }}
      whileHover={{
        scale: 1.2,
        z: 10,
        transition: { duration: 0.2 }
      }}
      data-testid={`skill-${skill.id}`}
    >
      <div className={`${colorClasses[skill.color as keyof typeof colorClasses].glass} ${colorClasses[skill.color as keyof typeof colorClasses].glow} p-3 rounded-xl shadow-xl hover-lift relative group`}>
        <skill.icon className="w-6 h-6" aria-hidden="true" />
        
        {/* Skill Level Indicator */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-accent to-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
          {skill.level >= 95 ? '★' : skill.level >= 90 ? '◆' : '●'}
        </div>
        
        {/* Tooltip */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 glass-strong px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
          {skill.name}
          <div className="text-xs text-muted-foreground">{skill.level}%</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border/20"></div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsCarousel() {
  const { elementRef, hasIntersected } = useIntersectionObserver();
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Group skills by ring
  const skillsByRing = financeSkills.reduce((acc, skill) => {
    if (!acc[skill.ring]) acc[skill.ring] = [];
    acc[skill.ring].push(skill);
    return acc;
  }, {} as Record<number, typeof financeSkills>);

  // Animation configs with reduced motion support
  const getAnimationProps = (animationType: 'scale' | 'slideUp' | 'rotate', delay = 0) => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        animate: hasIntersected ? { opacity: 1 } : {},
        transition: { duration: 0.3, delay }
      };
    }
    
    const animations = {
      scale: {
        initial: { opacity: 0, scale: 0.8 },
        animate: hasIntersected ? { opacity: 1, scale: 1 } : {},
        transition: { duration: 0.8, delay }
      },
      slideUp: {
        initial: { opacity: 0, y: 30 },
        animate: hasIntersected ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.6, delay }
      },
      rotate: {
        initial: { opacity: 0, rotate: -180 },
        animate: hasIntersected ? { opacity: 1, rotate: 0 } : {},
        transition: { duration: 1, delay }
      }
    };
    
    return animations[animationType];
  };

  // Stats for the center
  const centerStats = [
    { label: "Years Experience", value: "15+", icon: TrendingUp },
    { label: "Certifications", value: "4", icon: Award },
    { label: "Technologies", value: "12+", icon: Settings },
    { label: "Expertise Areas", value: "8", icon: Brain },
  ];

  return (
    <section id="skills" className="py-20 bg-muted relative overflow-hidden" ref={elementRef}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary to-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-accent to-primary rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          {...getAnimationProps('slideUp', 0)}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 gradient-text">Skills & Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive portfolio of finance technology skills, professional certifications, and industry expertise developed over 15+ years of experience.
          </p>
        </motion.div>

        {/* Main Carousel Container */}
        <div className="relative flex justify-center items-center mb-16">
          {/* Mobile Fallback Grid */}
          <div className="block lg:hidden grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-2xl">
            {financeSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`${colorClasses[skill.color as keyof typeof colorClasses].glass} ${colorClasses[skill.color as keyof typeof colorClasses].glow} p-4 rounded-xl text-center hover-lift`}
                data-testid={`mobile-skill-${skill.id}`}
              >
                <skill.icon className="w-8 h-8 mx-auto mb-2" aria-hidden="true" />
                <div className="text-sm font-semibold">{skill.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{skill.level}%</div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Circular Carousel */}
          <div 
            className="hidden lg:block relative w-[640px] h-[640px]"
            onMouseEnter={() => !prefersReducedMotion && setIsPaused(true)}
            onMouseLeave={() => !prefersReducedMotion && setIsPaused(false)}
            data-testid="skills-carousel-desktop"
          >
            {/* Center Hub */}
            <motion.div
              {...getAnimationProps('scale', 0.3)}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass-strong p-8 rounded-2xl shadow-2xl text-center z-10"
              data-testid="carousel-center"
            >
              <div className="mb-4">
                <h3 className="text-2xl font-bold font-serif gradient-text-hero">Sarah Chen</h3>
                <p className="text-sm text-muted-foreground">Financial Expert</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {centerStats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <stat.icon className="w-4 h-4 mr-1 text-accent" aria-hidden="true" />
                      <span className="text-lg font-bold gradient-text-stats">{stat.value}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Rotating Skills by Ring */}
            {Object.entries(skillsByRing).map(([ring, skills]) => (
              <motion.div
                key={ring}
                className={`absolute inset-0 skill-ring-${ring}`}
                {...getAnimationProps('rotate', 0.2 * parseInt(ring))}
                animate={
                  hasIntersected && !prefersReducedMotion && !isPaused
                    ? { rotate: 360 }
                    : hasIntersected
                    ? { rotate: 0 }
                    : {}
                }
                transition={
                  prefersReducedMotion
                    ? {}
                    : {
                        rotate: {
                          duration: ringConfig[parseInt(ring) as keyof typeof ringConfig].speed,
                          ease: "linear",
                          repeat: Infinity,
                          repeatType: "loop"
                        }
                      }
                }
                style={{ transformOrigin: "50% 50%" }}
              >
                {skills.map((skill, index) => (
                  <SkillItem
                    key={skill.id}
                    skill={skill}
                    index={index}
                    ringIndex={parseInt(ring)}
                    totalInRing={skills.length}
                    isVisible={hasIntersected}
                    isPaused={isPaused}
                  />
                ))}
              </motion.div>
            ))}

            {/* Ring Visual Guides (subtle) */}
            {!prefersReducedMotion && (
              <>
                {[1, 2, 3].map((ring) => (
                  <div
                    key={ring}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-border/10 rounded-full pointer-events-none"
                    style={{
                      width: `${ringConfig[ring as keyof typeof ringConfig].radius * 2 + 60}px`,
                      height: `${ringConfig[ring as keyof typeof ringConfig].radius * 2 + 60}px`
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </div>

        {/* Legend */}
        <motion.div
          {...getAnimationProps('slideUp', 0.8)}
          className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground"
        >
          <div className="flex items-center">
            <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
            <span>Software & Technology</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-accent rounded-full mr-2"></div>
            <span>Expertise & Certifications</span>
          </div>
          <div className="flex items-center">
            <div className="text-accent mr-2">★</div>
            <span>Expert (95%+)</span>
          </div>
          <div className="flex items-center">
            <div className="text-primary mr-2">◆</div>
            <span>Advanced (90%+)</span>
          </div>
          <div className="flex items-center">
            <div className="text-muted-foreground mr-2">●</div>
            <span>Proficient (80%+)</span>
          </div>
        </motion.div>

        {/* Interactive Controls */}
        {!prefersReducedMotion && (
          <motion.div
            {...getAnimationProps('slideUp', 1.0)}
            className="text-center mt-8"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Hover over the carousel to pause rotation • Click skills for details
            </p>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="glass bg-primary/20 text-primary border border-primary/30 px-6 py-2 rounded-xl text-sm font-semibold hover-lift transition-all duration-300"
              data-testid="button-pause-carousel"
            >
              {isPaused ? 'Resume' : 'Pause'} Rotation
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}