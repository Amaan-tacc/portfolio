
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppMode } from '../types';

interface FloatingBackgroundProps {
  mode: AppMode;
  themeColors: { primary: string };
}

const FloatingBackground: React.FC<FloatingBackgroundProps> = ({ mode, themeColors }) => {
  const designIcons = ["🎨", "✒️", "📏", "✨", "📐", "🖼️", "💠", "🌈"];
  const devIcons = ["{ }", "</>", "/>", "JS", "TS", "⚛️", "💾", "📡"];
  const icons = mode === 'design' ? designIcons : devIcons;

  // Generate random static properties once to avoid jagginess during re-renders
  const elements = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    icon: icons[i % icons.length],
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    size: Math.random() * 20 + 15,
    duration: Math.random() * 20 + 35, 
    delay: Math.random() * 5,
    opacity: Math.random() * 0.12 + 0.08 // Slightly increased for visibility
  })), [mode]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence mode="popLayout">
        {elements.map((el) => (
          <motion.div
            key={`${mode}-${el.id}`}
            initial={{ 
              x: `${el.initialX}vw`, 
              y: `${el.initialY}vh`, 
              opacity: 0, 
              scale: 0.5 
            }}
            animate={{ 
              x: [
                `${el.initialX}vw`, 
                `${(el.initialX + 15) % 100}vw`, 
                `${el.initialX}vw`
              ],
              y: [
                `${el.initialY}vh`, 
                `${(el.initialY - 20) % 100}vh`, 
                `${el.initialY}vh`
              ],
              opacity: [el.opacity, el.opacity * 1.5, el.opacity],
              scale: [0.9, 1.1, 0.9],
              rotate: [0, 90, 0]
            }}
            exit={{ opacity: 0, scale: 0.2 }}
            transition={{ 
              duration: el.duration, 
              repeat: Infinity, 
              delay: el.delay, 
              ease: "linear" 
            }}
            className="absolute select-none will-change-transform"
            style={{ 
              fontSize: el.size, 
              color: themeColors.primary,
              filter: 'blur(1px)' // Reduced blur to make icons recognizable but still soft
            }}
          >
            {el.icon}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingBackground;
