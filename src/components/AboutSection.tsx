import { motion } from 'framer-motion';
import { Users, Award, Clock, Heart } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-card" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Meet the <span className="text-gradient-gold">Royal Duo</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We are two passionate developers who believe that exceptional software 
              is crafted with dedication, creativity, and a deep understanding of 
              our clients' needs. Together, we bring complementary skills that cover 
              the full spectrum of modern web development.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our partnership combines technical expertise with creative vision, 
              ensuring every project we deliver is not just functional, but truly 
              exceptional. We treat every client's project as if it were our own.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Users, label: 'Collaborative Team' },
                { icon: Award, label: 'Quality Focused' },
                { icon: Clock, label: 'On-Time Delivery' },
                { icon: Heart, label: 'Passion Driven' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse" />
              <div className="absolute inset-8 rounded-full border border-primary/30" />
              <div className="absolute inset-16 rounded-full border border-primary/40" />
              
              {/* Center content */}
              <div className="absolute inset-24 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold-lg">
                <div className="text-center">
                  <div className="text-5xl font-display font-bold text-primary-foreground">2</div>
                  <div className="text-sm font-semibold text-primary-foreground/80">Developers</div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 glass rounded-full">
                  <span className="text-sm font-medium text-primary">React</span>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 px-4 py-2 glass rounded-full">
                  <span className="text-sm font-medium text-primary">TypeScript</span>
                </div>
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 glass rounded-full">
                  <span className="text-sm font-medium text-primary">Node.js</span>
                </div>
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 px-4 py-2 glass rounded-full">
                  <span className="text-sm font-medium text-primary">Next.js</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
