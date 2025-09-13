import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useEffect, useState } from "react";

const technicalSkills = [
  { name: "Financial Modeling", percentage: 95 },
  { name: "Data Analysis", percentage: 90 },
  { name: "Risk Assessment", percentage: 88 },
  { name: "Excel/VBA", percentage: 85 },
  { name: "SQL/Database", percentage: 80 },
  { name: "Python/R", percentage: 75 },
];

const softSkills = [
  { name: "Strategic Thinking", percentage: 95 },
  { name: "Leadership", percentage: 92 },
  { name: "Communication", percentage: 90 },
  { name: "Problem Solving", percentage: 88 },
  { name: "Client Relations", percentage: 87 },
  { name: "Team Management", percentage: 85 },
];

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "200+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "$2B+", label: "Managed Assets" },
];

function SkillBar({ skill, index, isVisible }: { skill: { name: string; percentage: number }; index: number; isVisible: boolean }) {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedWidth(skill.percentage);
      }, index * 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, skill.percentage, index]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-foreground">{skill.name}</span>
        <span className="text-accent font-semibold">{skill.percentage}%</span>
      </div>
      <div className="bg-muted rounded-full h-3">
        <div
          className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${animatedWidth}%` }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const { elementRef, hasIntersected } = useIntersectionObserver();

  return (
    <section id="skills" className="py-20 bg-background" ref={elementRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 gradient-text">Skills & Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive skill set developed through years of experience in finance, technology, and strategic consulting across multiple industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold font-serif mb-8 text-center">Technical Skills</h3>
            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  index={index}
                  isVisible={hasIntersected}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold font-serif mb-8 text-center">Soft Skills</h3>
            <div className="space-y-6">
              {softSkills.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  index={index}
                  isVisible={hasIntersected}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="bg-card p-6 rounded-xl shadow-lg hover-lift">
              <div className={`text-3xl font-bold mb-2 ${index % 2 === 0 ? 'text-primary' : 'text-accent'}`}>
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
