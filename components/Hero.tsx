
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppMode } from '../types';
import { CONTENT } from '../constants';
import avatar1 from '../assets/avatar1.png'
import avatar2 from '../assets/avatar2.png'

interface HeroProps {
  mode: AppMode;
  isDarkMode: boolean;
  onToggleMode: () => void;
  themeColors: { primary: string; secondary: string };
}

const Hero: React.FC<HeroProps> = ({ mode, isDarkMode, onToggleMode, themeColors }) => {
  const content = CONTENT[mode];

  // Portrait logic: Changes only on mode switch, stays same for dark/light
  const portraitUrl = mode === 'design' 
    ? avatar1
    : avatar2;

  return (
    <section id="home" className="relative min-h-[85vh] lg:min-h-screen pt-28 sm:pt-32 lg:pt-16 pb-12 sm:pb-32 flex flex-col items-center justify-center px-6 overflow-visible scroll-mt-20">
      
      {/* Background Decorative Elements - Ultra Smooth Animations */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            rotate: 360,
            x: [0, 40, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-20 w-64 sm:w-80 h-64 sm:h-80 rounded-[4rem] border border-gray-200/20 dark:border-white/5 opacity-50 will-change-transform" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: -20,
            x: [0, -30, 0]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-80 h-80 sm:w-[30rem] sm:h-[30rem] rounded-full border border-gray-200/10 dark:border-white/5 opacity-40 will-change-transform" 
        />
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          className="space-y-4 sm:space-y-6 order-2 lg:order-1 text-left"
        >
          <div className="space-y-1 sm:space-y-2">
            <motion.p 
              animate={{ color: themeColors.primary }}
              className="text-[9px] sm:text-[11px] font-bold tracking-[0.4em] uppercase opacity-70"
            >
              Creative Technologist
            </motion.p>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-extrabold leading-[1.05]">
              Hey, <br /> This is <br />
              <motion.span 
                animate={{ color: themeColors.primary }}
                className="transition-colors duration-500 relative inline-block"
              >
                Amaanity.
                <motion.div 
                  layoutId="underline"
                  className="absolute -bottom-1 sm:-bottom-2 left-0 h-1 sm:h-2 w-1/2 rounded-full"
                  style={{ backgroundColor: themeColors.primary }}
                />
              </motion.span>
            </h1>
          </div>
          
          <div className="h-10 sm:h-12 flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h2
                key={mode}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: "anticipate" }}
                className="text-xl sm:text-3xl md:text-4xl font-medium opacity-90 italic font-serif"
              >
                {content.subheading}
              </motion.h2>
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-stretch sm:items-center pt-2 sm:pt-4 relative">
            <motion.a 
              href="#work" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ backgroundColor: themeColors.primary, boxShadow: `0 10px 30px ${themeColors.primary}44` }}
              className="px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg text-white shadow-2xl z-20 flex items-center justify-center min-w-[180px]"
            >
              Explore Work
            </motion.a>

            <div className="relative">
              <motion.button
                onClick={onToggleMode}
                whileHover={{ scale: 1.05, backgroundColor: themeColors.secondary, color: '#ffffff' }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  borderColor: themeColors.secondary,
                  color: themeColors.secondary,
                  boxShadow: `0 15px 40px ${themeColors.secondary}22`
                }}
                className="w-full sm:w-auto group relative px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-transparent border-2 font-bold text-base sm:text-lg transition-all duration-500 flex items-center justify-center space-x-3 z-20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span>See my {mode === 'design' ? 'Dev' : 'Design'} Side</span>
                <motion.div
                  animate={{ rotate: mode === 'design' ? 0 : 180 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </motion.div>
              </motion.button>

              <motion.div 
                className="absolute -top-20 -right-24 sm:-right-32 hidden xl:block pointer-events-none"
                initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
                animate={{ opacity: 1, scale: 0.8, rotate: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <motion.svg 
                  width="100" height="100" viewBox="0 0 100 100" fill="none"
                  animate={{ rotate: [0, -4, 0], y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                >
                  <motion.path 
                    d="M90 10 C 90 40, 70 60, 25 70" 
                    stroke={themeColors.secondary} 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeDasharray="6 8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <path 
                    d="M38 58L22 70L38 82" 
                    stroke={themeColors.secondary} 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </motion.svg>
                <motion.span 
                  animate={{ scale: [1, 1.05, 1], y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -top-4 right-0 text-[9px] uppercase font-black tracking-widest px-3 py-1 glass rounded-full shadow-2xl border border-gray-100 dark:border-white/10"
                  style={{ color: themeColors.secondary, backgroundColor: 'rgba(255,255,255,0.95)' }}
                >
                  Switch!
                </motion.span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="relative order-1 lg:order-2 perspective-1000"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-square sm:aspect-[3/4] max-w-[240px] sm:max-w-md mx-auto w-full group">
            <motion.div 
              animate={{ 
                scale: [1, 1.02, 1],
                borderColor: [themeColors.primary + '33', themeColors.secondary + '33']
              }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="absolute inset-0 rounded-[2.5rem] sm:rounded-[3.5rem] border-[12px] sm:border-[24px] opacity-20 will-change-transform" 
            />

            <div className="absolute inset-0 z-10 flex items-center justify-center p-4 sm:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, scale: 0.98, y: 15, filter: "blur(6px)" }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.02, y: -15, filter: "blur(6px)" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <div className="absolute inset-0 bg-white/5 dark:bg-white/2 backdrop-blur-3xl rounded-[2rem] sm:rounded-[4.5rem] border border-white/10 dark:border-white/5 rotate-2 -z-10" />
                  
                  <img 
                    src={portraitUrl} 
                    onError={(e) => { e.currentTarget.src = `https://api.dicebear.com/7.x/notionists/svg?seed=Amaanity${mode}`; }}
                    alt="Amaanity Portrait"
                    className="w-full h-full object-contain drop-shadow-2xl z-10 scale-105 sm:scale-135 will-change-transform transition-transform duration-1000"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div 
              className="absolute -top-2 sm:-top-6 left-0 p-3 sm:p-5 glass rounded-2xl sm:rounded-3xl z-20 shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <span className="text-xl sm:text-4xl">{mode === 'design' ? '🎨' : '💻'}</span>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-4 sm:bottom-12 -right-4 sm:-right-6 p-3 sm:p-5 glass rounded-2xl sm:rounded-3xl z-20 shadow-2xl"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            >
              <span className="text-[9px] sm:text-sm font-bold uppercase tracking-[0.2em]" style={{ color: themeColors.primary }}>
                {mode === 'design' ? 'Creative' : 'Technical'}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 hidden lg:flex"
      >
        <span className="text-[9px] uppercase font-bold tracking-[0.3em] opacity-40">Journey Down</span>
        <motion.div 
          animate={{ height: [12, 35, 12], opacity: [0.2, 0.7, 0.2] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="w-[1.5px] bg-gradient-to-b from-brand-grey to-transparent" 
        />
      </motion.div>
    </section>
  );
};

export default Hero;
