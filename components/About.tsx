
import React from 'react';
import { motion } from 'framer-motion';
import { AppMode } from '../types';
import { CONTENT } from '../constants';

interface AboutProps {
  mode: AppMode;
}

const About: React.FC<AboutProps> = ({ mode }) => {
  const content = CONTENT[mode];

  const valueCards = [
    { id: "01", title: "Creative Vision", desc: "Crafting unique narratives through design." },
    { id: "02", title: "User-Centered", desc: "Prioritizing human experience above all." },
    { id: "03", title: "Pixel Perfect", desc: "Obsessing over the smallest details." },
    { id: "04", title: "Trend Aware", desc: "Staying ahead of the digital curve." }
  ];

  const stats = [
    { label: "Experience", value: "5+" },
    { label: "Completed", value: "50+" },
    { label: "Clients", value: "30+" },
    { label: "Coffee", value: "∞" }
  ];

  return (
    <section id="about" className="py-12 sm:py-20 px-6 bg-gray-50 dark:bg-brand-dark/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-20">
        {/* Bio Section */}
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6"
          >
            <h3 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase opacity-50">About me</h3>
            <p className="text-xl sm:text-3xl md:text-5xl font-display font-medium leading-relaxed sm:leading-relaxed">
              {content.description}
            </p>
          </motion.div>
        </div>

        {/* Value Proposition Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {valueCards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-white/5 space-y-2 sm:space-y-4 group transition-all"
            >
              <span className="text-2xl sm:text-4xl font-display font-black opacity-10 group-hover:opacity-30 transition-opacity">
                {card.id}
              </span>
              <h4 className="text-base sm:text-xl font-bold font-display">{card.title}</h4>
              <p className="text-[12px] sm:text-sm opacity-60 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 py-8 sm:py-10 border-y border-gray-200 dark:border-white/5">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center space-y-1"
            >
              <p className="text-3xl sm:text-4xl md:text-6xl font-display font-black" style={{ color: mode === 'design' ? '#f7af33' : '#489bd4' }}>
                {stat.value}
              </p>
              <p className="text-[8px] sm:text-[10px] uppercase font-bold tracking-widest opacity-40">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
