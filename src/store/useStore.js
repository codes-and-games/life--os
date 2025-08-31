import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockData } from '../data/mockData';

const useStore = create(
  persist(
    (set, get) => ({
      // User data
      user: mockData.user,
      
      // Visions
      visions: mockData.visions,
      addVision: (vision) =>
        set((state) => ({
          visions: [
            ...state.visions,
            { ...vision, id: Date.now(), milestones: vision.milestones || [] },
          ],
        })),
      updateVision: (id, updates) =>
        set((state) => ({
          visions: state.visions.map((vision) =>
            vision.id === id ? { ...vision, ...updates } : vision
          ),
        })),
      deleteVision: (id) =>
        set((state) => ({
          visions: state.visions.filter((vision) => vision.id !== id),
        })),
      
      // Journal entries
      journalEntries: mockData.journalEntries,
      addJournalEntry: (entry) =>
        set((state) => ({
          journalEntries: [
            { ...entry, id: Date.now(), date: new Date().toISOString().split('T')[0] },
            ...state.journalEntries,
          ],
        })),
      updateJournalEntry: (id, updates) =>
        set((state) => ({
          journalEntries: state.journalEntries.map((entry) =>
            entry.id === id ? { ...entry, ...updates } : entry
          ),
        })),
      deleteJournalEntry: (id) =>
        set((state) => ({
          journalEntries: state.journalEntries.filter((entry) => entry.id !== id),
        })),
      
      // Goals
      goals: mockData.goals,
      addGoal: (period, goal) =>
        set((state) => ({
          goals: {
            ...state.goals,
            [period]: [
              ...state.goals[period],
              { ...goal, id: Date.now(), completed: false, subgoals: [] },
            ],
          },
        })),
      toggleGoal: (period, id) =>
        set((state) => {
          const goal = state.goals[period].find(g => g.id === id);
          const newCompleted = !goal.completed;
          
          // Only update streak if the goal is being completed (not uncompleted)
          let userUpdate = {};
          if (newCompleted) {
            userUpdate = {
              user: {
                ...state.user,
                currentStreak: state.user.currentStreak + 1,
                completedGoals: state.user.completedGoals + 1
              }
            };
            
            // Prompt for time logging would be implemented here
            // This would typically be handled in the UI component
          }
          
          return {
            ...userUpdate,
            goals: {
              ...state.goals,
              [period]: state.goals[period].map((goal) =>
                goal.id === id ? { ...goal, completed: newCompleted } : goal
              ),
            },
          };
        }),
      updateGoal: (period, id, updates) =>
        set((state) => ({
          goals: {
            ...state.goals,
            [period]: state.goals[period].map((goal) =>
              goal.id === id ? { ...goal, ...updates } : goal
            ),
          },
        })),
      deleteGoal: (period, id) =>
        set((state) => ({
          goals: {
            ...state.goals,
            [period]: state.goals[period].filter((goal) => goal.id !== id),
          },
        })),
      // Add subgoal to a goal
      addSubgoal: (period, goalId, subgoal) =>
        set((state) => ({
          goals: {
            ...state.goals,
            [period]: state.goals[period].map((goal) =>
              goal.id === goalId
                ? {
                    ...goal,
                    subgoals: [
                      ...(goal.subgoals || []),
                      { ...subgoal, id: Date.now(), completed: false },
                    ],
                  }
                : goal
            ),
          },
        })),
      // Toggle subgoal completion status
      toggleSubgoal: (period, goalId, subgoalId) =>
        set((state) => {
          const goal = state.goals[period].find(g => g.id === goalId);
          const subgoal = goal.subgoals.find(sg => sg.id === subgoalId);
          const newCompleted = !subgoal.completed;
          
          // Calculate new progress based on completed subgoals
          const updatedSubgoals = goal.subgoals.map(sg => 
            sg.id === subgoalId ? { ...sg, completed: newCompleted } : sg
          );
          
          const completedSubgoals = updatedSubgoals.filter(sg => sg.completed).length;
          const totalSubgoals = updatedSubgoals.length;
          const progress = totalSubgoals > 0 ? Math.round((completedSubgoals / totalSubgoals) * 100) : 0;
          
          return {
            goals: {
              ...state.goals,
              [period]: state.goals[period].map((g) =>
                g.id === goalId
                  ? {
                      ...g,
                      subgoals: updatedSubgoals,
                      progress: progress
                    }
                  : g
              ),
            },
          };
        }),
      // Delete a subgoal
      deleteSubgoal: (period, goalId, subgoalId) =>
        set((state) => ({
          goals: {
            ...state.goals,
            [period]: state.goals[period].map((goal) =>
              goal.id === goalId
                ? {
                    ...goal,
                    subgoals: (goal.subgoals || []).filter(
                      (subgoal) => subgoal.id !== subgoalId
                    ),
                  }
                : goal
            ),
          },
        })),
      
      // Analytics
      analytics: mockData.analytics,
      
      // Quotes
      quotes: mockData.quotes,
      
      // Milestones
      milestones: mockData.milestones,
      
      // Current Focus
      currentFocus: mockData.currentFocus,
      
      // Achievements
      achievements: mockData.achievements,
      
      // Time Logs
      timeLogs: mockData.timeLogs || [],


      addTimeLog: (timeLog) =>
        set((state) => ({
          timeLogs: [
            { ...timeLog, id: Date.now() },
            ...state.timeLogs,
          ],
        })),
      updateTimeLog: (id, updates) =>
        set((state) => ({
          timeLogs: state.timeLogs.map((log) =>
            log.id === id ? { ...log, ...updates } : log
          ),
        })),
      deleteTimeLog: (id) =>
        set((state) => ({
          timeLogs: state.timeLogs.filter((log) => log.id !== id),
        })),
      
      // UI State
      sidebarCollapsed: false,
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      
      // Update user stats and streak
      updateStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        set((state) => ({
          user: { 
            ...state.user, 
            currentStreak: state.user.currentStreak + 1,
            lastStreakUpdate: today
          },
        }));
      },
      
      // Check and update streak based on goal completion
      checkStreakUpdate: () => {
        const today = new Date().toISOString().split('T')[0];
        const state = get();
        
        if (state.user.lastStreakUpdate !== today) {
          const todayGoals = state.goals.today;
          const completedToday = todayGoals.filter(goal => goal.completed).length;
          const totalToday = todayGoals.length;
          
          // Update streak if at least 70% of today's goals are completed
          if (totalToday > 0 && (completedToday / totalToday) >= 0.7) {
            state.updateStreak();
          }
        }
      },
    }),
    {
      name: 'life-os-storage',
    }
  )
);

export default useStore;