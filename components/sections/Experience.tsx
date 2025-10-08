// Experience.tsx
"use client";
import { Calendar } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Card from "@/components/ui/Card";
import { experiences } from "@/lib/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto">
        <SectionHeading 
          title="Experience"
          subtitle="My professional journey and key accomplishments in AI and software development"
        />

        <div className="relative">
          {/* Timeline Line - stops before the "Ready for opportunities" section */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-slate-400 via-primary to-slate-300 transition-colors" style={{height: 'calc(100% - 45 px)'}}></div>

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <AnimatedSection key={experience.id} delay={index * 0.2}>
                <div className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline Dot */}
                  <div className="relative flex items-center justify-center w-16 h-16 md:w-4 md:h-4 bg-blue-600 rounded-full border-4 border-background shadow-lg z-10 mb-4 md:mb-0 transition-colors">
                    <div className="w-2 h-2 bg-white rounded-full md:hidden"></div>
                    <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-20 transition-colors"></div>
                  </div>

                  {/* Experience Card */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                    <Card hover className="p-6">
                      {/* Header */}
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-foreground">
                            {experience.title}
                          </h3>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                          <span className="font-semibold text-primary transition-colors">
                            {experience.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {experience.period}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-4">
                        <ul className="space-y-2">
                          {experience.description.map((item, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0 transition-colors"></div>
                              <span className="text-sm leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">
                          Technologies Used:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md border border-border"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Timeline End */}
          <AnimatedSection delay={experiences.length * 0.2 + 0.2}>
            <div className="flex items-center justify-center mt-12">
              <div className="flex items-center space-x-4 px-6 py-3 bg-muted rounded-full border border-muted shadow-lg transition-all duration-300">
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-pulse shadow-sm"></div>
                <span className="text-sm font-medium text-muted-foreground">
                  Ready for new opportunities
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}