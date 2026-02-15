import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, Crown, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const whatsappNumbers = [
  { number: '27786025428', display: '078 602 5428' },
  { number: '27753170200', display: '075 317 0200' },
  { number: '27682842850', display: '068 284 2850' },
];

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email is too long'),
  company: z.string().trim().max(100, 'Company name is too long').optional(),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.string().optional(),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000, 'Message is too long'),
});

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: insertedData, error } = await supabase
        .from('contact_requests')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim() || null,
          project_type: formData.projectType,
          budget: formData.budget || null,
          message: formData.message.trim(),
        })
        .select('id')
        .single();

      if (error) throw error;

       try {
         await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/notify-contact`, {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
           },
           body: JSON.stringify({
             requestId: insertedData.id,
           }),
         });
       } catch (emailError) {
         console.error('Email notification failed:', emailError);
       }

      setIsSuccess(true);
      setFormData({ name: '', email: '', company: '', projectType: '', budget: '', message: '' });
      toast({
        title: 'Message sent!',
        description: "We'll get back to you within 24 hours.",
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-card" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-5 sm:px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-5 md:mb-6">
              Let's Build Something <span className="text-gradient-gold">Amazing</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8">
              Ready to elevate your digital presence? Tell us about your project and 
              we'll craft a solution fit for royalty.
            </p>

            <div className="space-y-5 md:space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm text-muted-foreground">Email us at</div>
                  <a
                    href="mailto:Royaldevsduo@gmail.com"
                    className="text-base md:text-lg font-semibold text-primary hover:underline break-all"
                  >
                    Royaldevsduo@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">WhatsApp us</div>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    {whatsappNumbers.map((wa) => (
                      <a
                        key={wa.number}
                        href={`https://wa.me/${wa.number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm bg-green-600/20 text-green-500 px-3 py-1.5 rounded-full hover:bg-green-600/30 active:scale-95 transition-all min-h-[36px]"
                      >
                        <MessageCircle className="w-3 h-3" />
                        {wa.display}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Crown className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Response time</div>
                  <div className="text-base md:text-lg font-semibold text-foreground">Within 24 hours</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {isSuccess ? (
              <div className="glass p-6 md:p-8 rounded-2xl text-center">
                <CheckCircle className="w-14 h-14 md:w-16 md:h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl md:text-2xl font-display font-bold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for reaching out. We'll be in touch soon.
                </p>
                <Button variant="outline" onClick={() => setIsSuccess(false)} className="min-h-[48px]">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass p-5 md:p-8 rounded-2xl space-y-4 md:space-y-6">
                <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-secondary border-border min-h-[48px]"
                    />
                    {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-secondary border-border min-h-[48px]"
                    />
                    {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <Input
                  name="company"
                  placeholder="Company Name (Optional)"
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-secondary border-border min-h-[48px]"
                />

                <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <Select
                      value={formData.projectType}
                      onValueChange={(value) => {
                        setFormData({ ...formData, projectType: value });
                        setErrors({ ...errors, projectType: '' });
                      }}
                    >
                      <SelectTrigger className="bg-secondary border-border min-h-[48px]" aria-label="Project Type">
                        <SelectValue placeholder="Project Type *" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="webapp">Web Application</SelectItem>
                        <SelectItem value="ecommerce">E-Commerce</SelectItem>
                        <SelectItem value="redesign">Website Redesign</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.projectType && <p className="text-destructive text-sm mt-1">{errors.projectType}</p>}
                  </div>
                  <Select
                    value={formData.budget}
                    onValueChange={(value) => setFormData({ ...formData, budget: value })}
                  >
                    <SelectTrigger className="bg-secondary border-border min-h-[48px]" aria-label="Budget Range">
                      <SelectValue placeholder="Budget Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<500">Less than R500</SelectItem>
                      <SelectItem value="500-1k">R500 - R1,000</SelectItem>
                      <SelectItem value="1k-2k">R1,000 - R2,000</SelectItem>
                      <SelectItem value="2k+">R2,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your project... *"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-secondary border-border resize-none min-h-[120px]"
                  />
                  {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  variant="royal"
                  size="lg"
                  className="w-full gap-2 min-h-[52px] active:scale-95 transition-transform"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
