import { Achievement, ExtraCurricularActivity } from "@/lib/types";

export const achievements: Achievement[] = [
  {
    id: "aws-deepracer",
    title: "Top 10 Finalist – AWS DeepRacer Challenge",
    organization: "Amazon Web Services",
    date: "Oct 2024",
    description: "Ranked among the top 10 teams in an autonomous racing challenge using reinforcement learning. Collaborated in a 3-member team to optimize a virtual car's performance using AWS SageMaker and simulation environments.",
    type: "competition",
    icon: "trophy"
  },
  {
    id: "mumtec-hackathon",
    title: "Top 6 Finalist – MumTec Hackathon",
    organization: "Monash University",
    date: "Oct 2024",
    description: "Developed an AI-powered firmware prototype focused on decentralized identity management using blockchain technology. Competed against 20+ teams in a hackathon sponsored by Western Digital, earning finalist placement for innovation and technical execution.",
    type: "hackathon",
    icon: "code"
  },
  {
    id: "grand-tuition-scholarship",
    title: "Grand Tuition Scholarship",
    organization: "Asia Pacific University of Technology and Innovation (APU)",
    date: "2022",
    description: "Awarded full tuition scholarship for exceptional academic performance and potential in Computer Science with AI specialization.",
    type: "scholarship",
    icon: "award"
  },
  {
    id: "top-performer-training",
    title: "Top 15 Performer in Technical Training",
    organization: "Asia Pacific University (APU)",
    date: "2023",
    description: "Recognized among the top 15 out of 40 trainees based on performance during technical assistant training program, demonstrating strong work ethic and technical ability.",
    type: "recognition",
    icon: "star"
  },
  {
    id: "functional-unit-selection",
    title: "Top 5 Candidate Selection",
    organization: "Asia Pacific University (APU)",
    date: "2023",
    description: "Chosen as one of the top 5 candidates to join a specialized software functional unit, selected for consistent performance and strong teamwork capabilities.",
    type: "recognition",
    icon: "users"
  },
  {
    id: "ielts-certification",
    title: "IELTS Band 7.5",
    organization: "International English Language Testing System",
    date: "2024",
    description: "Achieved Band 7.5 in IELTS, demonstrating strong English proficiency across all four skills: listening, reading, writing, and speaking.",
    type: "certification",
    icon: "globe"
  }
];

export const extraCurricularActivities: ExtraCurricularActivity[] = [
  {
    id: "ai-club-member",
    title: "Member, APU Artificial Intelligence Club",
    organization: "Asia Pacific University",
    period: "Feb 2024 – Present",
    description: "Contribute to a student-led community focused on innovation and collaboration in the field of artificial intelligence. Participate in events, knowledge-sharing sessions, and AI discussions across campus.",
    role: "Active Member"
  },
  {
    id: "ai-club-rd",
    title: "R&D Department Member, APU AI Club",
    organization: "Asia Pacific University",
    period: "July 2024 – Present",
    description: [
      "Collaborate on AI research and development projects aimed at promoting practical applications of AI among students",
      "Main Speaker at an offline seminar titled 'ChatGPT Prompts: Effective Use of AI Tools', successfully attracting 70+ attendees",
      "Developed an AI chatbot for a hands-on workshop with 60+ participants, featuring web scraping, character card creation, and basic AI character training capabilities"
    ],
    role: "R&D Member & Speaker"
  }
];