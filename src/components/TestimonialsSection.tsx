import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    company: 'TechStart Inc.',
    avatar: 'SJ',
    rating: 5,
    text: 'Royal Devs Duo transformed our outdated website into a modern masterpiece. Their attention to detail and quick turnaround exceeded all expectations. Highly recommended!',
  },
  {
    name: 'Michael Chen',
    company: 'GrowthHub',
    avatar: 'MC',
    rating: 5,
    text: 'The team delivered an exceptional e-commerce platform that increased our sales by 40%. Professional, responsive, and truly talented developers.',
  },
  {
    name: 'Emily Rodriguez',
    company: 'Creative Studios',
    avatar: 'ER',
    rating: 5,
    text: 'Working with Royal Devs Duo was a pleasure from start to finish. They understood our vision perfectly and brought it to life beautifully.',
  },
  {
    name: 'David Thompson',
    company: 'InnovateTech',
    avatar: 'DT',
    rating: 4,
    text: 'Great communication throughout the project. They delivered a robust web application that handles our complex requirements seamlessly.',
  },
  {
    name: 'Lisa Wang',
    company: 'StartupLab',
    avatar: 'LW',
    rating: 5,
    text: 'The royal treatment is real! From the initial consultation to the final delivery, every step was handled with professionalism and care.',
  },
  {
    name: 'James Miller',
    company: 'Digital First',
    avatar: 'JM',
    rating: 5,
    text: 'Best investment we made for our business. The website they built has become our strongest marketing asset. Thank you Royal Devs!',
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

export function TestimonialsSection() {
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
            Client <span className="text-gradient-gold">Testimonials</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our royal clients have to say.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6 relative"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{testimonial.avatar}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </div>

              <StarRating rating={testimonial.rating} />

              <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}