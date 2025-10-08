// Contact.tsx
"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin, Send, Github, Linkedin, MessageCircle } from "lucide-react";
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
    const handleInquirySelection = (event: CustomEvent) => {
      if (event.detail === 'resume') {
        setValue('inquiryType', 'resume');
      }
    };

    window.addEventListener('selectInquiryType', handleInquirySelection as EventListener);
    return () => {
      window.removeEventListener('selectInquiryType', handleInquirySelection as EventListener);
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
    <section id="contact" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto">
        <SectionHeading 
          title="Get In Touch"
          subtitle="Have a project in mind or want to collaborate? I'd love to hear from you!"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <AnimatedSection delay={0.2}>
              <Card className="p-6 mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Let&apos;s Connect
                </h3>
                
                <div className="space-y-4">
                  {/* Email */}
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-accent/10 rounded-lg transition-colors hover:bg-accent/20">
                      <Mail className="text-accent" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a 
                        href={`mailto:${personalInfo.email}`}
                        className="text-foreground hover:text-accent transition-colors duration-200"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone (if available) */}
                  {personalInfo.phone && (
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg transition-colors">
                        <Phone className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <a 
                          href={`tel:${personalInfo.phone}`}
                          className="text-foreground hover:text-primary transition-colors"
                        >
                          {personalInfo.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg transition-colors">
                      <MapPin className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-foreground">{personalInfo.location}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* Social Links */}
            <AnimatedSection delay={0.4}>
              <Card className="p-6">
                <h4 className="font-semibold text-foreground mb-4">
                  Follow Me
                </h4>
                
                <div className="flex space-x-3">
                  {personalInfo.social.github && (
                    <a
                      href={personalInfo.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 text-accent-foreground hover:text-foreground rounded-xl shadow-lg hover:shadow-xl hover:shadow-accent/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
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
                      className="p-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground hover:text-primary-foreground rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                  
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="p-3 bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary/80 text-secondary-foreground hover:text-foreground rounded-xl shadow-lg hover:shadow-xl hover:shadow-secondary/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                    aria-label="Email"
                  >
                    <Mail size={20} />
                  </a>
                </div>

                {/* Response Time */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full animate-pulse shadow-sm"></div>
                    <span className="text-sm text-muted-foreground">
                      Usually responds within 24 hours
                    </span>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <AnimatedSection delay={0.3}>
              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <MessageCircle className="text-primary" size={24} />
                  <h3 className="text-xl font-semibold text-foreground">
                    Send me a message
                  </h3>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label 
                      htmlFor="name" 
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      id="name"
                      className={`
                        w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200
                        bg-input text-foreground placeholder:text-muted-foreground
                        hover:border-accent/50 hover:shadow-sm hover:shadow-accent/10
                        ${errors.name 
                          ? 'border-destructive focus:ring-destructive focus:border-destructive' 
                          : 'border-border'
                        }
                      `}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      id="email"
                      className={`
                        w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200
                        bg-input text-foreground placeholder:text-muted-foreground
                        hover:border-accent/50 hover:shadow-sm hover:shadow-accent/10
                        ${errors.email 
                          ? 'border-destructive focus:ring-destructive focus:border-destructive' 
                          : 'border-border'
                        }
                      `}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Inquiry Type Field */}
                  <div>
                    <label 
                      htmlFor="inquiryType" 
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Inquiry Type *
                    </label>
                    <select
                      {...register("inquiryType")}
                      id="inquiryType"
                      className={`
                        w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200
                        bg-input text-foreground
                        hover:border-accent/50 hover:shadow-sm hover:shadow-accent/10
                        [&>option]:bg-card [&>option]:text-card-foreground
                        ${errors.inquiryType 
                          ? 'border-destructive focus:ring-destructive focus:border-destructive' 
                          : 'border-border'
                        }
                      `}
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value} className="bg-card text-card-foreground">
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {errors.inquiryType && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.inquiryType.message}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label 
                      htmlFor="message" 
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Additional Message (Optional)
                    </label>
                    <textarea
                      {...register("message")}
                      id="message"
                      rows={5}
                      className={`
                        w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 resize-none
                        bg-input text-foreground placeholder:text-muted-foreground
                        hover:border-accent/50 hover:shadow-sm hover:shadow-accent/10
                        ${errors.message 
                          ? 'border-destructive focus:ring-destructive focus:border-destructive' 
                          : 'border-border'
                        }
                      `}
                      placeholder="Any additional details you'd like to share? (Optional)"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--accent))] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                    size="lg"
                  >
                    <Send size={20} />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>

                </form>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}