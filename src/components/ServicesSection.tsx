import { motion, Variants } from 'framer-motion';
import { Globe, Smartphone, Database, Zap, Shield, Palette } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Website Development',
    description: 'Custom websites built with modern technologies. Responsive, fast, and SEO-optimized.',
    gradient: 'from-blue-500/20 to-primary/20',
  },
  {
    icon: Smartphone,
    title: 'Web Applications',
    description: 'Full-stack web apps with rich features, real-time updates, and seamless user experiences.',
    gradient: 'from-purple-500/20 to-primary/20',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces that captivate users and drive engagement.',
    gradient: 'from-pink-500/20 to-primary/20',
  },
  {
    icon: Database,
    title: 'Backend Systems',
    description: 'Robust server architecture, APIs, and database solutions that scale with your business.',
    gradient: 'from-green-500/20 to-primary/20',
  },
  {
    icon: Shield,
    title: 'Security & Maintenance',
    description: 'Ongoing support, security updates, and performance optimization.',
    gradient: 'from-red-500/20 to-primary/20',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Speed up existing sites with our expert optimization techniques.',
    gradient: 'from-yellow-500/20 to-primary/20',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export function ServicesSection() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-royal opacity-50" />
      
      {/* Animated background elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-1/2 -right-1/2 w-full h-full opacity-5"
        style={{
          background: 'conic-gradient(from 0deg, transparent, hsl(var(--primary)), transparent)',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4"
          >
            What We Offer
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-gradient-gold">Royal</span> Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From concept to launch, we handle every aspect of your digital project with expertise and care.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { type: 'spring', stiffness: 300 }
              }}
              className="group p-8 glass rounded-2xl hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
            >
              {/* Gradient background on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors group-hover:shadow-gold"
                >
                  <service.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="text-xl font-display font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
