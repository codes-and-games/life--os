export const mockData = {
  user: {
    name: "Alex Chen",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
    currentStreak: 23,
    totalJournalEntries: 156,
    completedGoals: 47,
  },
  
  visions: [
    {
      id: 1,
      title: "Pioneer in Quantum Computing Research",
      description: "Lead groundbreaking research in quantum algorithms and hardware, contributing to the next generation of quantum computers. Establish myself as a recognized expert who bridges theoretical quantum mechanics with practical computing applications.",
      progress: 25,
      category: "Brain",
      targetDate: "2035-12-31",
      pillar: "Brain (Academics & Career)",
      milestones: [
        { text: "Complete quantum computing fundamentals", completed: true },
        { text: "Publish first research paper", completed: false },
        { text: "Join research lab", completed: false },
        { text: "Present at international conference", completed: false }
      ]
    },
    {
      id: 2,
      title: "World-Class Debater & Geopolitical Analyst",
      description: "Become an influential voice in international relations, winning major debate competitions and contributing meaningful analysis to global policy discussions. Build a reputation as someone who can articulate complex geopolitical issues with clarity and conviction.",
      progress: 35,
      category: "Voice",
      targetDate: "2030-06-30",
      pillar: "Voice (Debate & Geopolitics)",
      milestones: [
        { text: "Win regional debate championship", completed: true },
        { text: "Participate in 5 MUN conferences", completed: false },
        { text: "Build geopolitical analysis blog", completed: false },
        { text: "Establish expert network", completed: false }
      ]
    },
    {
      id: 3,
      title: "Elite Athletic Performance & Lifelong Fitness",
      description: "Achieve sub-11 second 100m sprint while maintaining peak physical condition throughout life. Become a role model for balancing intense academic pursuits with athletic excellence.",
      progress: 60,
      category: "Body",
      targetDate: "2024-12-31",
      pillar: "Body (Health & Sports)",
      milestones: [
        { text: "Break 12-second barrier", completed: true },
        { text: "Achieve consistent sub-11.5s times", completed: true },
        { text: "Run sub-11 seconds", completed: false },
        { text: "Maintain peak fitness year-round", completed: false }
      ]
    },
    {
      id: 4,
      title: "Renaissance Technologist & Lifelong Learner",
      description: "Master the intersection of science, technology, and human understanding. Create innovative tools that make complex concepts accessible, while continuously exploring the depths of finance, psychology, and spirituality.",
      progress: 40,
      category: "Soul",
      targetDate: "2040-12-31",
      pillar: "Soul (Passion & Exploration)",
      milestones: [
        { text: "Complete first major project", completed: true },
        { text: "Master 3 diverse skill areas", completed: false },
        { text: "Create educational content", completed: false },
        { text: "Achieve work-life integration", completed: false }
      ]
    },
  ],

  journalEntries: [
    {
      id: 1,
      date: "2025-01-08",
      category: "Body",
      title: "Sprint Training Breakthrough",
      content: "Incredible session today! Ran 5 × 100m sprints with times: 11.8s, 11.7s, 11.6s, 11.7s, 11.8s. The third sprint felt effortless - I think I'm finally getting the acceleration phase right. Coach noticed my start is much more explosive. The strength training is paying off. Need to focus on maintaining form in the final 20m tomorrow.",
      mood: 5,
      pillar: "Body"
    },
    {
      id: 2,
      date: "2025-01-07",
      category: "Voice",
      title: "Geopolitical Analysis: India-China Border Tensions",
      content: "Spent 2 hours analyzing the latest developments in Ladakh. India's infrastructure development strategy is fascinating - building roads not just for military access but economic integration. China's response through diplomatic channels shows restraint. This could be a great case study for the upcoming MUN on territorial disputes. Need to research historical precedents in international law.",
      mood: 4,
      pillar: "Voice"
    },
    {
      id: 3,
      date: "2025-01-06",
      category: "Brain",
      title: "Quantum Mechanics Deep Dive",
      content: "Finished Chapter 4 of Nielsen & Chuang on quantum circuits. The concept of quantum parallelism is starting to click - it's not just about superposition, but how we can design algorithms to exploit interference patterns. Started coding a simple quantum teleportation simulation in Qiskit. The math is beautiful when you see it in action.",
      mood: 5,
      pillar: "Brain"
    },
    {
      id: 4,
      date: "2025-01-05",
      category: "Soul",
      title: "PCB Design Project Progress",
      content: "Made significant progress on the quantum state visualizer hardware. Designed the analog-to-digital converter circuit for reading qubit states. The challenge is minimizing noise while maintaining precision. This project is teaching me so much about the bridge between theoretical quantum mechanics and practical engineering. Ordered components for the first prototype.",
      mood: 5,
      pillar: "Soul"
    },
    {
      id: 5,
      date: "2025-01-04",
      category: "Voice",
      title: "MUN Preparation: Climate Policy",
      content: "Researching India's position on carbon credits for the upcoming Model UN. India's argument about historical emissions vs. current development needs is compelling. The concept of 'climate justice' adds moral weight to economic arguments. Practiced my opening statement - need to work on making complex policy accessible without losing nuance.",
      mood: 4,
      pillar: "Voice"
    },
    {
      id: 6,
      date: "2025-01-03",
      category: "Soul",
      title: "Psychology Book Insights",
      content: "Finished 'Thinking, Fast and Slow' by Kahneman. The dual-process theory explains so much about decision-making in debates and research. System 1 thinking can lead to cognitive biases, but System 2 is too slow for real-time debate responses. The key is training System 1 with better heuristics through practice. This applies to sprint training too - muscle memory is System 1 for athletics.",
      mood: 4,
      pillar: "Soul"
    },
    {
      id: 7,
      date: "2025-01-02",
      category: "Brain",
      title: "Linear Algebra Applications",
      content: "Working through quantum state transformations using matrix representations. The elegance of how unitary matrices preserve quantum information is mind-blowing. Started connecting this to machine learning - both use linear transformations in high-dimensional spaces. Planning to explore quantum machine learning algorithms next week.",
      mood: 5,
      pillar: "Brain"
    },
    {
      id: 8,
      date: "2025-01-01",
      category: "Body",
      title: "New Year Training Goals",
      content: "Set ambitious but achievable targets for 2025. Current 100m time: 12.1s average. Goal: sub-11s by December. That's a 1.1s improvement - roughly 0.1s per month. Increased training to 6 days/week with dedicated sprint, strength, and recovery days. Football training twice weekly for agility and game sense. Feeling strong and motivated.",
      mood: 5,
      pillar: "Body"
    }
  ],

  goals: {
    today: [
      { id: 1, text: "Sprint training: 5 × 100m at 85% intensity, record times", completed: true, category: "Body", pillar: "Body" },
      { id: 2, text: "Read Chapter 5 of Nielsen & Chuang (Quantum Fourier Transform)", completed: false, category: "Brain", pillar: "Brain" },
      { id: 3, text: "Summarize top 3 geopolitical news stories in argument journal", completed: false, category: "Voice", pillar: "Voice" },
      { id: 4, text: "Code quantum circuit visualization for 2-qubit system", completed: false, category: "Soul", pillar: "Soul" },
      { id: 5, text: "Review and optimize PCB layout for noise reduction", completed: false, category: "Soul", pillar: "Soul" },
      { id: 6, text: "Practice debate opening statement (8 minutes)", completed: true, category: "Voice", pillar: "Voice" },
      { id: 7, text: "Complete strength training: squats, deadlifts, plyometrics", completed: false, category: "Body", pillar: "Body" },
      { id: 8, text: "Write reflection on today's quantum mechanics insights", completed: false, category: "Brain", pillar: "Brain" }
    ],
    weekly: [
      { id: 1, text: "Improve 100m sprint time by 0.1s (current: 11.7s avg)", completed: false, progress: 70, target: 1, category: "Body", pillar: "Body" },
      { id: 2, text: "Complete 3 chapters of quantum computing textbook", completed: false, progress: 66, target: 3, category: "Brain", pillar: "Brain" },
      { id: 3, text: "Research and write 2 geopolitical analysis pieces", completed: false, progress: 50, target: 2, category: "Voice", pillar: "Voice" },
      { id: 4, text: "Finish PCB design for quantum visualizer prototype", completed: false, progress: 80, target: 1, category: "Soul", pillar: "Soul" },
      { id: 5, text: "Attend 2 football training sessions", completed: false, progress: 50, target: 2, category: "Body", pillar: "Body" },
      { id: 6, text: "Practice 5 debate scenarios with timer", completed: false, progress: 40, target: 5, category: "Voice", pillar: "Voice" },
      { id: 7, text: "Read 50 pages of psychology book", completed: false, progress: 60, target: 50, category: "Soul", pillar: "Soul" }
    ],
    monthly: [
      { id: 1, text: "Achieve consistent sub-11.5s 100m sprint times", completed: false, progress: 75, target: 1, category: "Body", pillar: "Body" },
      { id: 2, text: "Apply to 2 UK university summer research programs", completed: false, progress: 30, target: 2, category: "Brain", pillar: "Brain" },
      { id: 3, text: "Register and prepare for regional MUN conference", completed: false, progress: 85, target: 1, category: "Voice", pillar: "Voice" },
      { id: 4, text: "Complete and test quantum state visualizer prototype", completed: false, progress: 60, target: 1, category: "Soul", pillar: "Soul" },
      { id: 5, text: "Finish reading 'Sapiens' and write comprehensive review", completed: false, progress: 40, target: 1, category: "Soul", pillar: "Soul" },
      { id: 6, text: "Win local debate competition or reach semifinals", completed: false, progress: 20, target: 1, category: "Voice", pillar: "Voice" },
      { id: 7, text: "Publish blog post on quantum computing for beginners", completed: false, progress: 45, target: 1, category: "Brain", pillar: "Brain" },
      { id: 8, text: "Maintain 90% workout consistency (27/30 days)", completed: false, progress: 80, target: 27, category: "Body", pillar: "Body" }
    ],
  },

  analytics: {
    weeklyProgress: [
      { name: 'Mon', Brain: 85, Voice: 70, Body: 90, Soul: 75 },
      { name: 'Tue', Brain: 90, Voice: 80, Body: 85, Soul: 80 },
      { name: 'Wed', Brain: 75, Voice: 85, Body: 95, Soul: 85 },
      { name: 'Thu', Brain: 80, Voice: 90, Body: 88, Soul: 70 },
      { name: 'Fri', Brain: 95, Voice: 75, Body: 92, Soul: 90 },
      { name: 'Sat', Brain: 70, Voice: 95, Body: 80, Soul: 95 },
      { name: 'Sun', Brain: 85, Voice: 85, Body: 85, Soul: 88 },
    ],
    monthlyStreaks: [
      { month: 'Sep', streak: 18 },
      { month: 'Oct', streak: 25 },
      { month: 'Nov', streak: 28 },
      { month: 'Dec', streak: 31 },
      { month: 'Jan', streak: 23 },
    ],
    categoryPerformance: [
      { subject: 'Brain', A: 88, fullMark: 100 },
      { subject: 'Voice', A: 82, fullMark: 100 },
      { subject: 'Body', A: 92, fullMark: 100 },
      { subject: 'Soul', A: 85, fullMark: 100 },
      { subject: 'Consistency', A: 90, fullMark: 100 },
      { subject: 'Growth', A: 87, fullMark: 100 },
    ],
    sprintTimes: [
      { week: 'Week 1', time: 12.1 },
      { week: 'Week 2', time: 12.0 },
      { week: 'Week 3', time: 11.9 },
      { week: 'Week 4', time: 11.8 },
      { week: 'Week 5', time: 11.7 },
    ],
    booksRead: [
      { month: 'Sep', books: 1 },
      { month: 'Oct', books: 1 },
      { month: 'Nov', books: 2 },
      { month: 'Dec', books: 1 },
      { month: 'Jan', books: 1 },
    ],
    debateWins: [
      { competition: 'School Debate', wins: 3, total: 4 },
      { competition: 'Inter-School', wins: 2, total: 3 },
      { competition: 'Regional MUN', wins: 1, total: 2 },
    ]
  },

  quotes: [
    {
      id: 1,
      text: "The best way to predict the future is to invent it.",
      author: "Alan Kay",
      pillar: "Brain",
      category: "Innovation"
    },
    {
      id: 2,
      text: "It is not the strongest of the species that survives, but the one most responsive to change.",
      author: "Charles Darwin",
      pillar: "Voice",
      category: "Adaptation"
    },
    {
      id: 3,
      text: "The groundwork for all happiness is good health.",
      author: "Leigh Hunt",
      pillar: "Body",
      category: "Health"
    },
    {
      id: 4,
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      pillar: "Soul",
      category: "Passion"
    },
    {
      id: 5,
      text: "Quantum mechanics is certainly imposing. But an inner voice tells me that it is not yet the real thing.",
      author: "Albert Einstein",
      pillar: "Brain",
      category: "Science"
    }
  ],

  milestones: {
    Brain: [
      { id: 1, title: "Complete JEE preparation with 99+ percentile target", completed: false, targetDate: "2025-05-31", progress: 70 },
      { id: 2, title: "Build quantum circuit simulator with visualization", completed: false, targetDate: "2025-03-31", progress: 45 },
      { id: 3, title: "Apply to UCL, Imperial, Cambridge for Computer Science", completed: false, targetDate: "2025-01-15", progress: 85 },
      { id: 4, title: "Publish research paper on quantum algorithms", completed: false, targetDate: "2026-12-31", progress: 15 }
    ],
    Voice: [
      { id: 1, title: "Win regional debate championship", completed: false, targetDate: "2025-04-30", progress: 60 },
      { id: 2, title: "Participate in 3 Model UN conferences", completed: false, targetDate: "2025-12-31", progress: 33 },
      { id: 3, title: "Build network of 50+ debate/MUN contacts", completed: false, targetDate: "2025-12-31", progress: 40 },
      { id: 4, title: "Start geopolitical analysis blog with 1000+ readers", completed: false, targetDate: "2025-08-31", progress: 20 }
    ],
    Body: [
      { id: 1, title: "Run 100m under 11 seconds", completed: false, targetDate: "2024-12-31", progress: 75 },
      { id: 2, title: "Maintain 90%+ workout consistency for 6 months", completed: false, targetDate: "2025-06-30", progress: 80 },
      { id: 3, title: "Complete first football tournament", completed: false, targetDate: "2025-03-31", progress: 50 },
      { id: 4, title: "Achieve advanced strength benchmarks", completed: false, targetDate: "2025-09-30", progress: 65 }
    ],
    Soul: [
      { id: 1, title: "Complete quantum visualizer PCB prototype", completed: false, targetDate: "2025-02-28", progress: 70 },
      { id: 2, title: "Read 12 books across finance, psychology, spirituality", completed: false, targetDate: "2025-12-31", progress: 25 },
      { id: 3, title: "Launch personal website showcasing projects", completed: false, targetDate: "2025-06-30", progress: 30 },
      { id: 4, title: "Master meditation practice (daily for 3 months)", completed: false, targetDate: "2025-04-30", progress: 40 }
    ]
  },

  currentFocus: {
    Brain: "Mastering quantum circuit design and preparing for UK university applications",
    Voice: "Developing expertise in India-China geopolitical relations for upcoming MUN",
    Body: "Intensive sprint training to break 11-second barrier by year-end",
    Soul: "Building quantum state visualizer while exploring intersection of technology and consciousness"
  },

  achievements: [
    { id: 1, title: "20-Day Workout Streak", date: "2025-01-08", pillar: "Body", icon: "🔥" },
    { id: 2, title: "First Quantum Circuit Simulation", date: "2025-01-05", pillar: "Brain", icon: "⚛️" },
    { id: 3, title: "Won School Debate Championship", date: "2024-12-15", pillar: "Voice", icon: "🏆" },
    { id: 4, title: "Completed PCB Design Course", date: "2024-12-10", pillar: "Soul", icon: "🔧" },
    { id: 5, title: "Sub-12 Second 100m Sprint", date: "2024-11-28", pillar: "Body", icon: "⚡" }
  ],
  
  timeLogs: [
    {
      id: 1,
      date: "2025-01-15",
      startTime: "09:30",
      endTime: "10:45",
      duration: 75,
      activity: "Quantum Computing Research",
      category: "Research",
      pillar: "Brain",
      notes: "Focused on understanding quantum entanglement principles"
    },
    {
      id: 2,
      date: "2025-01-15",
      startTime: "14:00",
      endTime: "15:30",
      duration: 90,
      activity: "Sprint Training",
      category: "Training",
      pillar: "Body",
      notes: "Worked on start technique and acceleration"
    },
    {
      id: 3,
      date: "2025-01-14",
      startTime: "16:00",
      endTime: "17:30",
      duration: 90,
      activity: "Debate Preparation",
      category: "Practice",
      pillar: "Voice",
      notes: "Researched counterarguments for upcoming debate"
    },
    {
      id: 4,
      date: "2025-01-14",
      startTime: "19:00",
      endTime: "20:30",
      duration: 90,
      activity: "PCB Design Project",
      category: "Project",
      pillar: "Soul",
      notes: "Working on the microcontroller section of my new design"
    },
    {
      id: 5,
      date: "2025-01-13",
      startTime: "10:00",
      endTime: "11:30",
      duration: 90,
      activity: "Advanced Mathematics",
      category: "Study",
      pillar: "Brain",
      notes: "Focused on differential equations"
    }
  ]
};
  
  timeLogs: [
    {
      id: 1,
      date: "2025-01-08",
      startTime: "08:00",
      endTime: "10:30",
      duration: 150, // in minutes
      activity: "Sprint training and strength workout",
      category: "Exercise",
      pillar: "Body",
      notes: "Focused on explosive starts and acceleration technique"
    },
    {
      id: 2,
      date: "2025-01-08",
      startTime: "11:00",
      endTime: "13:30",
      duration: 150,
      activity: "Quantum computing research",
      category: "Study",
      pillar: "Brain",
      notes: "Worked on quantum circuit simulation algorithms"
    },
    {
      id: 3,
      date: "2025-01-08",
      startTime: "14:30",
      endTime: "16:00",
      duration: 90,
      activity: "Debate preparation",
      category: "Practice",
      pillar: "Voice",
      notes: "Researched India-China border relations for upcoming MUN"
    },
    {
      id: 4,
      date: "2025-01-08",
      startTime: "17:00",
      endTime: "19:00",
      duration: 120,
      activity: "PCB design for quantum visualizer",
      category: "Project",
      pillar: "Soul",
      notes: "Completed the analog-to-digital converter circuit design"
    },
    {
      id: 5,
      date: "2025-01-07",
      startTime: "09:00",
      endTime: "11:00",
      duration: 120,
      activity: "Football practice",
      category: "Exercise",
      pillar: "Body",
      notes: "Team drills and conditioning"
    },
    {
      id: 6,
      date: "2025-01-07",
      startTime: "13:00",
      endTime: "15:30",
      duration: 150,
      activity: "Linear algebra study",
      category: "Study",
      pillar: "Brain",
      notes: "Focused on matrix transformations for quantum states"
    },
    {
      id: 7,
      date: "2025-01-07",
      startTime: "16:00",
      endTime: "18:00",
      duration: 120,
      activity: "Reading 'Thinking, Fast and Slow'",
      category: "Reading",
      pillar: "Soul",
      notes: "Chapters on cognitive biases and decision-making"
    }
  ]

