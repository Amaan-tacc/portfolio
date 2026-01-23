
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppMode, Project } from '../types';
import { CONTENT } from '../constants';

interface WorkProps {
  mode: AppMode;
  themeColors: { primary: string };
}

const Work: React.FC<WorkProps> = ({ mode, themeColors }) => {
  const projects = CONTENT[mode].projects;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const autoPlayRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);


  const pauseAutoPlay = () => {
  pauseAutoPlay();


  if (resumeTimeoutRef.current) {
    clearTimeout(resumeTimeoutRef.current);
  }

  resumeTimeoutRef.current = window.setTimeout(() => {
    setIsAutoPlaying(true);
  }, 2000);
};


  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % projects.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = window.setInterval(() => {
        next();
      }, 6000);
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    return () => {
  if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
};

  }, [isAutoPlaying, projects.length]);

  const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    zIndex: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -500 : 500,
    opacity: 0,
    scale: 0.98,
    zIndex: 0,
  }),
};


  const swipeConfidenceThreshold = 6000;

  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section id="work" className="py-12 sm:py-24 px-6 bg-gray-50 dark:bg-brand-dark/30 relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto relative z-10 mb-6 sm:mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 sm:gap-8"
        >
          <div className="space-y-2 sm:space-y-4">
            <h3 className="text-[10px] sm:text-sm font-bold tracking-[0.4em] uppercase opacity-40">Portfolio</h3>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold leading-tight">
              Selected <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 dark:from-white dark:to-white/40">Projects.</span>
            </h2>
          </div>
          
          <div className="flex items-center justify-between w-full md:w-auto space-x-4">
            <div className="flex space-x-2">
              <button 
                onClick={() => { prev(); pauseAutoPlay(); }}
                className="p-3 sm:p-4 rounded-full glass border border-gray-200 dark:border-white/10 hover:bg-white/10 transition-colors"
                aria-label="Previous project"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                onClick={() => { next(); pauseAutoPlay(); }}
                className="p-3 sm:p-4 rounded-full glass border border-gray-200 dark:border-white/10 hover:bg-white/10 transition-colors"
                aria-label="Next project"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "circOut" }}
        className="relative w-full max-w-7xl mx-auto overflow-visible"
      >
        <div className="relative min-h-[400px] sm:min-h-[600px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="sync">

            <motion.div
              key={`${mode}-${index}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
  x: { type: "spring", stiffness: 260, damping: 30 },
  opacity: { duration: 0.2 },
  scale: { duration: 0.2 },
}}

              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.35}

              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  next();
                  setIsAutoPlaying(false);
                } else if (swipe > swipeConfidenceThreshold) {
                  prev();
                  setIsAutoPlaying(false);
                }
              }}
              className="absolute w-full max-w-5xl group cursor-grab active:cursor-grabbing px-4"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                <div 
                  onClick={() => { if (!selectedProject) setSelectedProject(projects[index]); setIsAutoPlaying(false); }}
                  className="lg:col-span-8 relative aspect-video rounded-2xl sm:rounded-[3rem] overflow-hidden shadow-xl sm:shadow-2xl glass group-hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] transition-all pointer-events-none sm:pointer-events-auto"
                >
                  <img 
                    src={projects[index].image} 
                    alt={projects[index].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute top-4 sm:top-8 left-4 sm:left-8 flex gap-2">
                    {projects[index].tags.map(tag => (
                      <span key={tag} className="px-2 sm:px-4 py-1 sm:py-2 glass text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-lg text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="lg:col-span-4 space-y-3 sm:space-y-6 text-left p-2 select-none">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2 sm:space-y-4"
                  >
                    <span className="text-xl sm:text-4xl font-display font-black opacity-10">0{index + 1}</span>
                    <h4 className="text-xl sm:text-3xl md:text-4xl font-display font-bold text-brand-grey dark:text-white leading-tight">
                      {projects[index].title}
                    </h4>
                    <p className="opacity-60 text-sm sm:text-lg leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {projects[index].description}
                    </p>
                    <motion.button 
                      onClick={() => { setSelectedProject(projects[index]); setIsAutoPlaying(false); }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] sm:text-xs transition-all shadow-lg text-white"
                      style={{ backgroundColor: themeColors.primary }}
                    >
                      View Project
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
      
      <div className="flex justify-center mt-6 sm:mt-16 space-x-2 sm:space-x-3">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => { setIndex(i); setIsAutoPlaying(false); }}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-10 sm:w-16 bg-current opacity-100' : 'w-2 sm:w-5 bg-current opacity-20'}`}
            style={{ color: themeColors.primary }}
          />
        ))}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 backdrop-blur-[40px] sm:backdrop-blur-[60px]"
              style={{ backgroundColor: `${mode === 'design' ? '#fdf8f0' : '#f0f7fd'}AA` }}
            >
               <div className="absolute inset-0 dark:bg-brand-dark/70" />
            </motion.div>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-white dark:bg-brand-dark backdrop-blur-md rounded-[2.5rem] sm:rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.3)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/20 dark:border-white/5 overflow-hidden"
            >
              <div className="p-6 sm:p-12 pb-4 flex justify-between items-start z-20 bg-white dark:bg-brand-dark border-b border-gray-100 dark:border-white/5">
                <motion.div
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.2 }}
                >
                  <h2 className="text-2xl sm:text-5xl md:text-6xl font-display font-extrabold leading-tight">
                    {selectedProject.title}
                  </h2>
                  <div className="flex flex-wrap gap-1.5 mt-2 sm:mt-4">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 sm:px-3 sm:py-1 bg-gray-200/50 dark:bg-white/10 rounded-lg text-[8px] sm:text-[10px] font-black uppercase tracking-[0.1em] opacity-80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-3 sm:p-4 rounded-full glass border border-gray-200 dark:border-white/10 hover:bg-white/40 dark:hover:bg-white/20 transition-all hover:scale-110"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 sm:p-12 pt-6 sm:pt-10 no-scrollbar space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-start">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative group"
                  >
                    <div className="aspect-[4/3] w-full rounded-[2rem] overflow-hidden shadow-2xl relative border border-white/10">
                      <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-8"
                  >
                    <div className="space-y-4">
                      <h4 className="text-[10px] uppercase font-black tracking-widest opacity-30">The Context</h4>
                      <p className="text-base sm:text-lg opacity-70 leading-relaxed font-medium italic">
                        "Building solutions that don't just look great, but solve real human problems through intuitive digital flow."
                      </p>
                      <p className="text-sm sm:text-base opacity-50 leading-relaxed">
                        {selectedProject.description} This initiative focused on bridging the gap between complexity and usability, ensuring that every touchpoint adds value to the user's daily interaction.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 pt-4 border-t border-gray-100 dark:border-white/5">
                      <div className="space-y-1">
                        <h4 className="text-[10px] uppercase font-black tracking-widest opacity-30">Timeline</h4>
                        <p className="text-sm sm:text-base font-bold">Q4 2024</p>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-[10px] uppercase font-black tracking-widest opacity-30">Focus</h4>
                        <p className="text-sm sm:text-base font-bold">{mode === 'design' ? 'Interaction Design' : 'Scalable Arch.'}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="space-y-8 pt-12 border-t border-gray-100 dark:border-white/5">
                  <div className="space-y-2">
                    <h4 className="text-[10px] uppercase font-black tracking-widest opacity-30">Behind the scenes</h4>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold">Process Insights</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
                    <div className="space-y-4">
                      <div className="aspect-square bg-gray-100 dark:bg-white/5 rounded-3xl overflow-hidden shadow-lg border border-white/5">
                        <img src={`https://picsum.photos/seed/${selectedProject.id + 11}/800/800`} alt="Process Step 1" className="w-full h-full object-cover opacity-80" />
                      </div>
                      <p className="text-xs sm:text-sm opacity-50 px-2 italic">Iteration on core system principles and data mapping.</p>
                    </div>
                    <div className="space-y-4 pt-4 sm:pt-16">
                      <div className="aspect-square bg-gray-100 dark:bg-white/5 rounded-3xl overflow-hidden shadow-lg border border-white/5">
                        <img src={`https://picsum.photos/seed/${selectedProject.id + 22}/800/800`} alt="Process Step 2" className="w-full h-full object-cover opacity-80" />
                      </div>
                      <p className="text-xs sm:text-sm opacity-50 px-2 italic">Refining the final visual language and performance tuning.</p>
                    </div>
                  </div>
                </div>

                <div className="h-12 sm:h-20" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Work;
