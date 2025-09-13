import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const portfolioItems = [
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    category: "Corporate Finance",
    impact: "$50M Impact",
    title: "Fortune 500 Financial Restructuring",
    description: "Led comprehensive financial restructuring for a multinational corporation, resulting in 35% cost reduction and improved cash flow management across 12 global offices.",
    tags: ["Financial Modeling", "Cost Optimization", "Process Improvement"],
  },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    category: "Startup Growth",
    impact: "300% ROI",
    title: "Tech Startup Scaling Strategy",
    description: "Developed financial framework for rapid scaling, including investor relations, funding strategies, and operational efficiency improvements for Series B startup.",
    tags: ["Investment Strategy", "Growth Planning", "Investor Relations"],
  },
  {
    image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    category: "Manufacturing",
    impact: "$25M Savings",
    title: "Manufacturing Cost Optimization",
    description: "Implemented comprehensive cost analysis and optimization strategies for global manufacturing operations, achieving significant operational efficiency improvements.",
    tags: ["Cost Analysis", "Operational Efficiency", "Supply Chain"],
  },
  {
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    category: "Healthcare",
    impact: "100% Compliance",
    title: "Healthcare Financial Compliance",
    description: "Established comprehensive financial compliance framework for multi-location healthcare network, ensuring regulatory adherence and operational transparency.",
    tags: ["Regulatory Compliance", "Risk Management", "Financial Controls"],
  },
];

export default function PortfolioSection() {
  const { elementRef, hasIntersected } = useIntersectionObserver();

  return (
    <section id="portfolio" className="py-20 bg-muted" ref={elementRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 gradient-text">Portfolio</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Showcasing successful financial transformations and strategic implementations across diverse industries and business scales.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-2xl shadow-lg overflow-hidden hover-lift"
              data-testid={`portfolio-item-${index}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover"
              />
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    index % 2 === 0 ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
                  }`}>
                    {item.category}
                  </span>
                  <span className="text-accent font-semibold">{item.impact}</span>
                </div>
                
                <h3 className="text-2xl font-bold font-serif mb-4">{item.title}</h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {item.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button
                  className="text-accent font-semibold hover:text-accent/80 transition-colors duration-300 flex items-center"
                  data-testid={`view-case-study-${index}`}
                >
                  View Case Study <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Button
            className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover-lift"
            data-testid="button-view-all-projects"
          >
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
