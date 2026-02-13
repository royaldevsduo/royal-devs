import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePageView } from '@/hooks/useAnalytics';

const blogPosts = [
  {
    id: 1,
    title: 'Why Every South African Business Needs a Professional Website in 2026',
    excerpt: 'In today\'s digital-first world, having a professional website is no longer optional. Learn why your business needs to establish a strong online presence.',
    date: '2026-02-05',
    readTime: '5 min read',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    slug: 'why-sa-business-needs-website-2026',
  },
  {
    id: 2,
    title: 'The Ultimate Guide to Web Application Development',
    excerpt: 'Everything you need to know about building modern web applications. From planning to deployment, we cover the complete development lifecycle.',
    date: '2026-02-01',
    readTime: '8 min read',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
    slug: 'ultimate-guide-web-app-development',
  },
  {
    id: 3,
    title: 'UI/UX Design Trends to Watch in 2026',
    excerpt: 'Stay ahead of the curve with these emerging design trends. From AI-powered interfaces to immersive experiences, discover what\'s shaping the future of design.',
    date: '2026-01-28',
    readTime: '6 min read',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
    slug: 'ui-ux-design-trends-2026',
  },
  {
    id: 4,
    title: 'How to Choose the Right Tech Stack for Your Startup',
    excerpt: 'Selecting the right technologies can make or break your startup. Learn how to evaluate and choose the perfect tech stack for your project.',
    date: '2026-01-25',
    readTime: '7 min read',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop',
    slug: 'choose-right-tech-stack-startup',
  },
  {
    id: 5,
    title: 'SEO Best Practices for South African Businesses',
    excerpt: 'Boost your website\'s visibility in local search results. Our comprehensive guide covers everything from keywords to technical SEO.',
    date: '2026-01-20',
    readTime: '10 min read',
    category: 'SEO',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f5a70d?w=800&h=400&fit=crop',
    slug: 'seo-best-practices-south-africa',
  },
  {
    id: 6,
    title: 'The Future of E-commerce in Africa',
    excerpt: 'E-commerce is booming across the African continent. Explore the opportunities and challenges facing online businesses in this growing market.',
    date: '2026-01-15',
    readTime: '6 min read',
    category: 'E-commerce',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    slug: 'future-ecommerce-africa',
  },
];

const categories = ['All', 'Business', 'Development', 'Design', 'Technology', 'SEO', 'E-commerce'];

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

const Blog = () => {
  usePageView('/blog');

  return (
    <>
      <Helmet>
        <title>Blog | Web Development Insights | Royal Devs Trio</title>
        <meta name="description" content="Expert insights on web development, UI/UX design, SEO, and digital business strategies for South African businesses. Stay updated with the latest trends." />
        <meta name="keywords" content="web development blog, South Africa tech blog, UI/UX design tips, SEO guides, startup advice, e-commerce trends" />
        <link rel="canonical" href="https://royal-devs.lovable.app/blog" />
        <meta property="og:title" content="Blog | Royal Devs Trio" />
        <meta property="og:description" content="Expert insights on web development, design, and digital strategies." />
        <meta property="og:url" content="https://royal-devs.lovable.app/blog" />
        <meta property="og:type" content="blog" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Royal Devs Trio Blog",
            "description": "Expert insights on web development, UI/UX design, SEO, and digital business strategies",
            "url": "https://royal-devs.lovable.app/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Royal Devs Trio",
              "url": "https://royal-devs.lovable.app"
            },
            "blogPost": blogPosts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "datePublished": post.date,
              "url": `https://royal-devs.lovable.app/blog/${post.slug}`,
              "image": post.image
            }))
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
                Our Blog
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                Insights & <span className="text-gradient-gold">Resources</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Expert tips, guides, and insights on web development, design, and growing your digital presence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={category === 'All' ? 'default' : 'secondary'}
                  className="cursor-pointer hover:bg-primary/20 transition-colors px-4 py-2"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {blogPosts.map((post) => (
                <motion.article key={post.id} variants={itemVariants}>
                  <Card className="group h-full overflow-hidden hover:border-primary/50 transition-all duration-300 bg-card">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={`${post.title} - Royal Devs Trio blog article on ${post.category.toLowerCase()}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        width={800}
                        height={400}
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString('en-ZA', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <Badge variant="secondary" className="w-fit">
                        <Tag className="w-3 h-3 mr-1" />
                        {post.category}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <h2 className="text-xl font-display font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <Button variant="ghost" className="group/btn p-0 h-auto text-primary">
                        Read More 
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Newsletter CTA */}
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
                Stay Updated
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Get the latest articles, tips, and resources delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Email address for newsletter subscription"
                />
                <Button variant="royal" aria-label="Subscribe to newsletter">Subscribe</Button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
