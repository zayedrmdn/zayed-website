// Projects.tsx
"use client";
import Image from "next/image";
import {
  Github,
  ExternalLink,
  ArrowRight,
  Folder,
  FileCode,
  FileJson,
  Star,
  GitFork,
  Layout,
  Database,
  Globe,
  Circle
} from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import { projects } from "@/lib/data/projects";

// Helper to determine icon based on tech name
const getFileIcon = (tech: string) => {
  const lower = tech.toLowerCase();
  if (lower.includes('react') || lower.includes('next') || lower.includes('vue') || lower.includes('frontend')) return <Layout size={14} className="text-blue-400" />;
  if (lower.includes('data') || lower.includes('sql') || lower.includes('mongo') || lower.includes('backend')) return <Database size={14} className="text-emerald-400" />;
  if (lower.includes('css') || lower.includes('tailwind') || lower.includes('style')) return <FileCode size={14} className="text-pink-400" />;
  if (lower.includes('json') || lower.includes('config')) return <FileJson size={14} className="text-yellow-400" />;
  return <FileCode size={14} className="text-zinc-400" />;
};

export default function Projects() {
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-24 md:py-32 bg-zinc-950/[0.02] relative overflow-hidden">

      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Featured Repositories"
          subtitle="Selected works from my personal codebase"
        />

        <div className="space-y-24 mt-16 lg:mt-24">
          {featuredProjects.map((project, index) => (
            <div key={project.id} className="group">
              <AnimatedSection delay={index * 0.1}>
                {/* Repo Card Shell */}
                <div className="border border-border/80 bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-500 flex flex-col lg:flex-row h-full">

                  {/* LEFT SIDE: FILE EXPLORER (Tech Stack) */}
                  <div className="w-full lg:w-72 bg-secondary/30 border-b lg:border-b-0 lg:border-r border-border/60 flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b border-border/60 flex items-center gap-2 bg-secondary/50">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-border" />
                        <div className="w-2.5 h-2.5 rounded-full bg-border" />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground ml-2">Explorer</span>
                    </div>

                    {/* File Tree */}
                    <div className="p-4 flex-grow font-mono text-xs sm:text-sm text-muted-foreground overflow-y-auto max-h-[200px] lg:max-h-none">
                      <div className="flex items-center gap-2 text-foreground font-bold mb-2">
                        <Folder size={14} className="fill-blue-500/20 text-blue-500" />
                        <span>{project.title.toLowerCase().replace(/\s+/g, '-')}</span>
                      </div>
                      <div className="pl-4 border-l border-border/50 ml-1.5 space-y-1">
                        {/* Mock Folder Structure based on tags */}
                        <div className="flex items-center gap-2 text-zinc-600">
                          <Folder size={14} />
                          <span>src</span>
                        </div>
                        <div className="pl-4 border-l border-border/50 ml-1.5 space-y-1.5 pt-1">
                          {project.tags.map((tag, idx) => (
                            <div key={idx} className="flex items-center gap-2 group/file cursor-default">
                              {getFileIcon(tag)}
                              <span className="group-hover/file:text-foreground transition-colors">{tag}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <FileCode size={14} className="text-zinc-600" />
                          <span>README.md</span>
                        </div>
                      </div>
                    </div>

                    {/* Repo Stats */}
                    <div className="p-4 border-t border-border/60 bg-secondary/20">
                      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-2">
                        <span>Languages</span>
                      </div>
                      <div className="flex h-1.5 w-full rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-blue-500" style={{ width: '45%' }} />
                        <div className="h-full bg-emerald-500" style={{ width: '30%' }} />
                        <div className="h-full bg-yellow-500" style={{ width: '15%' }} />
                        <div className="h-full bg-zinc-500" style={{ width: '10%' }} />
                      </div>
                      <div className="flex gap-3 text-[10px] text-zinc-500 font-mono">
                        <div className="flex items-center gap-1"><Circle size={6} className="fill-blue-500 text-blue-500" /> TypeScript</div>
                        <div className="flex items-center gap-1"><Circle size={6} className="fill-emerald-500 text-emerald-500" /> CSS</div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE: README PREVIEW (Content) */}
                  <div className="flex-1 flex flex-col min-w-0">
                    {/* Repo Header */}
                    <div className="px-4 s:px-6 py-4 border-b border-border/60 flex flex-wrap items-center justify-between gap-4 bg-card">
                      <div className="flex items-center gap-2">
                        <Image src="/zayed-profile.jpg" width={20} height={20} alt="User" className="rounded-full grayscale opacity-70" />
                        <span className="text-sm text-muted-foreground mr-1">/</span>
                        <h3 className="text-base sm:text-lg font-bold text-foreground hover:underline decoration-primary cursor-pointer decoration-2 underline-offset-4">
                          {project.title}
                        </h3>
                        <span className="ml-2 px-2 py-0.5 rounded-full bg-secondary text-[10px] border border-border text-muted-foreground font-mono font-bold uppercase">
                          Public
                        </span>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3">
                        {project.githubUrl && (
                          <Button size="sm" variant="outline" className="h-8 gap-2 px-3 bg-secondary/50 border-border/80 hover:bg-secondary hover:border-primary/50 text-xs sm:text-sm font-bold" onClick={() => window.open(project.githubUrl, '_blank')}>
                            <Github size={14} />
                            <span className="hidden sm:inline">Star</span>
                            <span className="bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded-md text-[10px] ml-1 opacity-70">
                              {Math.floor((index + 1) * 10 + 40)}
                            </span>
                          </Button>
                        )}
                        {project.liveUrl && (
                          <Button size="sm" variant="primary" className="h-8 gap-2 px-3 text-xs sm:text-sm" onClick={() => window.open(project.liveUrl, '_blank')}>
                            <Globe size={14} />
                            <span className="hidden sm:inline">Deployment</span>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Readme Content */}
                    <div className="p-6 md:p-8 space-y-6 flex-grow bg-card/50">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2 mb-4 flex items-center gap-2">
                        <FileCode size={14} /> README.md
                      </h4>

                      <p className="text-foreground/90 leading-relaxed font-sans text-sm sm:text-base">
                        {project.description}
                      </p>

                      {project.image && (
                        <div className="relative mt-6 rounded-lg overflow-hidden border border-border/60 shadow-md group/image">
                          <div className="absolute inset-0 bg-zinc-950/20 group-hover/image:bg-transparent transition-colors z-10" />
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={800}
                            height={450}
                            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover/image:scale-105"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </AnimatedSection>
            </div>
          ))}
        </div>

        {/* Other Projects Archive */}
        {otherProjects.length > 0 && (
          <div className="mt-32">
            <SectionHeading
              title="Archived Projects"
              subtitle="Experimental builds and utilities"
              className="mb-12 text-center"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {otherProjects.map((project, index) => (
                <AnimatedSection key={project.id} delay={0.2 + (index * 0.05)}>
                  <div className="group bg-card border border-border/60 hover:border-primary/50 rounded-lg p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2 text-foreground font-bold text-sm">
                        <Folder size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="group-hover:text-primary transition-colors">{project.title}</span>
                      </div>
                      <div className="flex gap-2 text-muted-foreground">
                        {project.liveUrl && <ExternalLink size={14} className="hover:text-foreground cursor-pointer" onClick={() => window.open(project.liveUrl, '_blank')} />}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 flex-grow font-medium line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/30 text-[10px] text-zinc-500 font-mono">
                      <div className="flex items-center gap-1">
                        <Circle size={8} className="fill-zinc-500" />
                        {project.tags[0] || "JavaScript"}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={10} /> {Math.floor((index * 3) + 2)}
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork size={10} /> {Math.floor((index * 2) + 1)}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                onClick={() => window.open('https://github.com/zayedrmdn', '_blank')}
                variant="outline"
                className="gap-2 group border-border hover:border-primary text-foreground font-mono text-xs sm:text-sm"
              >
                <Github size={16} />
                github.com/zayedrmdn
              </Button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}