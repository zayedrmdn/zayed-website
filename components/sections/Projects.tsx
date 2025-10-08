// Projects.tsx
"use client";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { projects } from "@/lib/data/projects";
import { motion } from "framer-motion";

export default function Projects() {
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto">
        <SectionHeading 
          title="Featured Projects"
          subtitle="A showcase of my recent work in AI, machine learning, and web development"
        />

        {/* Featured Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 0.2}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card hover className="overflow-hidden group">
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/20 overflow-hidden transition-colors">
                    {project.image ? (
                      <Image 
                        src={project.image} 
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-background rounded-lg flex items-center justify-center mb-3 mx-auto shadow-lg border border-border">
                            <span className="text-2xl font-bold text-primary">{project.title.charAt(0)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Project Preview</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300"></div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md border border-accent/20 transition-colors hover:bg-accent/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Links */}
                    <div className="flex items-center space-x-3">
                      {project.githubUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(project.githubUrl, '_blank')}
                          className="flex items-center gap-2"
                        >
                          <Github size={16} />
                          Code
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(project.liveUrl, '_blank')}
                          className="flex items-center gap-2"
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <AnimatedSection delay={0.4}>
              <h3 className="text-2xl font-bold text-foreground text-center mb-8">
                Other Notable Projects
              </h3>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <AnimatedSection key={project.id} delay={0.6 + index * 0.1}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card hover className="p-6 h-full flex flex-col">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h4>
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded">
                              +{project.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Project Links */}
                      <div className="flex items-center space-x-2 pt-2 border-t border-border">
                        {project.githubUrl && (
                          <button
                            onClick={() => window.open(project.githubUrl, '_blank')}
                            className="p-2 text-muted-foreground hover:text-accent transition-colors duration-200"
                            aria-label="View code on GitHub"
                          >
                            <Github size={18} />
                          </button>
                        )}
                        {project.liveUrl && (
                          <button
                            onClick={() => window.open(project.liveUrl, '_blank')}
                            className="p-2 text-muted-foreground hover:text-accent transition-colors duration-200"
                            aria-label="View live demo"
                          >
                            <ExternalLink size={18} />
                          </button>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </>
        )}

        {/* View More Projects CTA */}
        <AnimatedSection delay={1.0}>
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Want to see more of my work?
            </p>
            <Button
              variant="outline"
              onClick={() => window.open('https://github.com/zayedrmdn', '_blank')}
              className="flex items-center gap-2 mx-auto"
            >
              <Github size={20} />
              View All Projects on GitHub
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}