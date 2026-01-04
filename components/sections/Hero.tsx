// Hero.tsx
"use client";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Terminal, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { personalInfo } from "@/lib/data/personal";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  // Parallax Mouse Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPoint = (clientX - left) / width - 0.5;
    const yPoint = (clientY - top) / height - 0.5;
    mouseX.set(xPoint);
    mouseY.set(yPoint);
  };

  const xSpring = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const ySpring = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background selection:bg-primary/20 selection:text-primary perspective-1000"
    >
      {/* Premium Atmospheric Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Grain Texture */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

        {/* Subtle Terminal Scanlines */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none" />
      </div>

      {/* Subtle Spotlight Gradient that follows mouse */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: useMotionTemplate`radial-gradient(800px circle at ${xSpring.get() * 100 + 50}% ${ySpring.get() * 100 + 50}%, hsl(var(--primary) / 0.08) 0%, transparent 100%)`
        }}
      />

      {/* Abstract Background Elements - Premium & Clean */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[50vh] h-[50vh] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[40vh] h-[40vh] bg-secondary/10 rounded-full blur-[100px]" />
      </div>


      <div className="max-w-7xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

        {/* Left Column: Text Content */}
        <motion.div
          style={{ y: y1 }}
          className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8"
        >

          {/* Terminal Badge - Clean, non-intrusive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50 text-xs font-mono text-foreground/80 backdrop-blur-sm shadow-sm hover:border-primary/30 transition-colors"
          >
            <Terminal size={12} className="text-primary" />
            <span>v2.0.0_build_final</span>
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-4">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground font-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              Hi, I&apos;m <br className="hidden lg:block" />
              <span className="text-primary inline-block relative">
                {personalInfo.name}
                {/* Subtle underline decoration */}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>
            </motion.h1>

            <motion.h2
              className="text-xl sm:text-2xl text-foreground/80 font-medium font-mono"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              {personalInfo.title}
            </motion.h2>
          </div>

          {/* Description */}
          <motion.p
            className="text-base sm:text-lg text-foreground/70 max-w-2xl leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            Crafting scalable software solutions and intelligent systems.
            Focused on performance, accessibility, and user-centric design.
          </motion.p>

          {/* Actions */}
          <motion.div
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          >
            <Button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: 'smooth' })} size="lg" className="group font-mono">
              View Projects
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>

            <div className="flex items-center gap-4 px-4">
              {personalInfo.social.github && (
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-primary transition-colors p-2"
                  aria-label="GitHub"
                >
                  <Github size={22} />
                </a>
              )}
              {personalInfo.social.linkedin && (
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-primary transition-colors p-2"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} />
                </a>
              )}
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-foreground/70 hover:text-primary transition-colors p-2"
                aria-label="Email"
              >
                <Mail size={22} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Visual Element */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative perspective-1000">
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              y: y2
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative w-72 h-72 sm:w-96 sm:h-96"
          >
            {/* Image Container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-muted shadow-2xl z-30 ring-1 ring-border/50 group transform transition-transform duration-500">
              <Image
                src="/zayed-profile.jpg"
                alt="Zayed Ramadan"
                fill
                priority
                className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Status Indicator - Refined Terminal Aesthetic */}
              <div className="absolute bottom-5 left-5 right-5 bg-zinc-950/90 backdrop-blur-xl border border-white/10 p-4 rounded-xl flex items-center gap-4 shadow-[0_0_20px_rgba(0,0,0,0.3)] z-40 transition-all duration-300 hover:border-primary/20 group/status">
                <div className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-40"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] font-mono font-bold text-white/60 uppercase tracking-[0.2em] leading-none">Status</p>
                    <span className="h-[2px] w-4 bg-primary/20 rounded-full" />
                  </div>
                  <p className="text-sm font-bold text-white tracking-tight group-hover/status:text-primary transition-colors">Open to opportunities</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.5 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-foreground/60 hover:text-primary transition-colors p-2 z-20"
        aria-label="Scroll down"
      >
        <ChevronDown size={24} />
      </motion.button>
    </section>
  );
}