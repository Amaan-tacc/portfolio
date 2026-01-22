
import React from 'react';
import { motion } from 'framer-motion';
import { AppMode } from '../types';
import { CONTENT, TOOLS } from '../constants';

interface SkillsProps {
  mode: AppMode;
  themeColors: { primary: string };
}

const Skills: React.FC<SkillsProps> = ({ mode, themeColors }) => {
  const skills = CONTENT[mode].skills;
  const tools = TOOLS[mode];

  return (
    <section id="skills" className="py-12 sm:py-28 px-6 relative scroll-mt-20">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand-yellow/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
          <div className="w-full md:w-2/5 md:sticky md:top-40">
            <h3 className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-40 mb-4 sm:mb-6">Expertise</h3>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold mb-4 sm:mb-6 leading-tight">
              My core <br /> 
              <motion.span 
                animate={{ color: themeColors.primary }}
                className="transition-colors duration-500 italic"
              >
                abilities.
              </motion.span>
            </h2>
            <p className="text-base sm:text-xl opacity-60 max-w-sm leading-relaxed mb-6 sm:mb-10">
              Transforming conceptual ideas into high-fidelity digital solutions through precise execution and domain knowledge.
            </p>
            
            <div className="space-y-4 sm:space-y-6 pt-4 sm:pt-10 border-t md:border-t-0 border-gray-200 dark:border-white/5">
              <h4 className="text-[10px] uppercase font-black tracking-[0.3em] opacity-30">The Toolbox</h4>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {tools.map((tool, idx) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="glass px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl flex items-center space-x-2 border border-gray-200 dark:border-white/5"
                  >
                    <span className="text-base sm:text-lg">{tool.icon}</span>
                    <span className="text-[10px] font-bold">{tool.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/5 grid grid-cols-1 gap-4 sm:gap-6 mt-6 md:mt-0">
            {skills.map((skill, index) => (
              <motion.div 
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group glass p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-500 border border-gray-200/50 dark:border-white/5"
              >
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <div className="flex items-center space-x-3 sm:space-x-5">
                    <span className="text-2xl sm:text-3xl filter grayscale group-hover:grayscale-0 transition-all">{skill.icon}</span>
                    <span className="font-display font-bold text-lg sm:text-2xl tracking-tight">{skill.name}</span>
                  </div>
                  <span className="font-mono text-[10px] sm:text-sm font-bold opacity-30 group-hover:opacity-100 transition-opacity">{skill.level}%</span>
                </div>
                <div className="h-2 sm:h-3 w-full bg-gray-200/50 dark:bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "circOut" }}
                    animate={{ backgroundColor: themeColors.primary }}
                    className="h-full rounded-full transition-colors duration-500 relative"
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
