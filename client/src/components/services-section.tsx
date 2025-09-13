import { motion } from "framer-motion";
import { Calculator, BarChart3, Lightbulb, Shield, Users, Settings } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const services = [
  {
    icon: Calculator,
    title: "Financial Accounting",
    description: "Comprehensive accounting services including bookkeeping, financial statement preparation, tax planning, and compliance management.",
    features: ["Monthly Financial Statements", "Tax Planning & Preparation", "Audit Support", "Regulatory Compliance"],
    color: "bg-primary",
  },
  {
    icon: BarChart3,
    title: "Financial Analysis",
    description: "In-depth financial analysis and modeling to drive strategic decision-making and identify growth opportunities.",
    features: ["Financial Modeling", "Performance Analytics", "Investment Analysis", "Risk Assessment"],
    color: "bg-accent",
  },
  {
    icon: Lightbulb,
    title: "Strategic Consulting",
    description: "Strategic financial consulting to optimize operations, improve profitability, and accelerate business growth.",
    features: ["Strategic Planning", "Process Optimization", "M&A Advisory", "Financial Restructuring"],
    color: "bg-primary",
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Comprehensive risk assessment and mitigation strategies to protect your business and investments.",
    features: ["Risk Assessment", "Compliance Monitoring", "Internal Controls", "Crisis Management"],
    color: "bg-accent",
  },
  {
    icon: Users,
    title: "Team Development",
    description: "Finance team training and development programs to enhance capabilities and drive organizational success.",
    features: ["Training Programs", "Process Documentation", "Performance Metrics", "Best Practices"],
    color: "bg-primary",
  },
  {
    icon: Settings,
    title: "Technology Integration",
    description: "Financial technology implementation and optimization to streamline processes and improve efficiency.",
    features: ["System Implementation", "Process Automation", "Data Integration", "Reporting Solutions"],
    color: "bg-accent",
  },
];

export default function ServicesSection() {
  const { elementRef, hasIntersected } = useIntersectionObserver();

  return (
    <section id="services" className="py-20 bg-background" ref={elementRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 gradient-text">Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive financial solutions tailored to your business needs, from strategic planning to implementation and optimization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-strong p-8 rounded-2xl shadow-xl hover-lift hover-glow border border-border/20"
              data-testid={`service-card-${index}`}
            >
              <div className={`glass ${service.color === 'bg-primary' ? 'bg-primary/20 text-primary border-primary/30' : 'bg-accent/20 text-accent border-accent/30'} border p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 shadow-lg`}>
                <service.icon className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-bold font-serif mb-4">{service.title}</h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2 text-sm text-muted-foreground">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
