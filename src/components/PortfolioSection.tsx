import { motion, Variants } from 'framer-motion';
import { Globe, ShoppingCart, BarChart3, Smartphone, Building2, Utensils, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/hooks/useProjects';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  ShoppingCart,
  BarChart3,
  Smartphone,
  Building2,
  Utensils,
};

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

export function PortfolioSection() {
  const { projects, isLoading, error } = useProjects();

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl"
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
            Our Work
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Our <span className="text-gradient-gold">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real projects, real results. See how we've helped South African businesses thrive online.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-muted-foreground">
            Unable to load projects. Please try again later.
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => {
              const IconComponent = iconMap[project.icon] || Globe;
              
              return (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative rounded-2xl overflow-hidden glass hover:shadow-gold transition-all duration-300"
                >
                  {/* Image */}
                  <div className="aspect-video overflow-hidden relative">
                    <motion.img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    
                    {/* Icon Badge */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-primary/90 flex items-center justify-center shadow-gold"
                    >
                      <IconComponent className="w-5 h-5 text-primary-foreground" />
                    </motion.div>

                    {/* Featured badge */}
                    {project.is_featured && (
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-primary font-medium">{project.category}</span>
                      <span className="text-xs text-muted-foreground">{project.client}</span>
                    </div>
                    <h3 className="text-xl font-display font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.05 }}
                          className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Results */}
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-emerald-500"
                        />
                        <span className="text-sm font-medium text-foreground">{project.results}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-6">
            These are just a few of the 50+ projects we've successfully delivered.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button variant="royal" size="lg" asChild className="hover-spring">
              <a href="#contact">Discuss Your Project</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
