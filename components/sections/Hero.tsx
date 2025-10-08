// components/sections/Hero.tsx
"use client";
import { ArrowDown, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { personalInfo } from "@/lib/data/personal";

export default function Hero() {
  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 transition-colors overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-primary/5 pointer-events-none" />
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-foreground"
                >
                  Hi, I&apos;m{" "}
                </motion.span>
                <motion.span
                  className="bg-gradient-to-r from-[hsl(var(--accent))] via-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)] dark:drop-shadow-[0_0_6px_hsl(var(--accent))] animate-gradient"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                  whileHover={{ scale: 1.05 }}
                >
                  {personalInfo.name}
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="mt-4 text-xl sm:text-2xl text-primary font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {personalInfo.title}
              </motion.p>
              
              <motion.p 
                className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                {personalInfo.tagline}
              </motion.p>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex items-center space-x-2 text-muted-foreground"
            >
              <MapPin size={18} />
              <span>{personalInfo.location}</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  onClick={handleContactClick}
                  size="lg"
                  className="flex items-center gap-2 w-full sm:w-auto bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--accent))] transition-colors"
                >
                  <Mail size={20} />
                  Get In Touch
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.open('/Zayed_Resume.pdf', '_blank')}
                  className="flex items-center gap-2 w-full sm:w-auto"
                >
                  View Resume
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex space-x-6"
            >
              {personalInfo.social.github && (
                <motion.a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors duration-200"
                  aria-label="GitHub"
                  whileHover={{ scale: 1.2, rotate: 5, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github size={24} />
                </motion.a>
              )}
              
              {personalInfo.social.linkedin && (
                <motion.a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors duration-200"
                  aria-label="LinkedIn"
                  whileHover={{ scale: 1.2, rotate: -5, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin size={24} />
                </motion.a>
              )}
              
              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="text-muted-foreground hover:text-accent transition-colors duration-200"
                aria-label="Email"
                whileHover={{ scale: 1.2, rotate: 10, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={24} />
              </motion.a>
            </motion.div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.2,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
              whileHover={{ 
                scale: 1.05,
                rotate: [0, -1, 1, 0],
                transition: { 
                  scale: { duration: 0.3 },
                  rotate: { duration: 0.6, repeat: Infinity, repeatDelay: 2 }
                }
              }}
              className="relative"
            >
              {/* Animated gradient border */}
              <motion.div 
                className="w-80 h-80 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 p-1"
                animate={{ 
                  rotate: 360,
                  background: [
                    "linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899)",
                    "linear-gradient(90deg, #06B6D4, #3B82F6, #8B5CF6)",
                    "linear-gradient(135deg, #EC4899, #EF4444, #F59E0B)",
                    "linear-gradient(180deg, #10B981, #06B6D4, #3B82F6)",
                    "linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899)"
                  ]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  background: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <motion.div 
                  className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden"
                  whileHover={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img 
                    src="/zayed-profile.jpg" 
                    alt="Zayed Ramadan Rahmat"
                    className="w-72 h-72 rounded-full object-cover"
                    initial={{ scale: 1.1, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    whileHover={{ 
                      scale: 1.1,
                      transition: { duration: 0.4 }
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* Floating rocket emoji */}
              <motion.div
                initial={{ opacity: 0, scale: 0, x: 20, y: -20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  x: 0, 
                  y: [-10, 10, -10],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 1.5 },
                  scale: { duration: 0.6, delay: 1.5, type: "spring" },
                  y: { duration: 4, repeat: Infinity, delay: 2 },
                  rotate: { duration: 6, repeat: Infinity, delay: 2.5 }
                }}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 360,
                  transition: { duration: 0.5 }
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-card rounded-full flex items-center justify-center shadow-lg border border-accent/30 cursor-pointer"
              >
                <motion.span 
                  className="text-2xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 3 }}
                >
                  🚀
                </motion.span>
              </motion.div>
              
              {/* Floating lightbulb emoji */}
              <motion.div
                initial={{ opacity: 0, scale: 0, x: -20, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  x: 0, 
                  y: [10, -10, 10],
                  rotate: [0, -10, 10, 0]
                }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 1.8 },
                  scale: { duration: 0.6, delay: 1.8, type: "spring" },
                  y: { duration: 3, repeat: Infinity, delay: 2.3 },
                  rotate: { duration: 5, repeat: Infinity, delay: 2.8 }
                }}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: -360,
                  transition: { duration: 0.5 }
                }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-card rounded-full flex items-center justify-center shadow-lg border border-purple-500/30 cursor-pointer"
              >
                <motion.span 
                  className="text-2xl"
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 3.5 }}
                >
                  💡
                </motion.span>
              </motion.div>

              {/* Floating particles */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  delay: 4,
                  repeatDelay: 2 
                }}
                className="absolute -top-8 left-1/2 w-2 h-2 bg-accent rounded-full"
              />
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  delay: 5,
                  repeatDelay: 3 
                }}
                className="absolute -right-8 top-1/2 w-2 h-2 bg-purple-500 rounded-full"
              />
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: 6,
                  repeatDelay: 4 
                }}
                className="absolute -left-8 bottom-1/3 w-2 h-2 bg-blue-500 rounded-full"
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={handleScrollDown}
            className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-accent transition-colors duration-200 group"
            aria-label="Scroll down"
          >
            <span className="text-sm font-medium">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown size={20} className="group-hover:scale-110 transition-transform" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}