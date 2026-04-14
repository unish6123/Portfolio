export const skillTree = {
  center: { name: 'Unish', subtitle: 'Full-Stack Dev' },
  categories: [
    {
      name: 'Frontend',
      color: '#61dafb',
      angle: 0,
      skills: [
        { name: 'React',      color: '#61dafb', proficiency: 92, icon: 'react' },
        { name: 'Next.js',    color: '#e8e8f0', proficiency: 84, icon: 'nextdotjs' },
        { name: 'Angular',    color: '#f87171', proficiency: 75, icon: 'angular' },
        { name: 'Vue',        color: '#6ee7b7', proficiency: 72, icon: 'vuedotjs' },
        { name: 'TypeScript', color: '#93c5fd', proficiency: 85, icon: 'typescript' },
        { name: 'Tailwind',   color: '#7dd3fc', proficiency: 88, icon: 'tailwindcss' },
      ]
    },
    {
      name: 'Backend',
      color: '#90d67a',
      angle: Math.PI / 2,
      skills: [
        { name: 'Node.js',  color: '#90d67a', proficiency: 88, icon: 'nodedotjs' },
        { name: 'Python',   color: '#fcd97a', proficiency: 85, icon: 'python' },
        { name: 'Django',   color: '#6edcb4', proficiency: 78, icon: 'django' },
        { name: 'Flask',    color: '#e8e8f0', proficiency: 76, icon: 'flask' },
        { name: 'Java',     color: '#fcd27a', proficiency: 70, icon: 'java' },
        
      ]
    },
    {
      name: 'DevOps & DB',
      color: '#c4b5fd',
      angle: Math.PI,
      skills: [
        { name: 'Docker',      color: '#7ec8f7', proficiency: 78, icon: 'docker' },
        { name: 'GitHub',      color: '#e8e8f0', proficiency: 90, icon: 'github' },
        { name: 'MongoDB',     color: '#86e08f', proficiency: 82, icon: 'mongodb' },
        { name: 'PostgreSQL',  color: '#bfd8ee', proficiency: 87, icon: 'postgresql' },
        { name: 'AWS',  color: '#bfd8ee', proficiency: 87, icon: 'AWS' },
      ]
    },
    {
      name: 'Data & AI',
      color: '#fde68a',
      angle: Math.PI * 1.5,
      skills: [
        { name: 'PowerBI',     color: '#fde68a', proficiency: 80, icon: 'powerbi' },
        { name: 'Tableau',     color: '#fdba74', proficiency: 75, icon: 'tableau' },
        { name: 'Excel',       color: '#6ee7a0', proficiency: 85, icon: 'microsoftexcel' },
        { name: 'HuggingFace', color: '#fcd27a', proficiency: 72, icon: 'huggingface' },
        { name: 'RAG',         color: '#c4b5fd', proficiency: 70, icon: 'openai' },
      ]
    },
  ]
}