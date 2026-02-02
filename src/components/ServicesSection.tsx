import { motion } from 'framer-motion';
import { Globe, Smartphone, Database, Zap, Shield, Palette } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Website Development',
    description: 'Custom websites built with modern technologies. Responsive, fast, and SEO-optimized.',
  },
  {
    icon: Smartphone,
    title: 'Web Applications',
    description: 'Full-stack web apps with rich features, real-time updates, and seamless user experiences.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces that captivate users and drive engagement.',
  },
  {
    icon: Database,
    title: 'Backend Systems',
    description: 'Robust server architecture, APIs, and database solutions that scale with your business.',
  },
  {
    icon: Shield,
    title: 'Security & Maintenance',
    description: 'Ongoing support, security updates, and performance optimization.',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Speed up existing sites with our expert optimization techniques.',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-royal opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-gradient-gold">Royal</span> Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From concept to launch, we handle every aspect of your digital project with expertise and care.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 glass rounded-2xl hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-foreground">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
