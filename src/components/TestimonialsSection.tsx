import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, MapPin, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ReviewForm } from '@/components/ReviewForm';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Review {
  id: string;
  name: string;
  company: string | null;
  location: string | null;
  rating: number;
  text: string;
}

const defaultTestimonials: Review[] = [];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'text-primary fill-primary' : 'text-muted-foreground'
          }`}
        />
      ))}
    </div>
  );
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function TestimonialsSection() {
  const { user } = useAuth();
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchUserReviews();
  }, []);

  const fetchUserReviews = async () => {
    const { data, error } = await supabase
      .from('user_reviews')
      .select('id, name, company, location, rating, text')
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .limit(6);

    if (!error && data) {
      setUserReviews(data);
    }
  };

  const allTestimonials = [...userReviews, ...defaultTestimonials].slice(0, 6);

  return (
    <section id="testimonials" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-card" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-5 sm:px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            Client <span className="text-gradient-gold">Success Stories</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Real feedback from real South African businesses we've helped grow.
          </p>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 min-h-[48px] active:scale-95 transition-transform">
                <PenLine className="w-4 h-4" />
                Share Your Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md mx-4">
              <ReviewForm onSuccess={() => {
                setIsDialogOpen(false);
                fetchUserReviews();
              }} />
            </DialogContent>
          </Dialog>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {allTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08 }}
              className="glass rounded-2xl p-5 md:p-6 relative active:scale-[0.98] transition-transform"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
              
              <div className="flex items-center gap-3 md:gap-4 mb-4">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">{getInitials(testimonial.name)}</span>
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-foreground truncate">{testimonial.name}</h4>
                  {testimonial.company && (
                    <p className="text-sm text-muted-foreground truncate">{testimonial.company}</p>
                  )}
                  {testimonial.location && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{testimonial.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <StarRating rating={testimonial.rating} />

              <p className="mt-3 md:mt-4 text-muted-foreground text-sm leading-relaxed">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="inline-flex items-center gap-3 px-5 md:px-6 py-3 glass rounded-full">
            <div className="flex -space-x-2">
              {['SN', 'ND', 'PV', 'LM'].map((initials, i) => (
                <div
                  key={i}
                  className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center"
                >
                  <span className="text-[10px] md:text-xs font-bold text-primary">{initials}</span>
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-primary fill-primary" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Trusted by 50+ businesses across South Africa
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
