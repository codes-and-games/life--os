import { create } from 'zustand';

const useStore = create((set, get) => ({
  // User profile
  user: {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  },

  // Vision and goals
  vision: {
    statement: 'To become a well-rounded individual who makes a positive impact on the world through continuous learning, meaningful relationships, and purposeful work.',
    pillars: [
      {
        id: 1,
        name: 'Health & Wellness',
        description: 'Maintain physical and mental well-being',
        color: '#10B981',
      },
      {
        id: 2,
        name: 'Career Growth',
        description: 'Advance professionally and develop skills',
        color: '#3B82F6',
      },
      {
        id: 3,
        name: 'Relationships',
        description: 'Build and nurture meaningful connections',
        color: '#F59E0B',
      },
      {
        id: 4,
        name: 'Personal Development',
        description: 'Continuous learning and self-improvement',
        color: '#8B5CF6',
      },
    ],
  },

  // Goals and focus areas
  goals: [],
  focusAreas: [],

  // Achievements
  achievements: [],

  // Time logs
  timeLogs: [],

  // Journal entries
  journalEntries: [],

  // Todos
  todos: [],

  // Actions
  updateUser: (userData) => set((state) => ({
    user: { ...state.user, ...userData }
  })),

  updateVision: (visionData) => set((state) => ({
    vision: { ...state.vision, ...visionData }
  })),

  addGoal: (goal) => set((state) => ({
    goals: [...state.goals, { ...goal, id: Date.now() }]
  })),

  updateGoal: (id, updates) => set((state) => ({
    goals: state.goals.map(goal => 
      goal.id === id ? { ...goal, ...updates } : goal
    )
  })),

  deleteGoal: (id) => set((state) => ({
    goals: state.goals.filter(goal => goal.id !== id)
  })),

  addFocusArea: (focusArea) => set((state) => ({
    focusAreas: [...state.focusAreas, { ...focusArea, id: Date.now() }]
  })),

  updateFocusArea: (id, updates) => set((state) => ({
    focusAreas: state.focusAreas.map(area => 
      area.id === id ? { ...area, ...updates } : area
    )
  })),

  deleteFocusArea: (id) => set((state) => ({
    focusAreas: state.focusAreas.filter(area => area.id !== id)
  })),

  addAchievement: (achievement) => set((state) => ({
    achievements: [...state.achievements, { ...achievement, id: Date.now() }]
  })),

  updateAchievement: (id, updates) => set((state) => ({
    achievements: state.achievements.map(achievement => 
      achievement.id === id ? { ...achievement, ...updates } : achievement
    )
  })),

  deleteAchievement: (id) => set((state) => ({
    achievements: state.achievements.filter(achievement => achievement.id !== id)
  })),

  addTimeLog: (timeLog) => set((state) => ({
    timeLogs: [...state.timeLogs, { ...timeLog, id: Date.now() }]
  })),

  updateTimeLog: (id, updates) => set((state) => ({
    timeLogs: state.timeLogs.map(log => 
      log.id === id ? { ...log, ...updates } : log
    )
  })),

  deleteTimeLog: (id) => set((state) => ({
    timeLogs: state.timeLogs.filter(log => log.id !== id)
  })),

  addJournalEntry: (entry) => set((state) => ({
    journalEntries: [...state.journalEntries, { ...entry, id: Date.now() }]
  })),

  updateJournalEntry: (id, updates) => set((state) => ({
    journalEntries: state.journalEntries.map(entry => 
      entry.id === id ? { ...entry, ...updates } : entry
    )
  })),

  deleteJournalEntry: (id) => set((state) => ({
    journalEntries: state.journalEntries.filter(entry => entry.id !== id)
  })),

  addTodo: (todo) => set((state) => ({
    todos: [...state.todos, { ...todo, id: Date.now(), completed: false }]
  })),

  updateTodo: (id, updates) => set((state) => ({
    todos: state.todos.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    )
  })),

  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter(todo => todo.id !== id)
  })),

  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  })),
}));

export default useStore;