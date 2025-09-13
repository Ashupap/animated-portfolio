import { motion } from "framer-motion";
import { GraduationCap, Trophy, CheckCircle, Star } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const education = [
  "MBA in Finance - Wharton School",
  "CPA (Certified Public Accountant)",
  "CFA (Chartered Financial Analyst)",
  "FRM (Financial Risk Manager)",
];

const highlights = [
  "$500M+ in managed financial portfolios",
  "40% average cost reduction for clients",
  "150+ successful financial transformations",
  "Industry Speaker & Thought Leader",
];

export default function AboutSection() {
  const { elementRef, hasIntersected } = useIntersectionObserver();

  return (
    <section id="about" className="py-20 bg-muted" ref={elementRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 gradient-text">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Dedicated finance professional with a proven track record of driving growth and optimizing financial performance for Fortune 500 companies and emerging businesses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Professional finance workspace"
              className="rounded-2xl shadow-2xl w-full h-auto hover-lift"
            />
          </motion.div>
          
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-card p-8 rounded-2xl shadow-lg hover-lift"
            >
              <div className="flex items-center mb-4">
                <div className="bg-primary text-primary-foreground p-3 rounded-lg mr-4">
                  <GraduationCap className="text-xl" />
                </div>
                <h3 className="text-2xl font-bold font-serif">Education & Credentials</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                {education.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="text-accent mr-2 w-4 h-4" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card p-8 rounded-2xl shadow-lg hover-lift"
            >
              <div className="flex items-center mb-4">
                <div className="bg-accent text-accent-foreground p-3 rounded-lg mr-4">
                  <Trophy className="text-xl" />
                </div>
                <h3 className="text-2xl font-bold font-serif">Career Highlights</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                {highlights.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Star className="text-accent mr-2 w-4 h-4" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
