import { Resend } from "resend";
import { NextResponse } from "next/server";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate the request body
    const validatedData = contactSchema.parse(body);
    const { name, email, message } = validatedData;

    // Send notification email to you
    const { data: notificationData, error: notificationError } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Portfolio Contact <onboarding@resend.dev>",
      to: [process.env.EMAIL_TO || "zayedrmdn@gmail.com"],
      subject: `Portfolio Contact: Message from ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        
        <hr>
        <p><small>This message was sent from your portfolio contact form.</small></p>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Message: ${message}
        
        This message was sent from your portfolio contact form.
      `,
    });

    if (notificationError) {
      console.error("Failed to send notification email:", notificationError);
      return NextResponse.json(
        { error: "Failed to send notification email" },
        { status: 500 }
      );
    }

    // Send confirmation email to the sender (only if it's your email - Resend limitation)
    let confirmationData = null;
    let confirmationError = null;
    
    if (email === process.env.EMAIL_TO || email === "zayedrmdn@gmail.com") {
      const result = await resend.emails.send({
        from: process.env.EMAIL_FROM || "Zayed Ramadan Rahmat <onboarding@resend.dev>",
        to: [email],
        subject: "Thanks for reaching out! Message received",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #00B8FF;">Thank you for contacting me!</h2>
          
          <p>Hi ${name},</p>
          
          <p>I've received your message and wanted to confirm that it reached me successfully. I appreciate you taking the time to get in touch!</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Your message:</h3>
            <p style="color: #666; font-style: italic;">"${message}"</p>
          </div>
          
          <p>I'll review your message and get back to you as soon as possible, typically within 24-48 hours.</p>
          
          <p>Best regards,<br>
          <strong>Zayed Ramadan Rahmat</strong><br>
          <span style="color: #00B8FF;">AI Engineer & Full-Stack Developer</span></p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #888;">
            This is an automated confirmation email from my portfolio website. 
            Please don't reply to this email - I'll respond to your original message directly.
          </p>
        </div>
      `,
      text: `
        Thank you for contacting me!
        
        Hi ${name},
        
        I've received your message and wanted to confirm that it reached me successfully. I appreciate you taking the time to get in touch!
        
        Your message:
        "${message}"
        
        I'll review your message and get back to you as soon as possible, typically within 24-48 hours.
        
        Best regards,
        Zayed Ramadan Rahmat
        AI Engineer & Full-Stack Developer
        
        ---
        This is an automated confirmation email from my portfolio website.
        Please don't reply to this email - I'll respond to your original message directly.
      `,
      });
      
      confirmationData = result.data;
      confirmationError = result.error;
    } else {
      console.log(`Skipping confirmation email to ${email} - not your verified email address`);
    }

    if (confirmationError) {
      console.error("Failed to send confirmation email:", confirmationError);
      // Still return success if notification worked but confirmation failed
    }

    const data = { 
      notification: notificationData, 
      confirmation: confirmationData,
      success: true
    };

    return NextResponse.json(
      { success: true, message: "Email sent successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}