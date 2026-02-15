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

export function PortfolioSection() {
  const { projects, isLoading, error } = useProjects();

  return (
    <section id="portfolio" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container mx-auto px-5 sm:px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
            Our Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            Our <span className="text-gradient-gold">Portfolio</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
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
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8"
          >
            {projects.map((project) => {
              const IconComponent = iconMap[project.icon] || Globe;
              
              return (
                <motion.a
                  key={project.id}
                  href={project.url || '#contact'}
                  target={project.url ? '_blank' : undefined}
                  rel={project.url ? 'noopener noreferrer' : undefined}
                  variants={itemVariants}
                  className="group relative rounded-2xl overflow-hidden glass hover:shadow-gold transition-all duration-300 cursor-pointer block active:scale-[0.98]"
                >
                  {/* Image */}
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={project.image_url}
                      alt={`${project.title} - ${project.category} web development project by Royal Devs Trio`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      width={800}
                      height={450}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    
                    {/* Icon Badge */}
                    <div className="absolute top-3 right-3 md:top-4 md:right-4 w-9 h-9 md:w-10 md:h-10 rounded-xl bg-primary/90 flex items-center justify-center shadow-gold">
                      <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                    </div>

                    {/* Featured badge */}
                    {project.is_featured && (
                      <div className="absolute top-3 left-3 md:top-4 md:left-4 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-primary font-medium">{project.category}</span>
                      <span className="text-xs text-muted-foreground">{project.client}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-display font-semibold text-foreground mb-2 md:mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3 md:mb-4 line-clamp-2 md:line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Results */}
                    <div className="pt-3 md:pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-sm font-medium text-foreground">{project.results}</span>
                      </div>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10 md:mt-12"
        >
          <p className="text-muted-foreground mb-5 md:mb-6">
            These are just a few of the 50+ projects we've successfully delivered.
          </p>
          <Button variant="royal" size="lg" asChild className="active:scale-95 transition-transform min-h-[48px]">
            <a href="#contact">Discuss Your Project</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
