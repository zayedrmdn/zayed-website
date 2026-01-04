// Contact.tsx
"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Mail, Send, Github, Linkedin, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { personalInfo } from "@/lib/data/personal";
import { ContactFormData } from "@/lib/types";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  message: z.string().optional(),
});

const inquiryTypes = [
  { value: "", label: "Select inquiry type" },
  { value: "resume", label: "Request for Latest Resume" },
  { value: "collaboration", label: "Collaboration Opportunity" },
  { value: "job", label: "Job Opportunity" },
  { value: "project", label: "Project Discussion" },
  { value: "general", label: "General Inquiry" },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    // Custom event listener for inquiry selection
    const handleInquirySelection = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail === 'resume') {
        setValue('inquiryType', 'resume');
      }
    };

    window.addEventListener('selectInquiryType', handleInquirySelection);
    return () => {
      window.removeEventListener('selectInquiryType', handleInquirySelection);
    };
  }, [setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Message sent successfully! I'll get back to you soon.");
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again or contact me directly.");
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/10">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a project in mind or want to collaborate? let's talk."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <AnimatedSection delay={0.1}>
              {/* Connector Card */}
              <Card className="p-6 border-l-4 border-l-primary/60 shadow-md">
                <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <Mail size={18} className="text-primary" />
                  Contact Info
                </h3>

                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-bold text-foreground/70 uppercase tracking-wider mb-1">Email</p>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-foreground hover:text-primary transition-colors font-medium break-all"
                    >
                      {personalInfo.email}
                    </a>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-foreground/70 uppercase tracking-wider mb-1">Location</p>
                    <p className="text-foreground font-medium">{personalInfo.location}</p>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              {/* Socials Card */}
              <Card className="p-6 shadow-md">
                <h4 className="font-bold text-foreground mb-4 text-sm">Connect on Socials</h4>
                <div className="flex gap-3">
                  {personalInfo.social.github && (
                    <a
                      href={personalInfo.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-secondary text-foreground hover:bg-foreground hover:text-background rounded-xl transition-all duration-300 border border-border hover:border-transparent"
                      aria-label="GitHub"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {personalInfo.social.linkedin && (
                    <a
                      href={personalInfo.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-secondary text-foreground hover:bg-[#0077b5] hover:text-white rounded-xl transition-all duration-300 border border-border hover:border-transparent"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                </div>
                {/* Status Pulse */}
                <div className="mt-6 pt-4 border-t border-border flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-20"></span>
                  </span>
                  <span className="text-xs font-bold text-foreground/70">Typically responds within 24h</span>
                </div>
              </Card>
            </AnimatedSection>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <AnimatedSection delay={0.2}>
              <Card className="p-6 md:p-8 border border-border shadow-lg">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border">
                  <MessageCircle className="text-primary" size={24} />
                  <h3 className="text-xl font-bold text-foreground">
                    Send a message
                  </h3>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-bold text-foreground uppercase tracking-wide ml-1">Full Name</label>
                      <input
                        {...register("name")}
                        id="name"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none text-foreground placeholder:text-muted-foreground text-sm font-medium"
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-xs text-destructive ml-1">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-bold text-foreground uppercase tracking-wide ml-1">Email Address</label>
                      <input
                        {...register("email")}
                        id="email"
                        type="email"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none text-foreground placeholder:text-muted-foreground text-sm font-medium"
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-xs text-destructive ml-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="inquiryType" className="text-xs font-bold text-foreground uppercase tracking-wide ml-1">Inquiry Type</label>
                    <div className="relative">
                      <select
                        {...register("inquiryType")}
                        id="inquiryType"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none text-foreground appearance-none text-sm font-medium cursor-pointer"
                      >
                        {inquiryTypes.map((type) => (
                          <option key={type.value} value={type.value} className="bg-background text-foreground">
                            {type.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                    {errors.inquiryType && <p className="text-xs text-destructive ml-1">{errors.inquiryType.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-bold text-foreground uppercase tracking-wide ml-1">Message</label>
                    <textarea
                      {...register("message")}
                      id="message"
                      rows={6}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none resize-none form-textarea text-foreground placeholder:text-muted-foreground text-sm leading-relaxed font-medium"
                      placeholder="Tell me about your project..."
                    />
                    {errors.message && <p className="text-xs text-destructive ml-1">{errors.message.message}</p>}
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      isLoading={isSubmitting}
                      size="lg"
                      className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                    >
                      <Send size={18} className="mr-2" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>

                </form>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}