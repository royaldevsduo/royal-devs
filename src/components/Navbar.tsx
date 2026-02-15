import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navLinks = [
    { href: '/services', label: 'Services', isRoute: true },
    { href: '/#pricing', label: 'Pricing', isRoute: false },
    { href: '/#about', label: 'About', isRoute: false },
    { href: '/#portfolio', label: 'Portfolio', isRoute: false },
    { href: '/blog', label: 'Blog', isRoute: true },
    { href: '/#contact', label: 'Contact', isRoute: false },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <Crown className="w-7 h-7 md:w-8 md:h-8 text-primary glow-gold group-hover:scale-110 transition-transform" />
            <span className="text-lg md:text-xl font-display font-bold text-gradient-gold">
              Royal Devs Trio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* Theme Toggle & Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            {user ? (
              <>
                {isAdmin && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/admin')}
                    className="gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Admin
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/auth')}
                >
                  Sign In
                </Button>
                <Button
                  variant="royal"
                  size="sm"
                  onClick={() => navigate('/auth?mode=signup')}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile: Theme + Menu */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              className="text-foreground p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden glass border-t border-border"
        >
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block text-muted-foreground hover:text-primary active:text-primary transition-colors py-3 px-2 rounded-lg active:bg-primary/5 min-h-[44px] flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary active:text-primary transition-colors py-3 px-2 rounded-lg active:bg-primary/5 min-h-[44px] flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              )
            ))}
            <div className="pt-3 space-y-2 border-t border-border mt-2">
              {user ? (
                <>
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 min-h-[48px]"
                      onClick={() => { navigate('/admin'); setIsOpen(false); }}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Admin Panel
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="w-full gap-2 min-h-[48px]"
                    onClick={() => { handleSignOut(); setIsOpen(false); }}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="w-full min-h-[48px]"
                    onClick={() => { navigate('/auth'); setIsOpen(false); }}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="royal"
                    className="w-full min-h-[48px]"
                    onClick={() => { navigate('/auth?mode=signup'); setIsOpen(false); }}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
