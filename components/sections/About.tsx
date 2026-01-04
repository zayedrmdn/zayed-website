// About.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Cpu,
  Activity,
  GitBranch,
  Award,
  Globe,
  Clock,
  CheckCircle2,
  ChevronRight,
  Zap
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { personalInfo } from "@/lib/data/personal";

// Type definition for typing effect
const TypewriterEffect = ({ text, delay = 0, speed = 30 }: { text: string, delay?: number, speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return <span>{displayedText}</span>;
};

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden bg-zinc-950/[0.02]">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="System Overview"
          subtitle="Architecture, capabilities, and operational status"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 items-start">

          {/* LEFT COLUMN: TERMINAL CONSOLE (Span 7) */}
          <motion.div
            className="lg:col-span-7 w-full"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Terminal Window */}
            <div className="rounded-xl overflow-hidden bg-[#0c0c0c] border border-white/10 shadow-2xl shadow-indigo-500/5 group">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-400/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-400/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-400/20" />
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-zinc-500 flex items-center gap-2">
                  <Terminal size={12} />
                  <span>zayed@portfolio:~</span>
                </div>
                <div className="w-12" /> {/* Spacer for balance */}
              </div>

              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm sm:text-base space-y-6 min-h-[400px] text-zinc-300">

                {/* Command 1: cat bio */}
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 mb-2">
                    <ChevronRight size={16} />
                    <span className="font-bold">cat bio.txt</span>
                  </div>
                  <div className="pl-4 border-l-2 border-zinc-800 space-y-4">
                    {personalInfo.bio.map((paragraph, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 + (index * 0.2), duration: 0.5 }}
                        className="leading-relaxed text-zinc-400"
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                </div>

                {/* Command 2: list highlights */}
                <div className="pt-2">
                  <div className="flex items-center gap-2 text-emerald-400 mb-2">
                    <ChevronRight size={16} />
                    <span className="font-bold">
                      <TypewriterEffect text="list highlights --sort=grade" delay={1500} />
                    </span>
                  </div>
                  <div className="pl-4 space-y-2">
                    {["Developed AI Fact-Checking System (Grade A+)",
                      "Rover Distance Measurement System (0.4m acc)",
                      "Agri-Robot Vision Model (93% accuracy)",
                      "AWS DeepRacer & MumTec Finalist"].map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 2.5 + (idx * 0.1) }}
                          className="flex items-center gap-3 group/item"
                        >
                          <CheckCircle2 size={14} className="text-emerald-500/70 group-hover/item:text-emerald-400 transition-colors" />
                          <span className="text-zinc-400 group-hover/item:text-zinc-200 transition-colors">
                            &quot;{item}&quot;
                          </span>
                        </motion.div>
                      ))}
                  </div>
                </div>

                {/* Blinking Cursor */}
                <div className="flex items-center gap-2 pt-4">
                  <span className="text-emerald-500 font-bold">➜</span>
                  <span className="w-2.5 h-5 bg-emerald-500/50 animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: SYSTEM SPECS (Span 5) */}
          <motion.div
            className="lg:col-span-5 grid grid-cols-1 gap-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >

            {/* Header: System Specs */}
            <div className="flex items-center gap-3 pb-2 border-b border-border/50">
              <Cpu className="text-primary" size={20} />
              <h3 className="font-bold font-heading text-lg">System Specifications</h3>
            </div>

            {/* Block 1: Education (Kernel) */}
            <div className="bg-card border border-border/60 hover:border-primary/30 transition-colors rounded-xl p-5 shadow-sm group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Award size={20} />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-2 py-1 rounded border border-border uppercase tracking-widest">
                  Kernel v1.0
                </span>
              </div>
              <h4 className="font-bold text-foreground text-lg mb-1">{personalInfo.education.degree}</h4>
              <p className="text-primary font-medium text-sm mb-4">{personalInfo.education.university}</p>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-secondary/40 p-2 rounded border border-border/50">
                  <span className="text-muted-foreground block mb-1">GPA</span>
                  <span className="text-foreground font-bold">{personalInfo.education.gpa}</span>
                </div>
                <div className="bg-secondary/40 p-2 rounded border border-border/50">
                  <span className="text-muted-foreground block mb-1">BUILD</span>
                  <span className="text-foreground font-bold">{personalInfo.education.period}</span>
                </div>
              </div>
            </div>

            {/* Block 2: Performance Metrics (Stats) */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "PROJECTS", value: "6+", icon: GitBranch },
                { label: "EXP (YR)", value: "1+", icon: Clock },
                { label: "IELTS", value: "7.5", icon: Globe },
              ].map((stat, i) => (
                <div key={i} className="bg-card border border-border/60 p-3 rounded-xl text-center hover:-translate-y-1 transition-transform duration-300 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <stat.icon size={12} className="text-primary/50" />
                  </div>
                  <div className="text-2xl font-bold font-heading text-foreground mb-1 group-hover:text-primary transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Block 3: Status (Telemetry) */}
            <div className="bg-gradient-to-br from-card to-secondary/30 border border-border/60 rounded-xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute top-2 right-2 flex gap-1">
                {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-emerald-500/30" />)}
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <Zap size={20} className="text-emerald-500" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-card flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono text-emerald-600/80 uppercase tracking-wider font-bold mb-0.5">
                    Operational Status
                  </div>
                  <div className="font-bold text-foreground">
                    Accepting New Tasks
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border/40 flex justify-between items-center text-xs font-mono">
                <span className="text-muted-foreground">Location</span>
                <span className="text-foreground font-bold flex items-center gap-1">
                  <Activity size={12} className="text-primary" />
                  {personalInfo.location}
                </span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}