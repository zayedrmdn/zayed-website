export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  organization: string;
  date: string;
  type: 'competition' | 'hackathon' | 'scholarship' | 'recognition' | 'certification';
  icon?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string[];
  education: {
    degree: string;
    university: string;
    gpa: string;
    period: string;
  };
  location: string;
  email: string;
  phone?: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface ExtraCurricularActivity {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string | string[];
  role: string;
}

export type Theme = "light" | "dark";

export interface ContactFormData {
  name: string;
  email: string;
  inquiryType: string;
  message?: string;
}