import { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "news-credibility-nlp",
    title: "Enhancing News Credibility using NLP",
    description: "Final Year Project (Ongoing): Designing an NLP-based system to assess the credibility of online news content by analyzing linguistic features, source reliability, and sentiment patterns.",
    image: "/projects/factuai-preview.png",
    tags: ["Python", "NLP", "TensorFlow", "PyTorch", "Machine Learning", "Sentiment Analysis"],
    githubUrl: "https://github.com/zayedrmdn/FactuAI",
    featured: true,
  },
  {
    id: "flower-care-chatbot",
    title: "AI Chatbot – Flower Care Guidance",
    description: "Developed a Botpress-based chatbot integrated with a custom knowledge base to provide users with automated plant care support and gardening advice.",
    image: "/images/projects/ai-chatbot.png",
    tags: ["Botpress", "NLP", "AI", "Knowledge Base", "Customer Support"],
    featured: false,
  },
  {
    id: "langify-app",
    title: "Langify – Language Learning App",
    description: "Created a cross-platform language learning app in Flutter, leveraging Firebase Realtime Database for user progress tracking and content management.",
    image: "/images/projects/langify.png",
    tags: ["Flutter", "Dart", "Firebase", "Mobile Development", "Cross-platform"],
    githubUrl: "https://github.com/zayedrmdn/langify",
    featured: false,
  },
  {
    id: "trivia-quiz-cpp",
    title: "Trivia Quiz Game (C++)",
    description: "Built an interactive quiz game using C++ that applies data structures and sorting algorithms; designed for use by university lecturers for educational purposes.",
    image: "/images/projects/trivia-quiz.png",
    tags: ["C++", "Data Structures", "Algorithms", "Educational Software"],
    githubUrl: "https://github.com/zayedrmdn/DSTR-Assignment",
    featured: false,
  },
  {
    id: "university-food-ordering",
    title: "University Food Ordering System",
    description: "Developed a Java-based food ordering application for university cafeterias, applying object-oriented programming principles for user-friendly navigation and backend logic.",
    image: "/images/projects/food-ordering.png",
    tags: ["Java", "OOP", "Desktop Application", "UI/UX"],
    githubUrl: "https://github.com/zayedrmdn/University-Food-Ordering-System",
    featured: false,
  },
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    description: "Modern, responsive portfolio website built with Next.js 15, featuring dark mode, animations, and comprehensive theme system following next-themes best practices.",
    image: "/images/projects/portfolio.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "next-themes"],
    liveUrl: "https://zayedrmdn.com",
    featured: true,
  }
];