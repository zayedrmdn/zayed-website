// my-portfolio/components/layout/Navbar.tsx
"use client";
import { useState, useEffect } from "react";
import { Menu, X, FileText } from "lucide-react";
import { navigationItems } from "@/lib/constants";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Button from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
    // Trigger resume request selection after scroll
    setTimeout(() => {
      const event = new CustomEvent('selectInquiryType', { detail: 'resume' });
      window.dispatchEvent(event);
    }, 800);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "backdrop-blur-lg border-b border-border/30 shadow-sm bg-background/70"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 relative">
          {/* Desktop Navigation - Centered */}
          <motion.div
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + index * 0.1,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 100
                }}
                onClick={() => handleNavClick(item.href, item.external)}
                className="relative text-foreground/70 hover:text-foreground transition-all duration-300 font-medium px-4 py-2 rounded-md hover:bg-secondary/80 group/nav"
              >
                <span className="relative z-10">{item.label}</span>
                <motion.div
                  className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                />
              </motion.button>
            ))}
          </motion.div>

          {/* Desktop Actions - Right side */}
          <motion.div
            className="hidden md:flex items-center space-x-4 absolute right-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ThemeToggle />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={handleResumeRequest}
                className="flex items-center gap-2"
              >
                <FileText size={16} />
                Resume
              </Button>
            </motion.div>
          </motion.div>

          {/* Mobile menu button */}
          <motion.div
            className="md:hidden flex items-center space-x-2 absolute right-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ThemeToggle />
            </motion.div>
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:bg-accent/10 hover:text-accent transition-colors duration-200"
              aria-label="Toggle menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavClick(item.href, item.external)}
                    className="block w-full text-left px-3 py-2 text-foreground/80 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors duration-200"
                  >
                    {item.label}
                  </motion.button>
                ))}
                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResumeRequest}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <FileText size={16} />
                    Request Resume
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