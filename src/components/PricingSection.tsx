import { motion } from 'framer-motion';
import { Check, Crown, Sparkles, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pricingPlans = [
  {
    name: 'Basic',
    icon: Sparkles,
    price: 'R200',
    description: 'Perfect for personal projects and small businesses',
    features: [
      'Single page website',
      'Mobile responsive design',
      'Basic SEO setup',
      'Contact form integration',
      '1 round of revisions',
      '3 days delivery',
    ],
    popular: false,
  },
  {
    name: 'Standard',
    icon: Crown,
    price: 'R500',
    description: 'Ideal for growing businesses needing more features',
    features: [
      'Up to 3 pages',
      'Custom design & branding',
      'SEO optimization',
      'Social media integration',
      '2 rounds of revisions',
      '1 week delivery',
      '14 days support',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    icon: Rocket,
    price: 'R1,500+',
    description: 'Full-scale solutions for established businesses',
    features: [
      'Up to 10 pages',
      'E-commerce functionality',
      'Custom web application',
      'Database integration',
      'CMS integration',
      'Unlimited revisions',
      '2-3 weeks delivery',
      '30 days support',
      'Priority support',
    ],
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Royal <span className="text-gradient-gold">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing for every kingdom size. Choose the package that fits your needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative glass rounded-2xl p-8 ${
                plan.popular ? 'border-2 border-primary scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <plan.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-gradient-gold mb-2">{plan.price}</div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? 'royal' : 'outline'}
                className="w-full"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground mt-12"
        >
          Need a custom solution? <a href="#contact" className="text-primary hover:underline">Contact us</a> for a personalized quote.
        </motion.p>
      </div>
    </section>
  );
}