
export type AppMode = 'design' | 'dev';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}

export interface Card {
  id: string;
  title: string;
  desc: string;
}

export interface ContentData {
  subheading: string;
  description: string;
  skills: Skill[];
  projects: Project[];
  valueCards: Card[];  // ✅ ADD THIS
}


export interface ModeContent {
  design: ContentData;
  dev: ContentData;
}
