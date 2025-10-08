// Skills.tsx
"use client";
import { Code, Database, Cpu, Globe, Wrench, Users } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Card from "@/components/ui/Card";
import { skills } from "@/lib/data/skills";
import { motion } from "framer-motion";

const categoryIcons = {
  "Programming Languages": Code,
  "AI & Machine Learning": Cpu,
  "Frameworks & Tools": Wrench,
  "Development Practices": Database,
  "Languages": Globe,
  "Certifications & Achievements": Users,
};

const categoryColors = {
  "Programming Languages": "bg-accent/10 border-accent/20 text-accent hover:bg-accent/20",
  "AI & Machine Learning": "bg-accent border-accent text-accent-foreground hover:bg-accent/80",
  "Frameworks & Tools": "bg-secondary border-secondary text-secondary-foreground hover:bg-secondary/80",
  "Development Practices": "bg-muted border-muted text-muted-foreground hover:bg-muted/80",
  "Languages": "bg-accent/20 border-accent/30 text-accent hover:bg-accent/30",
  "Certifications & Achievements": "bg-secondary border-secondary text-secondary-foreground hover:bg-secondary/80",
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto">
        <SectionHeading 
          title="Skills & Expertise"
          subtitle="Technologies and tools I use to bring ideas to life"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skillCategory, categoryIndex) => {
            const IconComponent = categoryIcons[skillCategory.category as keyof typeof categoryIcons] || Code;
            const colorClass = categoryColors[skillCategory.category as keyof typeof categoryColors] || categoryColors["Programming Languages"];

            return (
              <AnimatedSection key={skillCategory.category} delay={categoryIndex * 0.2}>
                <Card hover className="p-6 h-full">
                  {/* Category Header */}
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-accent/10 rounded-lg transition-colors hover:bg-accent/20">
                      <IconComponent className="text-accent" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {skillCategory.category}
                    </h3>
                  </div>

                  {/* Skills Grid */}
                  <div className="flex flex-wrap gap-3">
                    {skillCategory.items.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: categoryIndex * 0.2 + skillIndex * 0.05,
                          ease: "easeOut"
                        }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span
                          className={`
                            px-3 py-2 rounded-lg border font-medium text-sm transition-all duration-200 
                            cursor-default select-none
                            ${colorClass}
                            hover:shadow-md hover:-translate-y-0.5
                          `}
                        >
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Skill Count Badge */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                      {skillCategory.items.length} skills
                    </span>
                  </div>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Skill Progress Indicators */}
        <AnimatedSection delay={1.0}>
          <div className="mt-12">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
                Proficiency Levels
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary-foreground font-bold text-lg">★★★</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Expert</h4>
                  <p className="text-sm text-muted-foreground">Python, Java, Computer Vision, AI/ML</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary-foreground font-bold text-lg">★★</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Proficient</h4>
                  <p className="text-sm text-muted-foreground">C/C++, Flutter, Firebase, Git</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary-foreground font-bold text-lg">★</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Learning</h4>
                  <p className="text-sm text-muted-foreground">Advanced Deep Learning, Cloud Platforms</p>
                </div>
              </div>
            </Card>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}