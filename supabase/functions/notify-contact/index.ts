 import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
 import { Resend } from "https://esm.sh/resend@2.0.0";
 
 const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
 
 const corsHeaders = {
   "Access-Control-Allow-Origin": "*",
   "Access-Control-Allow-Headers":
     "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
 };
 
// Note: In Resend testing mode, can only send to account owner email
// To send to all team members, verify a domain at resend.com/domains
const TEAM_EMAILS = ["royaldevsduo@gmail.com"];
 
 interface ContactRequest {
   name: string;
   email: string;
   company?: string;
   projectType: string;
   budget?: string;
   message: string;
 }
 
 const handler = async (req: Request): Promise<Response> => {
   if (req.method === "OPTIONS") {
     return new Response(null, { headers: corsHeaders });
   }
 
   try {
     const { name, email, company, projectType, budget, message }: ContactRequest = await req.json();
 
     if (!name || !email || !projectType || !message) {
       throw new Error("Missing required fields");
     }
 
     const emailResponse = await resend.emails.send({
       from: "Royal Devs Trio <onboarding@resend.dev>",
       to: TEAM_EMAILS,
       subject: `New Contact Request from ${name}`,
       html: `
         <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
           <div style="background: linear-gradient(135deg, #d4af37, #f5d67b); padding: 20px; border-radius: 12px 12px 0 0;">
             <h1 style="color: #0a1628; margin: 0; font-size: 24px;">👑 New Contact Request</h1>
           </div>
           
           <div style="background: #f8f9fa; padding: 24px; border-radius: 0 0 12px 12px;">
             <table style="width: 100%; border-collapse: collapse;">
               <tr>
                 <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; font-weight: bold; color: #495057; width: 120px;">Name:</td>
                 <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #212529;">${name}</td>
               </tr>
               <tr>
                 <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; font-weight: bold; color: #495057;">Email:</td>
                 <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;"><a href="mailto:${email}" style="color: #d4af37;">${email}</a></td>
               </tr>
               ${company ? `
               <tr>
                 <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; font-weight: bold; color: #495057;">Company:</td>
                 <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #212529;">${company}</td>
               </tr>
               ` : ''}
               <tr>
                 <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; font-weight: bold; color: #495057;">Project Type:</td>
                 <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #212529;">${projectType}</td>
               </tr>
               ${budget ? `
               <tr>
                 <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; font-weight: bold; color: #495057;">Budget:</td>
                 <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #212529;">${budget}</td>
               </tr>
               ` : ''}
             </table>
             
             <div style="margin-top: 20px;">
               <h3 style="color: #495057; margin-bottom: 8px;">Message:</h3>
               <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #d4af37; color: #212529;">
                 ${message.replace(/\n/g, '<br>')}
               </div>
             </div>
             
             <div style="margin-top: 24px; text-align: center;">
               <a href="mailto:${email}?subject=Re: Your inquiry to Royal Devs Trio" 
                  style="display: inline-block; background: linear-gradient(135deg, #d4af37, #f5d67b); color: #0a1628; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                 Reply to ${name}
               </a>
             </div>
           </div>
           
           <p style="text-align: center; color: #6c757d; font-size: 12px; margin-top: 20px;">
             Royal Devs Trio - Premium Web Development
           </p>
         </div>
       `,
     });
 
     console.log("Contact notification email sent:", emailResponse);
 
     return new Response(JSON.stringify({ success: true }), {
       status: 200,
       headers: { "Content-Type": "application/json", ...corsHeaders },
     });
   } catch (error: any) {
     console.error("Error sending contact notification:", error);
     return new Response(
       JSON.stringify({ error: error.message }),
       {
         status: 500,
         headers: { "Content-Type": "application/json", ...corsHeaders },
       }
     );
   }
 };
 
 serve(handler);