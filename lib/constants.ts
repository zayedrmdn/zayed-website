import { personalInfo } from "@/lib/data/personal";

// Animation variants for Framer Motion
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Navigation items
interface NavigationItem {
  href: string;
  label: string;
  external?: boolean;
}

export const navigationItems: NavigationItem[] = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

// SEO constants
export const siteConfig = {
  title: `${personalInfo.name} | ${personalInfo.title}`,
  description: personalInfo.bio[0].split('.')[0] + `. Based in ${personalInfo.location}.`,
  keywords: ["AI Engineer", "Software Developer", "Computer Vision", "NLP", "Machine Learning", "Malaysia", "APU Graduate"],
  url: "https://zayedrmdn.com",
  ogImage: "/images/og-image.png",
};