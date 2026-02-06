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
      setTimeout(onComplete, 500); // Wait for exit animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-navy-dark via-background to-navy"
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary/20"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  scale: 0,
                }}
                animate={{
                  y: [null, -100],
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Radial glow behind crown */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute w-96 h-96 rounded-full bg-gradient-radial from-primary/30 via-primary/10 to-transparent blur-3xl"
          />

          {/* Main content */}
          <div className="relative flex flex-col items-center">
            {/* Crown icon with animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="relative"
            >
              {/* Outer glow ring */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-8 rounded-full bg-gradient-to-r from-primary/50 via-gold-light/50 to-primary/50 blur-xl"
              />
              
              {/* Crown container */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative p-8 rounded-full bg-gradient-gold shadow-gold-lg"
              >
                <Crown className="w-20 h-20 text-primary-foreground drop-shadow-lg" />
              </motion.div>

              {/* Sparkle effects */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-primary"
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: [0, Math.cos((i * 60 * Math.PI) / 180) * 80],
                    y: [0, Math.sin((i * 60 * Math.PI) / 180) * 80],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.5 + i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              ))}
            </motion.div>

            {/* Company name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 text-center"
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient-gold">
                Royal Devs Trio
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="mt-2 text-muted-foreground text-lg"
              >
                Building Digital Kingdoms
              </motion.p>
            </motion.div>

            {/* Loading indicator */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 2, ease: 'easeInOut' }}
              className="mt-8 w-48 h-1 rounded-full bg-secondary overflow-hidden origin-left"
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
