import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const reviewSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  company: z.string().trim().max(100, 'Company name is too long').optional(),
  location: z.string().trim().max(100, 'Location is too long').optional(),
  rating: z.number().min(1, 'Please select a rating').max(5),
  text: z.string().trim().min(20, 'Review must be at least 20 characters').max(500, 'Review is too long'),
});

interface ReviewFormProps {
  onSuccess?: () => void;
}

export function ReviewForm({ onSuccess }: ReviewFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    location: '',
    rating: 0,
    text: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to submit a review.',
        variant: 'destructive',
      });
      return;
    }

    const result = reviewSchema.safeParse(formData);
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
      const { error } = await supabase
        .from('user_reviews')
        .insert({
          user_id: user.id,
          name: formData.name.trim(),
          company: formData.company.trim() || null,
          location: formData.location.trim() || null,
          rating: formData.rating,
          text: formData.text.trim(),
        });

      if (error) throw error;

      setIsSuccess(true);
      setFormData({ name: '', company: '', location: '', rating: 0, text: '' });
      toast({
        title: 'Review submitted!',
        description: 'Thank you! Your review will appear after approval.',
      });
      onSuccess?.();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit review. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="glass p-6 rounded-2xl text-center">
        <p className="text-muted-foreground">
          Please <a href="/auth" className="text-primary hover:underline">sign in</a> to leave a review.
        </p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="glass p-6 rounded-2xl text-center">
        <CheckCircle className="w-12 h-12 text-primary mx-auto mb-3" />
        <h4 className="text-lg font-display font-bold mb-2">Thank You!</h4>
        <p className="text-muted-foreground text-sm mb-4">
          Your review has been submitted and is pending approval.
        </p>
        <Button variant="outline" size="sm" onClick={() => setIsSuccess(false)}>
          Write Another Review
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass p-6 rounded-2xl space-y-4">
      <h4 className="text-lg font-display font-bold text-foreground mb-2">Share Your Experience</h4>
      
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <Input
            name="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleChange}
            className="bg-secondary border-border"
          />
          {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <Input
            name="company"
            placeholder="Company (Optional)"
            value={formData.company}
            onChange={handleChange}
            className="bg-secondary border-border"
          />
        </div>
      </div>

      <Input
        name="location"
        placeholder="Location (Optional)"
        value={formData.location}
        onChange={handleChange}
        className="bg-secondary border-border"
      />

      {/* Star Rating */}
      <div>
        <label className="block text-sm text-muted-foreground mb-2">Your Rating *</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => {
                setFormData({ ...formData, rating: star });
                setErrors({ ...errors, rating: '' });
              }}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star
                className={`w-6 h-6 ${
                  star <= (hoveredRating || formData.rating)
                    ? 'text-primary fill-primary'
                    : 'text-muted-foreground'
                }`}
              />
            </button>
          ))}
        </div>
        {errors.rating && <p className="text-destructive text-xs mt-1">{errors.rating}</p>}
      </div>

      <div>
        <Textarea
          name="text"
          placeholder="Tell us about your experience... *"
          rows={4}
          value={formData.text}
          onChange={handleChange}
          className="bg-secondary border-border resize-none"
        />
        {errors.text && <p className="text-destructive text-xs mt-1">{errors.text}</p>}
      </div>

      <Button
        type="submit"
        variant="royal"
        className="w-full gap-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          'Submitting...'
        ) : (
          <>
            <Send className="w-4 h-4" />
            Submit Review
          </>
        )}
      </Button>
    </form>
  );
}
