
import React from 'react';
import { ModeContent } from './types';

export const CONTENT: ModeContent = {
  design: {
    subheading: "I'm a designer",
    description: "I focus on creating visual harmony and intuitive user experiences. My approach blends aesthetic precision with functional clarity, ensuring every pixel serves a purpose in building impactful brands and digital products.",
    skills: [
      { name: "Brand Identity", level: 95, icon: "✨" },
      { name: "UI/UX Design", level: 90, icon: "📐" },
      { name: "Visual Arts", level: 85, icon: "🎨" },
      { name: "Prototyping", level: 88, icon: "📱" },
      { name: "Motion Design", level: 80, icon: "🎬" },
      { name: "Typography", level: 92, icon: "✒️" }
    ],
    valueCards: [
  {
    id: "01",
    title: "Creative Vision",
    desc: "Crafting unique narratives through design."
  },
  {
    id: "02",
    title: "User-Centered",
    desc: "Prioritizing human experience above all."
  },
  {
    id: "03",
    title: "Pixel Perfect",
    desc: "Obsessing over the smallest details."
  },
  {
    id: "04",
    title: "Trend Aware",
    desc: "Staying ahead of the digital curve."
  }
],
    projects: [
      {
        id: 1,
        title: "Lumina Brand Concept",
        description: "A complete visual identity overhaul for a sustainable energy startup.",
        image: "https://picsum.photos/seed/design1/800/600",
        tags: ["Branding", "Strategy"]
      },
      {
        id: 2,
        title: "Ethereal Mobile App",
        description: "Minimalist task management UI/UX design with a focus on mindfulness.",
        image: "https://picsum.photos/seed/design2/800/600",
        tags: ["Mobile UI", "UX Case Study"]
      },
      {
        id: 3,
        title: "Abstract Art Series",
        description: "Vector exploration of geometry and color theory for digital exhibits.",
        image: "https://picsum.photos/seed/design3/800/600",
        tags: ["Illustration", "Digital Art"]
      },
      {
        id: 7,
        title: "Neon Nexus",
        description: "Future-proof gaming interface with high-contrast aesthetics.",
        image: "https://picsum.photos/seed/design4/800/600",
        tags: ["Game UI", "VFX"]
      },
      {
        id: 8,
        title: "Organic Flow",
        description: "Packaging design for premium organic skincare line.",
        image: "https://picsum.photos/seed/design5/800/600",
        tags: ["Package", "Print"]
      },
      {
        id: 9,
        title: "Minimalist Watch",
        description: "Industrial design concept for a modern wearable device.",
        image: "https://picsum.photos/seed/design6/800/600",
        tags: ["Industrial", "CAD"]
      }
    ]
    
  },
  dev: {
    subheading: "I'm a developer",
    description: "I build robust, scalable, and high-performance applications. I specialize in the modern web stack, transforming complex problems into clean, maintainable code that delivers exceptional user value.",
    skills: [
      { name: "React & Next.js", level: 95, icon: "⚛️" },
      { name: "TypeScript", level: 92, icon: "📘" },
      { name: "Tailwind CSS", level: 98, icon: "🌊" },
      { name: "Node.js", level: 85, icon: "🟢" },
      { name: "GraphQL", level: 80, icon: "🛰️" },
      { name: "Performance Optimization", level: 88, icon: "⚡" }
    ],
     valueCards: [
    { id: "01", title: "Creative Dev", desc: "Crafting unique narratives through design." },
    { id: "02", title: "User-Centered", desc: "Prioritizing human experience above all." },
    { id: "03", title: "Pixel Perfect", desc: "Obsessing over the smallest details." },
    { id: "04", title: "Trend Aware", desc: "Staying ahead of the digital curve." }
  ],
    projects: [
      {
        id: 4,
        title: "Velocity SaaS Dashboard",
        description: "Real-time data visualization platform built with React and D3.js.",
        image: "https://picsum.photos/seed/dev1/800/600",
        tags: ["React", "Analytics"]
      },
      {
        id: 5,
        title: "CodeFlow Engine",
        description: "Open-source developer tool for automating workflow transitions.",
        image: "https://picsum.photos/seed/dev2/800/600",
        tags: ["Node.js", "OSS"]
      },
      {
        id: 6,
        title: "Nexus API Gateway",
        description: "High-throughput API microservice built with Go and TypeScript.",
        image: "https://picsum.photos/seed/dev3/800/600",
        tags: ["System Architecture", "Security"]
      },
      {
        id: 10,
        title: "AuthGuardian",
        description: "A secure, decentralized authentication library for Web3 apps.",
        image: "https://picsum.photos/seed/dev4/800/600",
        tags: ["Web3", "Security"]
      },
      {
        id: 11,
        title: "StreamSync",
        description: "Low-latency video streaming protocol implementation.",
        image: "https://picsum.photos/seed/dev5/800/600",
        tags: ["WebRTC", "Go"]
      },
      {
        id: 12,
        title: "DataWave",
        description: "High-performance data scraping and analysis toolkit.",
        image: "https://picsum.photos/seed/dev6/800/600",
        tags: ["Python", "Backend"]
      }
    ]
  }
};

export const TOOLS = {
  design: [
    { name: "Figma", icon: "🎨" },
    { name: "Adobe XD", icon: "📐" },
    { name: "Photoshop", icon: "📸" },
    { name: "Illustrator", icon: "🖋️" },
    { name: "After Effects", icon: "🎬" },
    { name: "Blender", icon: "🧱" },
    { name: "Notion", icon: "📓" },
    { name: "Spline", icon: "🌐" }
  ],
  dev: [
    { name: "VS Code", icon: "💻" },
    { name: "Git", icon: "🌳" },
    { name: "Docker", icon: "🐋" },
    { name: "Postman", icon: "🚀" },
    { name: "Firebase", icon: "🔥" },
    { name: "AWS", icon: "☁️" },
    { name: "Vercel", icon: "⚡" },
    { name: "Terminal", icon: "🐚" }
  ]
};

