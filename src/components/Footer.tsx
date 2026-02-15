import { Crown, Mail, Github, Twitter, Linkedin, MessageCircle } from 'lucide-react';

const whatsappNumbers = [
  { number: '27786025428', display: '078 602 5428' },
  { number: '27753170200', display: '075 317 0200' },
  { number: '27682842850', display: '068 284 2850' },
];

export function Footer() {
  return (
    <footer className="py-10 md:py-12 border-t border-border">
      <div className="container mx-auto px-5 sm:px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Crown className="w-6 h-6 text-primary" />
            <span className="text-lg font-display font-bold text-gradient-gold">
              Royal Devs Trio
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-primary active:scale-95 transition-all py-1">Services</a>
            <a href="#pricing" className="hover:text-primary active:scale-95 transition-all py-1">Pricing</a>
            <a href="#about" className="hover:text-primary active:scale-95 transition-all py-1">About</a>
            <a href="#portfolio" className="hover:text-primary active:scale-95 transition-all py-1">Portfolio</a>
            <a href="#testimonials" className="hover:text-primary active:scale-95 transition-all py-1">Testimonials</a>
            <a href="#contact" className="hover:text-primary active:scale-95 transition-all py-1">Contact</a>
          </div>

          {/* Social & Contact */}
          <div className="flex items-center gap-2">
            {[
              { href: 'https://github.com/royaldevsduo', icon: Github, title: 'GitHub', color: 'text-primary' },
              { href: 'https://www.linkedin.com/in/royaldevsduo-1-a1a7383aa', icon: Linkedin, title: 'LinkedIn', color: 'text-primary' },
              { href: 'https://twitter.com/royaldevsduo', icon: Twitter, title: 'Twitter', color: 'text-primary' },
              { href: 'mailto:Royaldevsduo@gmail.com', icon: Mail, title: 'Email', color: 'text-primary' },
            ].map((social) => (
              <a
                key={social.title}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-primary/50 active:scale-90 transition-all"
                title={social.title}
              >
                <social.icon className={`w-5 h-5 ${social.color}`} />
              </a>
            ))}
            <a
              href={`https://wa.me/${whatsappNumbers[0].number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-green-500/50 active:scale-90 transition-all"
              title="WhatsApp"
            >
              <MessageCircle className="w-5 h-5 text-green-500" />
            </a>
          </div>
        </div>

        <div className="text-center mt-6 md:mt-8 pt-6 md:pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Royal Devs Trio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
