"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Send, Terminal, Loader2, AlertCircle } from "lucide-react";

import SectionHeading from "@/components/ui/SectionHeading";

import { personalInfo } from "@/lib/data/personal";
import { ContactFormData } from "@/lib/types";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  inquiryType: z.string().min(1, "Please select a subject"),
  message: z.string().optional(),
});

const inquiryTypes = [
  { value: "", label: "-- SELECT SUBJECT --" },
  { value: "resume", label: "Request Resume" },
  { value: "collaboration", label: "Collaboration" },
  { value: "job", label: "Job Opportunity" },
  { value: "project", label: "Project Inquiry" },
  { value: "general", label: "General Question" },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

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

  const addLog = (msg: string) => {
    setTerminalOutput(prev => [...prev.slice(-4), msg]);
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    addLog(`> INITIATING_SEND...`);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("SEND_FAILED");

      addLog(`> [200] MESSAGE_SENT`);
      toast.success("Message sent successfully.");
      reset();
    } catch (error) {
      addLog(`> [ERR] CONNECTION_REFUSED`);
      toast.error("Failed to send. Please retry.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-background relative border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Secure Channel"
          subtitle="./open_connection.sh --secure"
        />

        <div className="mt-12 lg:mt-16 bg-card border border-border rounded-lg overflow-hidden flex flex-col lg:flex-row shadow-sm">

          {/* LEFT PANEL: STATUS MONITOR */}
          <div className="w-full lg:w-1/3 bg-muted/30 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-border font-mono text-xs sm:text-sm">

            {/* Connection Status */}
            <div className="mb-8 p-4 bg-primary/5 border border-primary/20 rounded-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse ring-2 ring-primary/20" />
                <span className="text-primary font-bold tracking-widest">SYSTEM ONLINE</span>
              </div>
              <p className="text-primary/80 font-medium text-[10px] leading-relaxed">
                UPLINK_ESTABLISHED<br />
                ENCRYPTION: AES-256<br />
                LATENCY: 24ms
              </p>
            </div>

            {/* Credentials */}
            <div className="space-y-6">
              <div>
                <p className="text-muted-foreground mb-1 font-bold uppercase tracking-wider text-[10px]">Recipient</p>
                <div className="text-foreground font-bold hover:text-primary transition-colors cursor-crosshair break-all">
                  &lt;{personalInfo.email}&gt;
                </div>
              </div>

              <div>
                <p className="text-muted-foreground mb-1 font-bold uppercase tracking-wider text-[10px]">Location</p>
                <div className="text-foreground font-medium">
                  {personalInfo.location || "Unknown Sector"}
                </div>
              </div>

              <div>
                <p className="text-muted-foreground mb-2 font-bold uppercase tracking-wider text-[10px]">Connect</p>
                <div className="flex flex-col gap-2">
                  {personalInfo.social.github && (
                    <a href={personalInfo.social.github} target="_blank" className="text-foreground hover:text-primary transition-colors flex items-center gap-2 group font-medium">
                      <span className="text-muted-foreground group-hover:text-primary/50">./</span>github
                    </a>
                  )}
                  {personalInfo.social.linkedin && (
                    <a href={personalInfo.social.linkedin} target="_blank" className="text-foreground hover:text-primary transition-colors flex items-center gap-2 group font-medium">
                      <span className="text-muted-foreground group-hover:text-primary/50">./</span>linkedin
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Terminal Output Log */}
            <div className="mt-8 pt-4 border-t border-border h-24 flex flex-col justify-end text-[11px] text-muted-foreground font-mono">
              {terminalOutput.map((log, i) => (
                <div key={i} className="animate-in fade-in slide-in-from-left-2 font-medium">{log}</div>
              ))}
              <div className="flex items-center gap-1 font-bold">
                <span className="text-primary">➜</span>
                <span className="animate-pulse text-foreground">_</span>
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: COMMAND INPUT */}
          <div className="w-full lg:w-2/3 p-6 sm:p-10 bg-background">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 font-mono">

              {/* Input Group */}
              <div className="space-y-6">

                <div className="group relative">
                  <div className="flex items-baseline gap-2 text-sm sm:text-base mb-1.5 select-none text-muted-foreground">
                    <span className="text-primary font-bold hidden sm:inline">guest@zayed:~$</span>
                    <label htmlFor="name" className="font-bold text-foreground tracking-wide">FULL NAME</label>
                  </div>
                  <input
                    {...register("name")}
                    id="name"
                    type="text"
                    placeholder="Enter your name..."
                    className="w-full bg-transparent border-b-2 border-border focus:border-primary py-2 text-foreground font-medium outline-none transition-colors placeholder:text-muted-foreground/30"
                    autoComplete="off"
                  />
                  {errors.name && (
                    <span className="absolute right-0 top-1 text-xs font-bold text-destructive flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.name.message}
                    </span>
                  )}
                </div>

                <div className="group relative">
                  <div className="flex items-baseline gap-2 text-sm sm:text-base mb-1.5 select-none text-muted-foreground">
                    <span className="text-primary font-bold hidden sm:inline">guest@zayed:~$</span>
                    <label htmlFor="email" className="font-bold text-foreground tracking-wide">EMAIL ADDRESS</label>
                  </div>
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="Enter your email..."
                    className="w-full bg-transparent border-b-2 border-border focus:border-primary py-2 text-foreground font-medium outline-none transition-colors placeholder:text-muted-foreground/30"
                    autoComplete="off"
                  />
                  {errors.email && (
                    <span className="absolute right-0 top-1 text-xs font-bold text-destructive flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="group relative">
                  <div className="flex items-baseline gap-2 text-sm sm:text-base mb-1.5 select-none text-muted-foreground">
                    <span className="text-primary font-bold hidden sm:inline">guest@zayed:~$</span>
                    <label htmlFor="inquiryType" className="font-bold text-foreground tracking-wide">SUBJECT</label>
                  </div>
                  <div className="relative">
                    <select
                      {...register("inquiryType")}
                      id="inquiryType"
                      className="w-full bg-transparent border-b-2 border-border focus:border-primary py-2 text-foreground font-medium outline-none transition-colors cursor-pointer appearance-none rounded-none"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value} className="bg-background text-foreground">
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.inquiryType && (
                    <span className="absolute right-0 top-1 text-xs font-bold text-destructive flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.inquiryType.message}
                    </span>
                  )}
                </div>

                <div className="group relative">
                  <div className="flex items-baseline gap-2 text-sm sm:text-base mb-1.5 select-none text-muted-foreground">
                    <span className="text-primary font-bold hidden sm:inline">guest@zayed:~$</span>
                    <label htmlFor="message" className="font-bold text-foreground tracking-wide">MESSAGE</label>
                  </div>
                  <textarea
                    {...register("message")}
                    id="message"
                    rows={4}
                    placeholder="// Type your message here..."
                    className="w-full bg-transparent border-b-2 border-border focus:border-primary py-2 text-foreground font-medium outline-none transition-colors resize-none placeholder:text-muted-foreground/30 leading-relaxed"
                  />
                </div>

              </div>

              {/* Submit Action */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative inline-flex items-center gap-3 px-6 py-4 bg-primary text-primary-foreground hover:opacity-90 border-2 border-transparent rounded-sm transition-all duration-300 w-full md:w-auto overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  {isSubmitting ? (
                    <Loader2 size={16} className="animate-spin text-inherit" />
                  ) : (
                    <Terminal size={16} className="text-inherit" />
                  )}

                  <span className="font-bold tracking-widest text-xs uppercase relative z-10">
                    {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                  </span>

                  <Send size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-inherit" />
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}