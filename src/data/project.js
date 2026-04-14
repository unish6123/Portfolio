export const projects = [
  {
    id: 1,
    name: 'Social Pulse',
    category: 'AI · Data Analytics',
    description: 'The platform ingests news articles continuously, runs them through a VADER sentiment analysis pipeline, and surfaces the results on a React dashboard in real time. Five microservices, all containerized, all talking to each other — deployed on AWS EC2. When I noticed API responses were taking 500ms and making the UI feel dead, I dug into the bottleneck, implemented Redis caching with proper invalidation logic, and got it down to 5ms. PostgreSQL index tuning on the aggregation queries kept the database from becoming the next bottleneck. Automated Jest and pytest pipelines run on every commit to keep everything honest.',
    tech: ['Docker', 'NLP', 'React', 'FastAPI', 'PostgreSQL', 'Jest', 'Cypress', 'AWS'],
    github: 'https://github.com/unish6123/social-pulse',
    live: null,
    video: null,
    videoEmbed: null,
    color: '#ff6b6b',
    hasVideo: false,
    comingSoon: true,
  },
  {
    id: 2,
    name: 'StuNotes',
    category: 'EdTech · Productivity',
    description: "StuNotes is the project where I learned what it really means to own something. I designed and built a full-stack application that turns lecture transcripts into study guides and adaptive quizzes — React and TypeScript on the front, Python FastAPI and MongoDB on the back, with Gemini powering the AI layer. An NLTK preprocessing pipeline I built cut the API token cost by 40% before a single request went out. When the product direction changed mid-build and we needed stateful quiz delivery, I didn't patch around it. I redesigned the backend architecture, delivered it clean, and wrote documentation thorough enough that the system could outlive my involvement.",
    tech: ['React', 'Node.js', 'MongoDB', 'OpenAI'],
    github: 'https://github.com/unish6123/StuNotes',
    live: null,
    video: 'https://www.youtube.com/watch?v=SXV6sms9mN0',
    videoEmbed: 'https://www.youtube.com/embed/SXV6sms9mN0',
    color: '#4d96ff',
    hasVideo: true,
    comingSoon: false,
  },
  {
    id: 3,
    name: 'BookStore',
    category: 'AI · Document Processing',
    description: 'Upload any PDF book and get precise chapter-by-chapter summaries powered by AI. Makes reading long books faster and more digestible.',
    tech: ['Python', 'LangChain', 'RAG', 'FastAPI', 'React'],
    github: 'https://github.com/unish6123/Book-Store',
    live: null,
    video: null,
    videoEmbed: null,
    color: '#6bcb77',
    hasVideo: false,
    comingSoon: false,
  },
]

export const experience = [
  {
    id: 1,
    role: 'Software Engineering Intern',
    company: 'Wylight Technology',
    duration: '2024',
    color: '#ffd93d',
    description: 'Built an internal communication medium for the workplace, improving team collaboration and workflow efficiency.',
    bullets: [
      'I spent three months building a real-time platform — chat, video, file sharing — that handled over 200 concurrent users. I worked across Python and Node.js on the backend, deployed on AWS, and collaborated with the team in Agile sprints. The defining moment was tracking down a live production failure: a WebRTC signaling bottleneck that was making video calls unusable. I profiled the system, isolated the problem, and shipped a fix that cut latency by 90%. On top of that I built out automated testing across three microservices and put CI/CD gates in place that kept bugs out of production.'
    ],
    tech: ['React', 'Node.js', 'WebSocket', 'PostgreSQL'],
  },
]
