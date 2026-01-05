// my-portfolio/components/layout/Navbar.tsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";

import ThemeToggle from "@/components/ui/ThemeToggle";
import Button from "@/components/ui/Button";

import { navigationItems } from "@/lib/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string, external?: boolean) => {
    setIsOpen(false);
    if (external) {
      window.location.href = href;
    } else {
      const element = document.getElementById(href.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleResumeRequest = () => {
    setIsOpen(false);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const event = new CustomEvent('selectInquiryType', { detail: 'resume' });
      window.dispatchEvent(event);
    }, 800);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm"
        : "bg-transparent border-b border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">

          {/* Left: System Status Indicator */}
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50 backdrop-blur-sm"
            >
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground font-bold tracking-wider hidden sm:inline-block">
                SYSTEM_ONLINE
              </span>
            </motion.div>
          </div>

          {/* Center: Desktop Navigation */}
          <motion.div
            className="hidden md:flex items-center space-x-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href, item.external)}
                className="relative px-4 py-2 group/nav overflow-hidden rounded-md transition-colors hover:bg-secondary/40"
              >
                <span className="relative z-10 text-xs font-mono text-muted-foreground group-hover/nav:text-primary transition-colors duration-300">
                  <span className="opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300 mr-1">&gt;</span>
                  {item.label}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/20 scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            ))}
          </motion.div>

          {/* Right: Actions */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ThemeToggle />

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden md:block"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={handleResumeRequest}
                className="font-mono text-xs h-9 border-primary/20 hover:border-primary/50 hover:bg-primary/5"
              >
                <FileText size={14} className="mr-2" />
                REQ_RESUME
              </Button>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </motion.div>
        </div>

        {/* Mobile Navigation Menu - Terminal Style */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="p-4 space-y-2 font-mono text-sm">
                <div className="px-2 pb-2 text-[10px] text-muted-foreground opacity-50 border-b border-border/20 mb-2">
                  {"// NAVIGATION_MODULE_V1.0"}
                </div>

                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNavClick(item.href, item.external)}
                    className="flex items-center w-full px-4 py-3 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all group"
                  >
                    <span className="text-primary/40 mr-3 group-hover:text-primary transition-colors">./</span>
                    {item.label}
                  </motion.button>
                ))}

                <div className="pt-4 border-t border-border/20 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResumeRequest}
                    className="w-full justify-center font-mono text-xs border-dashed"
                  >
                    <FileText size={14} className="mr-2" />
                    DOWNLOAD_RESUME
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}