// Footer.tsx
"use client";
import { Heart, Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { personalInfo } from "@/lib/data/personal";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-card via-card to-muted/30 text-card-foreground py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">{personalInfo.name}</h3>
            <p className="text-muted-foreground leading-relaxed">
              AI Engineer & Software Developer passionate about creating innovative solutions 
              that bridge cutting-edge technology with real-world applications.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { href: "#about", label: "About" },
                { href: "#experience", label: "Experience" },
                { href: "#projects", label: "Projects" },
                { href: "#skills", label: "Skills" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <button
                  key={link.href}
                  onClick={() => {
                    const element = document.getElementById(link.href.replace('#', ''));
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors text-left text-sm hover:translate-x-1 duration-300"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Get In Touch</h4>
            <div className="space-y-2">
              <a 
                href={`mailto:${personalInfo.email}`}
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 duration-300"
              >
                <Mail size={16} />
                <span>{personalInfo.email}</span>
              </a>
              <p className="text-muted-foreground text-sm">{personalInfo.location}</p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              {personalInfo.social.github && (
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 text-accent-foreground rounded-lg shadow-md hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
              )}
              
              {personalInfo.social.linkedin && (
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground rounded-lg shadow-md hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              )}
              
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2 bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary/80 text-secondary-foreground rounded-lg shadow-md hover:shadow-lg hover:shadow-secondary/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© {currentYear} {personalInfo.name}. Made with</span>
              <Heart size={14} className="text-red-500 animate-pulse" />
              <span>using Next.js & TypeScript</span>
            </div>
            
            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <span>Back to top</span>
              <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}