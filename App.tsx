
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { AppMode } from './types';
import Navbar from './components/Navbar';
import MobileAppbar from './components/MobileAppbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Work from './components/Work';
import Contact from './components/Contact';
import FloatingBackground from './components/FloatingBackground';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('design');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleMode = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setMode(prev => (prev === 'design' ? 'dev' : 'design'));
      setIsTransitioning(false);
    }, 400);
  };

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const themeColors = useMemo(() => {
    return {
      primary: mode === 'design' ? '#f7af33' : '#489bd4',
      secondary: mode === 'design' ? '#489bd4' : '#f7af33',
    };
  }, [mode]);

  return (
    <div className="relative min-h-screen mode-transition overflow-hidden bg-white dark:bg-brand-dark">
      {/* Floating UI Elements */}
      <FloatingBackground mode={mode} themeColors={themeColors} />

      {/* Exotic Transition Wipe */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0, originX: 1 }}
            transition={{ duration: 0.6, ease: [0.85, 0, 0.15, 1] }}
            className="fixed inset-0 z-[100] origin-left pointer-events-none"
            style={{ backgroundColor: themeColors.secondary }}
          />
        )}
      </AnimatePresence>

      <motion.div 
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="relative z-10"
      >
        <Navbar 
          mode={mode} 
          isDarkMode={isDarkMode} 
          onToggleDarkMode={toggleDarkMode} 
          onToggleMode={toggleMode}
          themeColors={themeColors}
        />
        
        <Hero 
          mode={mode} 
          isDarkMode={isDarkMode} 
          onToggleMode={toggleMode} 
          themeColors={themeColors} 
        />
        <About mode={mode} />
        <Skills mode={mode} themeColors={themeColors} />
        <Work mode={mode} themeColors={themeColors} />
        <Contact mode={mode} themeColors={themeColors} />
        
        <MobileAppbar 
          mode={mode} 
          onToggleMode={toggleMode} 
          themeColors={themeColors} 
        />
      </motion.div>

      {/* Dynamic Parallax Background Gradients */}
      <motion.div 
        style={{ y: backgroundY }}
        className="fixed inset-0 z-0 pointer-events-none opacity-40 will-change-transform"
      >
        <motion.div 
          animate={{ backgroundColor: `${themeColors.primary}33` }}
          className="absolute top-[5%] left-[0%] w-[50vw] h-[50vw] rounded-full blur-[140px]" 
        />
        <motion.div 
          animate={{ backgroundColor: `${themeColors.secondary}22` }}
          className="absolute bottom-[0%] right-[0%] w-[40vw] h-[40vw] rounded-full blur-[120px]" 
        />
      </motion.div>

      <footer className="py-8 pb-32 lg:pb-8 text-center text-[10px] uppercase font-bold tracking-[0.2em] opacity-40 border-t border-gray-200 dark:border-white/5 bg-white dark:bg-brand-dark z-20 relative">
        <p>&copy; {new Date().getFullYear()} Amaanity. Crafted with Purpose.</p>
      </footer>
    </div>
  );
};

export default App;
