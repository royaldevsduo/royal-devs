import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Database, Zap, Shield, Palette, Code, Server, Cloud, Layers, Wrench, Rocket } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { usePageView } from '@/hooks/useAnalytics';

const services = [
  {
    icon: Globe,
    title: 'Website Development',
    description: 'Custom websites built with modern technologies. Responsive, fast, and SEO-optimized for maximum visibility.',
    features: ['Responsive Design', 'SEO Optimization', 'Fast Loading', 'Cross-browser Compatible'],
    price: 'From R3,000',
  },
  {
    icon: Smartphone,
    title: 'Web Applications',
    description: 'Full-stack web apps with rich features, real-time updates, and seamless user experiences.',
    features: ['Real-time Features', 'User Authentication', 'Database Integration', 'API Development'],
    price: 'From R8,000',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces that captivate users and drive engagement.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    price: 'From R2,500',
  },
  {
    icon: Database,
    title: 'Backend Systems',
    description: 'Robust server architecture, APIs, and database solutions that scale with your business.',
    features: ['RESTful APIs', 'Database Design', 'Cloud Infrastructure', 'Security'],
    price: 'From R5,000',
  },
  {
    icon: Shield,
    title: 'Security & Maintenance',
    description: 'Ongoing support, security updates, and performance optimization for peace of mind.',
    features: ['Security Audits', 'Regular Updates', '24/7 Monitoring', 'Backup Solutions'],
    price: 'From R1,500/mo',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Speed up existing sites with our expert optimization techniques.',
    features: ['Speed Analysis', 'Code Optimization', 'Caching Setup', 'CDN Integration'],
    price: 'From R2,000',
  },
  {
    icon: Code,
    title: 'Custom Development',
    description: 'Tailored solutions for unique business requirements and complex integrations.',
    features: ['Custom Features', 'Third-party Integrations', 'Legacy System Updates', 'Technical Consulting'],
    price: 'Custom Quote',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Cloud infrastructure setup, migration, and management for scalable applications.',
    features: ['Cloud Migration', 'AWS/GCP/Azure', 'DevOps Setup', 'Auto-scaling'],
    price: 'From R4,000',
  },
  {
    icon: Rocket,
    title: 'MVP Development',
    description: 'Rapid prototyping and minimum viable product development for startups.',
    features: ['Quick Turnaround', 'Iterative Development', 'Market Validation', 'Scalable Foundation'],
    price: 'From R10,000',
  },
];

const containerVariants: import('framer-motion').Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100 },
  },
};

const Services = () => {
  const navigate = useNavigate();
  usePageView('/services');

  return (
    <>
      <Helmet>
        <title>Web Development Services | Royal Devs Trio South Africa</title>
        <meta name="description" content="Professional web development services in South Africa. Website design, web applications, UI/UX design, backend systems, and more. Get a free quote today!" />
        <meta name="keywords" content="web development services South Africa, website design, web applications, UI/UX design, backend development, cloud solutions, MVP development" />
        <link rel="canonical" href="https://royal-devs.lovable.app/services" />
        <meta property="og:title" content="Web Development Services | Royal Devs Trio" />
        <meta property="og:description" content="Professional web development services in South Africa. From websites to complex web applications." />
        <meta property="og:url" content="https://royal-devs.lovable.app/services" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Web Development",
            "provider": {
              "@type": "Organization",
              "name": "Royal Devs Trio",
              "url": "https://royal-devs.lovable.app"
            },
            "areaServed": {
              "@type": "Country",
              "name": "South Africa"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Web Development Services",
              "itemListElement": services.map((service, index) => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": service.title,
                  "description": service.description
                }
              }))
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-royal opacity-50" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
                Our Services
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                <span className="text-gradient-gold">Premium</span> Web Development Services
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                From stunning websites to complex web applications, we deliver digital solutions 
                that drive results for businesses across South Africa.
              </p>
              <Button variant="royal" size="lg" onClick={() => navigate('/#contact')}>
                Get a Free Quote
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {services.map((service, index) => (
                <motion.article
                  key={index}
                  variants={itemVariants}
                  className="group p-8 glass rounded-2xl hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-xl font-display font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="text-primary font-semibold">{service.price}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-royal opacity-30" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Contact us today for a free consultation and quote. We're here to help bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="royal" size="lg" onClick={() => navigate('/#contact')}>
                  Contact Us
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate('/#portfolio')}>
                  View Our Work
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Services;
