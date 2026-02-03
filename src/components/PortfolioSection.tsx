import { motion } from 'framer-motion';
import { ExternalLink, Globe, ShoppingCart, BarChart3, Smartphone, Building2, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'AutoParts SA',
    client: 'Automotive Retailer',
    category: 'E-Commerce Platform',
    description: 'Complete e-commerce solution for a Johannesburg-based auto parts supplier. Features include inventory management, online payments via PayFast, and delivery tracking.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'PayFast'],
    icon: ShoppingCart,
    results: '300% increase in online sales',
  },
  {
    title: 'Kasi Eats',
    client: 'Food Delivery Startup',
    category: 'Web & Mobile App',
    description: 'Food ordering platform connecting local restaurants with customers in Soweto and surrounding areas. Real-time order tracking and driver management.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
    technologies: ['React Native', 'Firebase', 'Google Maps API'],
    icon: Utensils,
    results: '5,000+ monthly orders',
  },
  {
    title: 'PropertyHub Gauteng',
    client: 'Real Estate Agency',
    category: 'Business Website',
    description: 'Professional property listing website with virtual tours, mortgage calculator, and lead generation system for a Pretoria real estate company.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
    technologies: ['Next.js', 'Supabase', 'Tailwind CSS'],
    icon: Building2,
    results: '150+ leads per month',
  },
  {
    title: 'HealthTrack Clinics',
    client: 'Medical Practice',
    category: 'Booking System',
    description: 'Patient management and appointment booking system for a network of clinics. Includes SMS reminders, patient records, and billing integration.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
    technologies: ['React', 'Express.js', 'MongoDB', 'Twilio'],
    icon: Smartphone,
    results: '60% reduction in no-shows',
  },
  {
    title: 'TechStartup Analytics',
    client: 'SaaS Company',
    category: 'Dashboard Application',
    description: 'Custom analytics dashboard with real-time data visualization, automated reporting, and team collaboration features for a Cape Town startup.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    technologies: ['React', 'D3.js', 'Python', 'AWS'],
    icon: BarChart3,
    results: 'Processing 1M+ data points daily',
  },
  {
    title: 'Ubuntu Fashion',
    client: 'Clothing Brand',
    category: 'Brand Website',
    description: 'Stunning fashion brand website showcasing African-inspired designs. Features lookbook galleries, size guides, and integration with their Shopify store.',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop',
    technologies: ['React', 'Shopify API', 'Framer Motion'],
    icon: Globe,
    results: '200% increase in brand engagement',
  },
];

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Our <span className="text-gradient-gold">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real projects, real results. See how we've helped South African businesses thrive online.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden glass"
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                
                {/* Icon Badge */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-primary/90 flex items-center justify-center">
                  <project.icon className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-primary font-medium">{project.category}</span>
                  <span className="text-xs text-muted-foreground">{project.client}</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Results */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm font-medium text-foreground">{project.results}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-6">
            These are just a few of the 50+ projects we've successfully delivered.
          </p>
          <Button variant="royal" size="lg" asChild>
            <a href="#contact">Discuss Your Project</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}