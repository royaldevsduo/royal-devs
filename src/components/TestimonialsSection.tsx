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

const defaultTestimonials = [
  {
    id: 'default-1',
    name: 'Sipho Ndlovu',
    company: 'AutoParts SA',
    location: 'Johannesburg',
    rating: 5,
    text: 'Royal Devs Trio built our e-commerce platform from scratch. Since launching, our online sales have increased by 300%. Professional, reliable, and they truly understand what South African businesses need.',
  },
  {
    id: 'default-2',
    name: 'Nomsa Dlamini',
    company: 'Kasi Eats',
    location: 'Soweto',
    rating: 5,
    text: 'They delivered our food delivery app on time and within budget. The app handles thousands of orders monthly without issues. Best decision we made for our startup!',
  },
  {
    id: 'default-3',
    name: 'Pieter van der Berg',
    company: 'PropertyHub Gauteng',
    location: 'Pretoria',
    rating: 5,
    text: 'Our new website generates over 150 quality leads per month. The mortgage calculator and virtual tour features they built have been game-changers for our real estate business.',
  },
  {
    id: 'default-4',
    name: 'Dr. Lerato Molefe',
    company: 'HealthTrack Clinics',
    location: 'Sandton',
    rating: 5,
    text: 'The patient booking system they developed reduced our no-shows by 60%. The SMS reminders and easy-to-use interface have made our admin team much more efficient.',
  },
  {
    id: 'default-5',
    name: 'Andile Zulu',
    company: 'Ubuntu Fashion',
    location: 'Durban',
    rating: 5,
    text: 'Our brand website is absolutely stunning. It perfectly captures our African-inspired aesthetic. Website traffic has doubled since launch. Highly recommend!',
  },
  {
    id: 'default-6',
    name: 'Fatima Patel',
    company: 'TechStartup Analytics',
    location: 'Cape Town',
    rating: 5,
    text: 'They built us a custom analytics dashboard that processes over a million data points daily. The team was communicative throughout and delivered exactly what we needed.',
  },
];

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

  // Combine user reviews with default testimonials, prioritizing user reviews
  const allTestimonials = [...userReviews, ...defaultTestimonials].slice(0, 6);

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-card" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Client <span className="text-gradient-gold">Success Stories</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Real feedback from real South African businesses we've helped grow.
          </p>
          
          {/* Add Review Button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <PenLine className="w-4 h-4" />
                Share Your Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <ReviewForm onSuccess={() => {
                setIsDialogOpen(false);
                fetchUserReviews();
              }} />
            </DialogContent>
          </Dialog>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {allTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6 relative"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{getInitials(testimonial.name)}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  {testimonial.company && (
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  )}
                  {testimonial.location && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3" />
                      {testimonial.location}
                    </div>
                  )}
                </div>
              </div>

              <StarRating rating={testimonial.rating} />

              <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
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
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 glass rounded-full">
            <div className="flex -space-x-2">
              {['SN', 'ND', 'PV', 'LM'].map((initials, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center"
                >
                  <span className="text-xs font-bold text-primary">{initials}</span>
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
