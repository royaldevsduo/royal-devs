import { motion, Variants } from 'framer-motion';
import { ArrowRight, Sparkles, Code2, Palette, Shield, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-royal" />
      
      {/* Animated orbs */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"
      />
      
      {/* Grid Pattern with shimmer */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute inset-0 animate-shimmer pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 cursor-default"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm font-medium text-muted-foreground">
              Trusted by 50+ South African Businesses
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-6"
          >
            <span className="text-foreground">We Build</span>
            <br />
            <motion.span
              className="text-gradient-gold inline-block"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Digital Kingdoms
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 font-body"
          >
            South Africa's trusted web development trio. We create stunning websites, 
            powerful web apps, and e-commerce solutions that drive real business results.
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 mb-12 text-sm text-muted-foreground"
          >
            {[
              { icon: Shield, text: 'Secure & Reliable' },
              { icon: Zap, text: 'Fast Delivery' },
              { icon: Code2, text: 'Modern Technologies' },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, y: -2 }}
                className="flex items-center gap-2 cursor-default"
              >
                <item.icon className="w-4 h-4 text-primary" />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button variant="royal" size="xl" asChild className="hover-spring">
                <a href="#contact" className="gap-2">
                  Get a Free Quote
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" size="xl" asChild className="hover-spring">
                <a href="#portfolio">View Our Work</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
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
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center cursor-default"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-3xl md:text-4xl font-display font-bold text-gradient-gold"
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Icons */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-10 hidden lg:block"
      >
        <motion.div
          whileHover={{ scale: 1.2, rotate: 10 }}
          className="p-4 glass rounded-2xl shadow-gold cursor-pointer"
        >
          <Code2 className="w-8 h-8 text-primary" />
        </motion.div>
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/3 right-10 hidden lg:block"
      >
        <motion.div
          whileHover={{ scale: 1.2, rotate: -10 }}
          className="p-4 glass rounded-2xl shadow-gold cursor-pointer"
        >
          <Palette className="w-8 h-8 text-primary" />
        </motion.div>
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/2 right-20 hidden xl:block"
      >
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="p-3 glass rounded-xl shadow-gold cursor-pointer"
        >
          <Crown className="w-6 h-6 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
