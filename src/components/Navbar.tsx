import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown, Menu, X, LogOut, User, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <Crown className="w-8 h-8 text-primary glow-gold group-hover:scale-110 transition-transform" />
            <span className="text-xl font-display font-bold text-gradient-gold">
              Royal Devs Duo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass border-t border-border"
        >
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 space-y-2">
              {user ? (
                <>
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      onClick={() => { navigate('/admin'); setIsOpen(false); }}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Admin Panel
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="w-full gap-2"
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
                    className="w-full"
                    onClick={() => { navigate('/auth'); setIsOpen(false); }}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="royal"
                    className="w-full"
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
