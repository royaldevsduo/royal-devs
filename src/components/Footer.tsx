import { Crown, Mail, Github, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Crown className="w-6 h-6 text-primary" />
            <span className="text-lg font-display font-bold text-gradient-gold">
              Royal Devs Duo
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#portfolio" className="hover:text-primary transition-colors">Portfolio</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>

          {/* Contact */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:Royaldevsduo@gmail.com"
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-primary/50 transition-colors"
            >
              <Mail className="w-5 h-5 text-primary" />
            </a>
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Royal Devs Duo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
