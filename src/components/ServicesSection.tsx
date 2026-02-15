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
      staggerChildren: 0.08,
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
      damping: 16,
    },
  },
};

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-royal opacity-50" />
      
      <div className="container mx-auto px-5 sm:px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-gradient-gold">Royal</span> Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            From concept to launch, we handle every aspect of your digital project with expertise and care.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group p-6 md:p-8 glass rounded-2xl hover:border-primary/50 transition-all duration-300 relative overflow-hidden active:scale-[0.98]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary/20 transition-colors group-hover:shadow-gold">
                  <service.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-display font-semibold mb-2 md:mb-3 text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
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
