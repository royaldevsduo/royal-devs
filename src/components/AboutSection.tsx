import { motion } from 'framer-motion';
import { Users, Award, Clock, Heart, CheckCircle, MapPin } from 'lucide-react';

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 
  'MongoDB', 'Tailwind CSS', 'AWS', 'Firebase'
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-card" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-5 sm:px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="flex items-center gap-2 text-primary mb-4">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Based in South Africa</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-5 md:mb-6">
              Meet the <span className="text-gradient-gold">Royal Trio</span>
            </h2>
            
            <p className="text-base md:text-lg text-muted-foreground mb-5 md:mb-6 leading-relaxed">
              We're <strong className="text-foreground">Thabo</strong>, <strong className="text-foreground">Rilinde</strong>, and <strong className="text-foreground">Mukovhe</strong> — three 
              passionate developers from South Africa who believe that every business 
              deserves a powerful online presence, regardless of size.
            </p>
            
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              With over 3 years of combined experience in web development, we've helped 
              businesses across Gauteng and beyond transform their digital presence. 
              From local restaurants to tech startups, we deliver solutions that work.
            </p>

            {/* What We Offer */}
            <div className="space-y-3 mb-6 md:mb-8">
              {[
                'Custom websites tailored to your brand',
                'E-commerce solutions with local payment gateways',
                'Mobile-responsive designs that work everywhere',
                'Ongoing support and maintenance packages',
                'SEO optimization for local visibility',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm md:text-base text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {[
                { icon: Users, label: 'Collaborative Team' },
                { icon: Award, label: 'Quality Focused' },
                { icon: Clock, label: 'On-Time Delivery' },
                { icon: Heart, label: 'Passion Driven' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm md:text-base text-foreground font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative"
          >
            <div className="relative aspect-square max-w-sm md:max-w-md mx-auto">
              {/* Decorative rings - reduced animation for mobile */}
              <div className="absolute inset-0 rounded-full border border-primary/20" />
              <div className="absolute inset-8 rounded-full border border-primary/30 md:animate-spin-slow" />
              <div className="absolute inset-16 rounded-full border border-primary/40" />
              
              {/* Center content */}
              <div className="absolute inset-24 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold-lg">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-display font-bold text-primary-foreground">3</div>
                  <div className="text-xs md:text-sm font-semibold text-primary-foreground/80">Developers</div>
                </div>
              </div>

              {/* Static tech badges on mobile, rotating on desktop */}
              <div className="absolute inset-0 hidden md:block">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 glass rounded-full">
                    <span className="text-sm font-medium text-primary">React</span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 px-4 py-2 glass rounded-full">
                    <span className="text-sm font-medium text-primary">Node.js</span>
                  </div>
                  <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 glass rounded-full">
                    <span className="text-sm font-medium text-primary">TypeScript</span>
                  </div>
                  <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 px-4 py-2 glass rounded-full">
                    <span className="text-sm font-medium text-primary">Next.js</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mt-8 md:mt-12">
              <p className="text-center text-sm text-muted-foreground mb-4">Technologies we work with:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs rounded-full glass text-muted-foreground hover:text-primary active:scale-95 transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
