import { Crown, Mail, Github, Twitter, Linkedin, MessageCircle } from 'lucide-react';

const whatsappNumbers = [
  { number: '27786025428', display: '078 602 5428' },
  { number: '27753170200', display: '075 317 0200' },
  { number: '27682842850', display: '068 284 2850' },
];

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Crown className="w-6 h-6 text-primary" />
            <span className="text-lg font-display font-bold text-gradient-gold">
              Royal Devs Trio
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#portfolio" className="hover:text-primary transition-colors">Portfolio</a>
            <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>

          {/* Social & Contact */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/royaldevsduo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-primary/50 transition-colors"
              title="GitHub"
            >
              <Github className="w-5 h-5 text-primary" />
            </a>
            <a
              href="https://www.linkedin.com/in/royaldevsduo-1-a1a7383aa"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-primary/50 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-primary" />
            </a>
            <a
              href="https://twitter.com/royaldevsduo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-primary/50 transition-colors"
              title="Twitter"
            >
              <Twitter className="w-5 h-5 text-primary" />
            </a>
            <a
              href="mailto:Royaldevsduo@gmail.com"
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-primary/50 transition-colors"
              title="Royaldevsduo@gmail.com"
            >
              <Mail className="w-5 h-5 text-primary" />
            </a>
            <a
              href={`https://wa.me/${whatsappNumbers[0].number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-green-500/50 transition-colors"
              title="WhatsApp"
            >
              <MessageCircle className="w-5 h-5 text-green-500" />
            </a>
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Royal Devs Trio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
