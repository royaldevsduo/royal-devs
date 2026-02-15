import { motion, Variants } from 'framer-motion';
import { ArrowRight, Sparkles, Code2, Palette, Shield, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      damping: 14,
    },
  },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" aria-label="Hero section - Premium web development agency in South Africa">
      {/* Background Effects - simplified for mobile */}
      <div className="absolute inset-0 bg-gradient-royal" />
      
      {/* Single ambient orb instead of 3 animated ones */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl hidden md:block" />
      
      {/* Grid Pattern - static, no shimmer overlay on mobile */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute inset-0 animate-shimmer pointer-events-none hidden md:block" />

      <div className="container mx-auto px-5 sm:px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 md:mb-8 cursor-default"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Trusted by 50+ South African Businesses
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] mb-5 md:mb-6"
          >
            <span className="text-foreground">We Build</span>
            <br />
            <span className="text-gradient-gold inline-block">
              Digital Kingdoms
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8 font-body px-2"
          >
            South Africa's trusted web development trio. We create stunning websites, 
            powerful web apps, and e-commerce solutions that drive real business results.
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10 md:mb-12 text-sm text-muted-foreground"
          >
            {[
              { icon: Shield, text: 'Secure & Reliable' },
              { icon: Zap, text: 'Fast Delivery' },
              { icon: Code2, text: 'Modern Technologies' },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 cursor-default active:scale-95 transition-transform"
              >
                <item.icon className="w-4 h-4 text-primary" />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Button variant="royal" size="xl" asChild className="w-full sm:w-auto active:scale-95 transition-transform min-h-[52px]">
              <a href="#contact" className="gap-2">
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="outline" size="xl" asChild className="w-full sm:w-auto active:scale-95 transition-transform min-h-[52px]">
              <a href="#portfolio">View Our Work</a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {[
              { value: '50+', label: 'Projects Completed' },
              { value: '3+', label: 'Years Experience' },
              { value: '98%', label: 'Client Retention' },
              { value: '24hrs', label: 'Response Time' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center cursor-default"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gradient-gold">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Icons - desktop only */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-10 hidden lg:block"
      >
        <div className="p-4 glass rounded-2xl shadow-gold">
          <Code2 className="w-8 h-8 text-primary" />
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/3 right-10 hidden lg:block"
      >
        <div className="p-4 glass rounded-2xl shadow-gold">
          <Palette className="w-8 h-8 text-primary" />
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/2 right-20 hidden xl:block"
      >
        <div className="p-3 glass rounded-xl shadow-gold">
          <Crown className="w-6 h-6 text-primary" />
        </div>
      </motion.div>
    </section>
  );
}
