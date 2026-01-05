"use client";
import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail, ArrowUp, Activity, Terminal, Cpu } from "lucide-react";

import { personalInfo } from "@/lib/data/personal";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [latency, setLatency] = useState(24);

  // Fake latency fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => Math.max(15, Math.min(45, prev + (Math.random() > 0.5 ? 2 : -2))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background/80 text-foreground pt-16 pb-8 border-t border-border/40 relative overflow-hidden backdrop-blur-sm">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand & Identity */}
          <div className="space-y-6 md:col-span-1">
            <div className="flex items-center gap-2 text-primary">
              <Terminal size={20} />
              <span className="font-mono font-bold tracking-wider">SYSTEM_ROOT</span>
            </div>
            <p className="text-muted-foreground font-mono text-xs leading-relaxed max-w-xs">
              {"//"} {personalInfo.name}<br />
              {"//"} AI_ENGINEER & SOFTWARE_DEV<br />
              {"//"} EST. {currentYear}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-mono text-sm font-bold text-foreground/80 flex items-center gap-2">
              <span className="text-primary">&gt;</span> QUICK_LINKS
            </h4>
            <div className="flex flex-col space-y-3">
              {[
                { href: "#about", label: "ABOUT.exe" },
                { href: "#experience", label: "LOGS" },
                { href: "#projects", label: "REPOSITORIES" },
                { href: "#skills", label: "MODULES" },
              ].map((link) => (
                <button
                  key={link.href}
                  onClick={() => {
                    const element = document.getElementById(link.href.replace('#', ''));
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="font-mono text-xs text-muted-foreground hover:text-primary transition-all text-left hover:translate-x-1 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-mono text-sm font-bold text-foreground/80 flex items-center gap-2">
              <span className="text-primary">&gt;</span> COMM_CHANNELS
            </h4>
            <div className="space-y-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="group flex items-center gap-3 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="p-2 bg-secondary/30 rounded border border-border/50 group-hover:border-primary/50 transition-colors">
                  <Mail size={14} />
                </div>
                <span>{personalInfo.email}</span>
              </a>

              <div className="flex gap-3">
                {personalInfo.social.github && (
                  <a
                    href={personalInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-secondary/30 rounded border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:-translate-y-1"
                  >
                    <Github size={16} />
                  </a>
                )}
                {personalInfo.social.linkedin && (
                  <a
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-secondary/30 rounded border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:-translate-y-1"
                  >
                    <Linkedin size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Back to Top - Large Button style */}
          <div className="flex flex-col justify-end">
            <button
              onClick={scrollToTop}
              className="group flex items-center justify-center gap-2 w-full py-4 border border-dashed border-border/40 hover:border-primary/50 rounded-lg text-muted-foreground hover:text-primary transition-all"
            >
              <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
              <span className="font-mono text-xs">RETURN_TO_TOP</span>
            </button>
          </div>
        </div>

        {/* System Status Bar */}
        <div className="border-t border-border/30 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] text-muted-foreground/60">

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span>SYSTEM_OPERATIONAL</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Activity size={12} />
              <span>LATENCY: {latency}ms</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Cpu size={12} />
              <span>CPU: OPTIMAL</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <span>© {currentYear} ZAYED_RAMADAN [MIT_LICENSE]</span>
          </div>
        </div>
      </div>
    </footer>
  );
}