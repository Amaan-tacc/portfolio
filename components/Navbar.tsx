
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppMode } from '../types';
import logo1 from '../assets/logo1.webp'
import logo2 from '../assets/logo2.webp'

interface NavbarProps {
  mode: AppMode;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onToggleMode: () => void;
  themeColors: { primary: string; secondary: string };
}

const Navbar: React.FC<NavbarProps> = ({ mode, isDarkMode, onToggleMode, onToggleDarkMode, themeColors }) => {
  const navItems = ['Home', 'About', 'Skills', 'Work', 'Contact'];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Wordmark-style placeholders (wider horizontal aspect ratio)
  // Design mode logo placeholder
  const designLogoUrl = logo1;
  // Dev mode logo placeholder
  const devLogoUrl = logo2;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200/50 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {/* Wordmark Container: Wider aspect ratio for easy replacement */}
          <div className="relative w-32 sm:w-40 h-10 flex items-center justify-start">
            <AnimatePresence mode="wait">
              <motion.img
                key={isDarkMode}
                src={isDarkMode ? logo2 : logo1}
                 alt="Amaanity Wordmark"
                initial={{ opacity: 0, x: -10, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 10, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="max-h-[140px] w-auto object-contain"

              />
            </AnimatePresence>
            
            {/* Dynamic Subtle Glow */}
            <motion.div 
              animate={{ 
                backgroundColor: themeColors.primary,
                opacity: [0.05, 0.15, 0.05]
              }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute inset-y-0 -inset-x-4 rounded-full blur-2xl -z-10"
            />
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center space-x-10">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => scrollToSection(e, item)}
              className="text-sm font-bold uppercase tracking-widest hover:opacity-100 opacity-60 transition-opacity"
            >
              {item}
            </a>
          ))}
          
          <div 
            onClick={onToggleMode}
            className="flex items-center space-x-2 bg-gray-100 dark:bg-white/5 p-1 rounded-full border border-gray-200 dark:border-white/10 cursor-pointer hover:shadow-lg transition-all"
          >
            <div
              className={`p-2 rounded-full transition-all duration-300 ${mode === 'design' ? 'bg-white dark:bg-white/20 shadow-md scale-110' : 'opacity-30 scale-90'}`}
              title="Switch to Design Mode"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke={mode === 'design' ? themeColors.primary : "currentColor"}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <div
              className={`p-2 rounded-full transition-all duration-300 ${mode === 'dev' ? 'bg-white dark:bg-white/20 shadow-md scale-110' : 'opacity-30 scale-90'}`}
              title="Switch to Developer Mode"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke={mode === 'dev' ? themeColors.primary : "currentColor"}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
          </div>

          <button
            onClick={onToggleDarkMode}
            className="p-3 rounded-full hover:bg-white/50 dark:hover:bg-white/10 transition-colors border border-gray-200 dark:border-white/10"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Tablet Toggle Dark Mode */}
        <div className="xl:hidden flex items-center">
          <button
            onClick={onToggleDarkMode}
            className="p-3 rounded-full hover:bg-white/50 dark:hover:bg-white/10 transition-colors border border-gray-200 dark:border-white/10"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
