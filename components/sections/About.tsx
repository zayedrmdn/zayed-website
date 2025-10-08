// About.tsx
"use client";
import { GraduationCap, Award, MapPin, Calendar } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Card from "@/components/ui/Card";
import { personalInfo } from "@/lib/data/personal";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto">
        <SectionHeading 
          title="About Me"
          subtitle="Get to know more about my background, education, and achievements"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Bio Content */}
          <div className="space-y-6">
            <AnimatedSection delay={0.2}>
              <div className="space-y-4">
                {personalInfo.bio.map((paragraph, index) => (
                  <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </AnimatedSection>

            {/* Key Achievements */}
            <AnimatedSection delay={0.4}>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Award className="text-accent" size={24} />
                  Key Achievements
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">
                      Engineered real-time computer vision system with <span className="font-semibold text-accent">93% accuracy</span> for autonomous agricultural robots at Meraque Services
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">
                      Top 10 finalist in AWS DeepRacer Challenge and Top 6 in MumTec Hackathon at Monash University
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">
                      Led technical teams of 20+ members and supervised training programs for 30+ new assistants
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Education & Info Cards */}
          <div className="space-y-6">
            {/* Education Card */}
            <AnimatedSection delay={0.3} direction="right">
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-accent/10 rounded-lg transition-colors hover:bg-accent/20">
                    <GraduationCap className="text-accent" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Education
                    </h3>
                    <div className="space-y-2">
                      <p className="font-medium text-foreground">
                        {personalInfo.education.degree}
                      </p>
                      <p className="text-muted-foreground">
                        {personalInfo.education.university}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Scholarship: <span className="font-semibold text-accent">{personalInfo.education.gpa}</span>
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar size={14} />
                          {personalInfo.education.period}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* Location & Contact Card */}
            <AnimatedSection delay={0.5} direction="right">
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-accent" size={20} />
                    <span className="text-muted-foreground">{personalInfo.location}</span>
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground mb-3">Available for:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-secondary text-secondary-foreground text-sm rounded-full border border-secondary shadow-sm">
                        Full-time roles
                      </span>
                      <span className="px-3 py-1.5 bg-accent/10 text-accent text-sm rounded-full border border-accent/20 shadow-sm">
                        Remote work
                      </span>
                      <span className="px-3 py-1.5 bg-accent text-accent-foreground text-sm rounded-full border border-accent shadow-sm">
                        AI Engineering
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* Fun Facts */}
            <AnimatedSection delay={0.6} direction="right">
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Quick Facts
                </h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">6+</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">1+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">93%</div>
                    <div className="text-sm text-muted-foreground">AI Model Accuracy</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">7.5</div>
                    <div className="text-sm text-muted-foreground">IELTS Score</div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}