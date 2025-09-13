import { motion } from "framer-motion";
import { Calculator, BarChart3, Lightbulb, Shield, Users, Settings, TrendingUp, DollarSign, PieChart } from "lucide-react";
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

const services = [
  {
    id: "accounting",
    icon: Calculator,
    title: "Financial Accounting",
    description: "Comprehensive accounting services including bookkeeping, financial statement preparation, tax planning, and compliance management.",
    features: ["Monthly Financial Statements", "Tax Planning & Preparation", "Audit Support", "Regulatory Compliance"],
    color: "primary",
    type: "standard",
    span: "col-span-1",
    highlight: "99.9% Accuracy Rate",
  },
  {
    id: "analysis",
    icon: BarChart3,
    title: "Financial Analysis",
    description: "In-depth financial analysis and modeling to drive strategic decision-making and identify growth opportunities.",
    features: ["Financial Modeling", "Performance Analytics", "Investment Analysis", "Risk Assessment"],
    color: "accent",
    type: "featured",
    span: "col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-2",
    highlight: "40% Average ROI Improvement",
    stats: [
      { label: "Models Built", value: "500+" },
      { label: "ROI Improved", value: "40%" },
      { label: "Decisions Supported", value: "1000+" },
    ],
  },
  {
    id: "consulting",
    icon: Lightbulb,
    title: "Strategic Consulting",
    description: "Strategic financial consulting to optimize operations, improve profitability, and accelerate business growth.",
    features: ["Strategic Planning", "Process Optimization", "M&A Advisory", "Financial Restructuring"],
    color: "primary",
    type: "standard",
    span: "col-span-1",
    highlight: "150+ Successful Transformations",
  },
  {
    id: "risk",
    icon: Shield,
    title: "Risk Management",
    description: "Comprehensive risk assessment and mitigation strategies to protect your business and investments.",
    features: ["Risk Assessment", "Compliance Monitoring", "Internal Controls", "Crisis Management"],
    color: "accent",
    type: "compact",
    span: "col-span-1 md:col-span-2 lg:col-span-1",
    highlight: "Zero Compliance Issues",
  },
  {
    id: "team",
    icon: Users,
    title: "Team Development",
    description: "Finance team training and development programs to enhance capabilities and drive organizational success.",
    features: ["Training Programs", "Process Documentation", "Performance Metrics", "Best Practices"],
    color: "primary",
    type: "standard",
    span: "col-span-1",
    highlight: "95% Team Satisfaction",
  },
  {
    id: "technology",
    icon: Settings,
    title: "Technology Integration",
    description: "Financial technology implementation and optimization to streamline processes and improve efficiency.",
    features: ["System Implementation", "Process Automation", "Data Integration", "Reporting Solutions"],
    color: "accent",
    type: "standard",
    span: "col-span-1",
    highlight: "60% Process Efficiency Gain",
  },
];

export default function ServicesSection() {
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

  const renderServiceCard = (service: typeof services[0], index: number) => {
    const baseClasses = "glass-strong rounded-2xl shadow-xl hover-lift hover-glow border border-border/20 relative overflow-hidden";
    
    switch (service.type) {
      case "featured":
        return (
          <motion.div
            key={service.id}
            {...getAnimationProps('scale', index * 0.1)}
            className={`${baseClasses} ${service.span} p-8`}
            data-testid={`service-card-${index}`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-accent via-primary to-accent"></div>
              <div className="absolute top-4 right-4">
                <PieChart className="w-32 h-32 text-accent/10 transform rotate-12" aria-hidden="true" />
              </div>
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className={`${colorClasses[service.color as keyof typeof colorClasses].glass} p-4 rounded-xl shadow-lg`}>
                  <service.icon className="w-8 h-8" aria-hidden="true" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground mb-1">Success Rate</div>
                  <div className="text-2xl font-bold gradient-text-static">{service.highlight}</div>
                </div>
              </div>
              
              <h3 className="text-3xl font-bold font-serif mb-4 gradient-text-card">{service.title}</h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed text-base">
                {service.description}
              </p>
              
              {/* Stats Grid for Featured Card */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {service.stats?.map((stat, statIndex) => (
                  <div key={statIndex} className="text-center p-3 glass-light rounded-lg">
                    <div className="text-lg font-bold gradient-text-static">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <ul className="space-y-2 text-sm text-muted-foreground">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <div className={`w-1.5 h-1.5 ${colorClasses[service.color as keyof typeof colorClasses].dot} rounded-full mr-2`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        );
      
      case "compact":
        return (
          <motion.div
            key={service.id}
            {...getAnimationProps('slideUp', index * 0.1)}
            className={`${baseClasses} ${service.span} p-6`}
            data-testid={`service-card-${index}`}
          >
            {/* Background Pattern */}
            <div className="absolute top-2 right-2 opacity-10">
              <TrendingUp className="w-16 h-16 text-accent transform rotate-12" aria-hidden="true" />
            </div>
            
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className={`${colorClasses[service.color as keyof typeof colorClasses].glass} p-3 rounded-lg mr-3 shadow-lg`}>
                  <service.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif gradient-text-card">{service.title}</h3>
                  <div className="text-xs text-accent font-semibold">{service.highlight}</div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {service.description}
              </p>
              
              <div className="grid grid-cols-2 gap-2">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-xs text-muted-foreground">
                    <div className={`w-1 h-1 ${colorClasses[service.color as keyof typeof colorClasses].dot} rounded-full mr-2`} />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      
      case "standard":
      default:
        return (
          <motion.div
            key={service.id}
            {...getAnimationProps('slideUp', index * 0.1)}
            className={`${baseClasses} ${service.span} p-7`}
            data-testid={`service-card-${index}`}
          >
            {/* Background Pattern */}
            <div className="absolute top-3 right-3 opacity-8">
              <DollarSign className="w-20 h-20 text-primary/10 transform -rotate-12" aria-hidden="true" />
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-5">
                <div className={`${colorClasses[service.color as keyof typeof colorClasses].glass} p-4 rounded-xl shadow-lg`}>
                  <service.icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Performance</div>
                  <div className="text-sm font-bold text-accent">{service.highlight}</div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold font-serif mb-4 gradient-text-card">{service.title}</h3>
              
              <p className="text-muted-foreground mb-5 leading-relaxed text-sm">
                {service.description}
              </p>
              
              <ul className="space-y-2 text-sm text-muted-foreground">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <div className={`w-1.5 h-1.5 ${colorClasses[service.color as keyof typeof colorClasses].dot} rounded-full mr-2`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <section id="services" className="py-20 bg-background" ref={elementRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...getAnimationProps('slideUp', 0)}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 gradient-text">Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive financial solutions tailored to your business needs, from strategic planning to implementation and optimization.
          </p>
        </motion.div>

        {/* MiladiCode-style Dynamic Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {services.map((service, index) => renderServiceCard(service, index))}
        </div>
        
        {/* Additional CTA Section */}
        <motion.div
          {...getAnimationProps('slideUp', 0.8)}
          className="mt-16 text-center glass-strong p-8 rounded-2xl shadow-xl border border-border/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5 bg-gradient-to-r from-primary via-accent to-primary"></div>
          <div className="relative">
            <h3 className="text-2xl font-bold font-serif mb-4 gradient-text-accent">Ready to Transform Your Financial Future?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let's discuss how these comprehensive financial solutions can be tailored to meet your specific business objectives and drive sustainable growth.
            </p>
            <button 
              className="glass bg-primary/20 text-primary border border-primary/30 px-8 py-3 rounded-xl font-semibold hover-lift hover-glow transition-all duration-300 shadow-lg"
              data-testid="button-contact-services"
            >
              Schedule Consultation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
