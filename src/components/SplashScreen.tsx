import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 400);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-navy-dark via-background to-navy"
        >
          {/* Radial glow behind crown */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute w-72 md:w-96 h-72 md:h-96 rounded-full bg-gradient-radial from-primary/30 via-primary/10 to-transparent blur-3xl"
          />

          {/* Main content */}
          <div className="relative flex flex-col items-center">
            {/* Crown icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.1,
              }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative p-6 md:p-8 rounded-full bg-gradient-gold shadow-gold-lg"
              >
                <Crown className="w-14 h-14 md:w-20 md:h-20 text-primary-foreground drop-shadow-lg" />
              </motion.div>
            </motion.div>

            {/* Company name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-6 md:mt-8 text-center"
            >
              <h1 className="text-3xl md:text-5xl font-display font-bold text-gradient-gold">
                Royal Devs Trio
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                className="mt-2 text-muted-foreground text-base md:text-lg"
              >
                Building Digital Kingdoms
              </motion.p>
            </motion.div>

            {/* Loading indicator */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 1.5, ease: 'easeInOut' }}
              className="mt-6 md:mt-8 w-36 md:w-48 h-1 rounded-full bg-secondary overflow-hidden origin-left"
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
