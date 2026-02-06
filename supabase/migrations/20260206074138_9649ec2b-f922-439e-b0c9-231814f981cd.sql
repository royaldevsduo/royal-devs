-- Create projects table for portfolio showcase
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  icon TEXT NOT NULL DEFAULT 'Globe',
  results TEXT NOT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create team members table
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  email TEXT,
  whatsapp TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create page views analytics table
CREATE TABLE public.page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  visitor_id TEXT NOT NULL,
  user_agent TEXT,
  referrer TEXT,
  country TEXT,
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Projects policies - public read, admin write
CREATE POLICY "Anyone can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Admins can insert projects" ON public.projects FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update projects" ON public.projects FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete projects" ON public.projects FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Team members policies - public read, admin write
CREATE POLICY "Anyone can view team members" ON public.team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all team members" ON public.team_members FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert team members" ON public.team_members FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update team members" ON public.team_members FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete team members" ON public.team_members FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Page views policies - anyone can insert (anonymous tracking), admins can read
CREATE POLICY "Anyone can log page views" ON public.page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view analytics" ON public.page_views FOR SELECT USING (has_role(auth.uid(), 'admin'));

-- Add triggers for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default team members
INSERT INTO public.team_members (name, role, bio, whatsapp, display_order) VALUES
('Thabo', 'Full-Stack Developer', 'Passionate about creating robust web applications with modern technologies.', '27753170200', 1),
('Rilinde', 'Frontend Specialist', 'Expert in crafting beautiful, responsive user interfaces that delight users.', '27725033680', 2),
('Mukovhe', 'Backend Engineer', 'Focused on building secure, scalable server architectures and APIs.', '27682842850', 3);

-- Insert default projects from portfolio
INSERT INTO public.projects (title, client, category, description, image_url, technologies, icon, results, is_featured, display_order) VALUES
('AutoParts SA', 'Automotive Retailer', 'E-Commerce Platform', 'Complete e-commerce solution for a Johannesburg-based auto parts supplier. Features include inventory management, online payments via PayFast, and delivery tracking.', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop', ARRAY['React', 'Node.js', 'PostgreSQL', 'PayFast'], 'ShoppingCart', '300% increase in online sales', true, 1),
('Kasi Eats', 'Food Delivery Startup', 'Web & Mobile App', 'Food ordering platform connecting local restaurants with customers in Soweto and surrounding areas. Real-time order tracking and driver management.', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop', ARRAY['React Native', 'Firebase', 'Google Maps API'], 'Utensils', '5,000+ monthly orders', true, 2),
('PropertyHub Gauteng', 'Real Estate Agency', 'Business Website', 'Professional property listing website with virtual tours, mortgage calculator, and lead generation system for a Pretoria real estate company.', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop', ARRAY['Next.js', 'Supabase', 'Tailwind CSS'], 'Building2', '150+ leads per month', true, 3),
('HealthTrack Clinics', 'Medical Practice', 'Booking System', 'Patient management and appointment booking system for a network of clinics. Includes SMS reminders, patient records, and billing integration.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop', ARRAY['React', 'Express.js', 'MongoDB', 'Twilio'], 'Smartphone', '60% reduction in no-shows', false, 4),
('TechStartup Analytics', 'SaaS Company', 'Dashboard Application', 'Custom analytics dashboard with real-time data visualization, automated reporting, and team collaboration features for a Cape Town startup.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', ARRAY['React', 'D3.js', 'Python', 'AWS'], 'BarChart3', 'Processing 1M+ data points daily', false, 5),
('Ubuntu Fashion', 'Clothing Brand', 'Brand Website', 'Stunning fashion brand website showcasing African-inspired designs. Features lookbook galleries, size guides, and integration with their Shopify store.', 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop', ARRAY['React', 'Shopify API', 'Framer Motion'], 'Globe', '200% increase in brand engagement', false, 6);