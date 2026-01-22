
import React from 'react';
import { motion } from 'framer-motion';
import { AppMode } from '../types';

interface MobileAppbarProps {
  mode: AppMode;
  onToggleMode: () => void;
  themeColors: { primary: string; secondary: string };
}

const MobileAppbar: React.FC<MobileAppbarProps> = ({ mode, onToggleMode, themeColors }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { id: 'skills', label: 'Skills', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )},
    { id: 'toggle', label: 'Switch', isToggle: true },
    { id: 'work', label: 'Work', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )},
    { id: 'contact', label: 'Contact', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )},
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="xl:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:max-w-xl max-w-md">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass rounded-[2rem] md:rounded-[2.5rem] p-2 md:p-3 flex items-center justify-between shadow-2xl border border-white/20 dark:border-white/10"
      >
        {navItems.map((item) => {
          if (item.isToggle) {
            return (
              <motion.button
                key={item.id}
                onClick={onToggleMode}
                whileTap={{ scale: 0.9 }}
                animate={{ backgroundColor: themeColors.secondary }}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white shadow-lg -translate-y-4 md:-translate-y-6 border-4 border-white dark:border-brand-dark"
              >
                <motion.div
                  animate={{ rotate: mode === 'design' ? 0 : 180 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </motion.div>
              </motion.button>
            );
          }

          return (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              whileTap={{ scale: 0.9 }}
              className="flex-1 flex flex-col items-center justify-center p-2 md:p-3 opacity-60 hover:opacity-100 transition-opacity"
            >
              <div className="dark:text-white">{item.icon}</div>
              <span className="text-[8px] md:text-[10px] uppercase font-black tracking-tighter mt-1 opacity-50 dark:text-white">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default MobileAppbar;
