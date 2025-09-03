import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockData } from '../data/mockData';

const defaultPillars = ['Health', 'Academics', 'Passions', 'Relationship', 'Career'];

const useStore = create(
  persist(
    (set, get) => ({
      // User data
      user: {
        ...mockData.user,
        currentStreak: 0,
        lastStreakUpdate: null,
        streakHistory: [], // Array of { date: 'YYYY-MM-DD', streak: number }
        dailyCompletionHistory: [] // Array of { date: 'YYYY-MM-DD', completed: number, total: number, pillars: { pillar: { completed: number, total: number } } }
      },
      
      // Pillars
      pillars: defaultPillars,
      addPillar: (pillar) =>
        set((state) => ({
          pillars: [...state.pillars, pillar],
        })),
      updatePillar: (oldPillar, newPillar) =>
        set((state) => {
          const newPillars = state.pillars.map(p => p === oldPillar ? newPillar : p);
          
          // Update all related data
          const updatedGoals = {};
          Object.keys(state.goals).forEach(period => {
            updatedGoals[period] = state.goals[period].map(goal => ({
              ...goal,
              pillar: goal.pillar === oldPillar ? newPillar : goal.pillar
            }));
          });
          
          const updatedJournalEntries = state.journalEntries.map(entry => ({
            ...entry,
            pillar: entry.pillar === oldPillar ? newPillar : entry.pillar
          }));
          
          const updatedTimeLogs = state.timeLogs.map(log => ({
            ...log,
            pillar: log.pillar === oldPillar ? newPillar : log.pillar
          }));
          
          const updatedVisions = state.visions.map(vision => ({
            ...vision,
            pillar: vision.pillar === oldPillar ? newPillar : vision.pillar
          }));
          
          const updatedAchievements = state.achievements.map(achievement => ({
            ...achievement,
            pillar: achievement.pillar === oldPillar ? newPillar : achievement.pillar
          }));
          
          const updatedCurrentFocus = { ...state.currentFocus };
          if (updatedCurrentFocus[oldPillar]) {
            updatedCurrentFocus[newPillar] = updatedCurrentFocus[oldPillar];
            delete updatedCurrentFocus[oldPillar];
          }
          
          return {
            pillars: newPillars,
            goals: updatedGoals,
            journalEntries: updatedJournalEntries,
            timeLogs: updatedTimeLogs,
            visions: updatedVisions,
            achievements: updatedAchievements,
            currentFocus: updatedCurrentFocus,
          };
        }),
      deletePillar: (pillar) =>
        set((state) => {
          const newPillars = state.pillars.filter(p => p !== pillar);
          
          // Remove all related data for this pillar
          const updatedGoals = {};
          Object.keys(state.goals).forEach(period => {
            updatedGoals[period] = state.goals[period].filter(goal => goal.pillar !== pillar);
          });
          
          const updatedJournalEntries = state.journalEntries.filter(entry => entry.pillar !== pillar);
          const updatedTimeLogs = state.timeLogs.filter(log => log.pillar !== pillar);
          const updatedVisions = state.visions.filter(vision => vision.pillar !== pillar);
          const updatedAchievements = state.achievements.filter(achievement => achievement.pillar !== pillar);
          
          const updatedCurrentFocus = { ...state.currentFocus };
          delete updatedCurrentFocus[pillar];
          
          return {
            pillars: newPillars,
            goals: updatedGoals,
            journalEntries: updatedJournalEntries,
            timeLogs: updatedTimeLogs,
            visions: updatedVisions,
            achievements: updatedAchievements,
            currentFocus: updatedCurrentFocus,
          };
        }),
      
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
          
          let userUpdate = {};
          
          if (newCompleted && period === 'today') {
            const todayGoals = state.goals.today;
            const completedAfterThis = todayGoals.filter(g => g.completed || g.id === id).length;
            const totalToday = todayGoals.length;
            const today = new Date().toISOString().split('T')[0];
            
            // If ALL daily goals are completed, update streak
            if (totalToday > 0 && completedAfterThis === totalToday) {
              if (state.user.lastStreakUpdate !== today) {
                const newStreak = state.user.currentStreak + 1;
                userUpdate = {
                  user: {
                    ...state.user,
                    currentStreak: newStreak,
                    completedGoals: state.user.completedGoals + 1,
                    lastStreakUpdate: today,
                    streakHistory: [
                      ...state.user.streakHistory,
                      { date: today, streak: newStreak }
                    ]
                  }
                };
              }
            }
            
            // Update daily completion history
            const existingHistoryIndex = state.user.dailyCompletionHistory.findIndex(h => h.date === today);
            const pillarBreakdown = {};
            
            // Calculate completion by pillar
            state.pillars.forEach(pillar => {
              const pillarGoals = todayGoals.filter(g => g.pillar === pillar);
              const pillarCompleted = pillarGoals.filter(g => g.completed || g.id === id).length;
              pillarBreakdown[pillar] = {
                completed: pillarCompleted,
                total: pillarGoals.length
              };
            });
            
            const historyEntry = {
              date: today,
              completed: completedAfterThis,
              total: totalToday,
              pillars: pillarBreakdown
            };
            
            if (existingHistoryIndex >= 0) {
              const updatedHistory = [...state.user.dailyCompletionHistory];
              updatedHistory[existingHistoryIndex] = historyEntry;
              userUpdate = {
                ...userUpdate,
                user: {
                  ...userUpdate.user || state.user,
                  dailyCompletionHistory: updatedHistory
                }
              };
            } else {
              userUpdate = {
                ...userUpdate,
                user: {
                  ...userUpdate.user || state.user,
                  dailyCompletionHistory: [
                    ...state.user.dailyCompletionHistory,
                    historyEntry
                  ]
                }
              };
            }
          } else if (!newCompleted && period === 'today') {
            const today = new Date().toISOString().split('T')[0];
            const todayGoals = state.goals.today;
            const completedAfterThis = todayGoals.filter(g => g.completed && g.id !== id).length;
            const totalToday = todayGoals.length;
            
            // Update daily completion history
            const existingHistoryIndex = state.user.dailyCompletionHistory.findIndex(h => h.date === today);
            const pillarBreakdown = {};
            
            state.pillars.forEach(pillar => {
              const pillarGoals = todayGoals.filter(g => g.pillar === pillar);
              const pillarCompleted = pillarGoals.filter(g => g.completed && g.id !== id).length;
              pillarBreakdown[pillar] = {
                completed: pillarCompleted,
                total: pillarGoals.length
              };
            });
            
            const historyEntry = {
              date: today,
              completed: completedAfterThis,
              total: totalToday,
              pillars: pillarBreakdown
            };
            
            if (existingHistoryIndex >= 0) {
              const updatedHistory = [...state.user.dailyCompletionHistory];
              updatedHistory[existingHistoryIndex] = historyEntry;
              userUpdate = {
                user: {
                  ...state.user,
                  dailyCompletionHistory: updatedHistory
                }
              };
            }
            
            userUpdate = {
              ...userUpdate,
              user: {
                ...userUpdate.user || state.user,
                completedGoals: Math.max(0, state.user.completedGoals - 1)
              }
            };
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
      updateCurrentFocus: (pillar, focus) =>
        set((state) => ({
          currentFocus: {
            ...state.currentFocus,
            [pillar]: focus,
          },
        })),
      addCurrentFocus: (pillar, focus) =>
        set((state) => ({
          currentFocus: {
            ...state.currentFocus,
            [pillar]: focus,
          },
        })),
      deleteCurrentFocus: (pillar) =>
        set((state) => {
          const newFocus = { ...state.currentFocus };
          delete newFocus[pillar];
          return { currentFocus: newFocus };
        }),
      
      // Achievements
      achievements: mockData.achievements,
      addAchievement: (achievement) =>
        set((state) => ({
          achievements: [
            { ...achievement, id: Date.now() },
            ...state.achievements,
          ],
        })),
      updateAchievement: (id, updates) =>
        set((state) => ({
          achievements: state.achievements.map((achievement) =>
            achievement.id === id ? { ...achievement, ...updates } : achievement
          ),
        })),
      deleteAchievement: (id) =>
        set((state) => ({
          achievements: state.achievements.filter((achievement) => achievement.id !== id),
        })),
      
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
      
      
      // Calculate real-time analytics
      getAnalytics: () => {
        const state = get();
        const today = new Date();
        const last7Days = [];
        const last5Months = [];
        
        // Generate last 7 days
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          last7Days.push(date.toISOString().split('T')[0]);
        }
        
        // Generate last 5 months
        for (let i = 4; i >= 0; i--) {
          const date = new Date(today);
          date.setMonth(date.getMonth() - i);
          last5Months.push({
            month: date.toLocaleDateString('en-US', { month: 'short' }),
            date: date.toISOString().split('T')[0].substring(0, 7) // YYYY-MM format
          });
        }
        
        // Calculate weekly progress based on actual daily completion history
        const weeklyProgress = last7Days.map((dateStr, index) => {
          const date = new Date(dateStr);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          
          const historyEntry = state.user.dailyCompletionHistory.find(h => h.date === dateStr);
          const dayData = { name: dayName };
          
          if (historyEntry && historyEntry.pillars) {
            state.pillars.forEach(pillar => {
              const pillarData = historyEntry.pillars[pillar];
              if (pillarData && pillarData.total > 0) {
                dayData[pillar] = Math.round((pillarData.completed / pillarData.total) * 100);
              } else {
                dayData[pillar] = 0;
              }
            });
          } else {
            // No data for this day
            state.pillars.forEach(pillar => {
              dayData[pillar] = 0;
            });
          }
          
          return dayData;
        });
        
        // Calculate category performance based on goal completion rates
        const categoryPerformance = state.pillars.map(pillar => {
          // Get all goals for this pillar
          const allGoals = [
            ...state.goals.today.filter(g => g.pillar === pillar),
            ...state.goals.weekly.filter(g => g.pillar === pillar),
            ...state.goals.monthly.filter(g => g.pillar === pillar)
          ];
          
          const completedGoals = allGoals.filter(g => g.completed);
          const completionRate = allGoals.length > 0 ? (completedGoals.length / allGoals.length) * 100 : 0;
          
          // Factor in time logs for this pillar
          const pillarTimeLogs = state.timeLogs.filter(log => log.pillar === pillar);
          const totalTimeForPillar = pillarTimeLogs.reduce((sum, log) => sum + log.duration, 0);
          const timeScore = Math.min(100, (totalTimeForPillar / 300) * 100); // 5 hours = 100 points
          
          // Combine completion rate (60%) and time investment (40%)
          const overallScore = Math.round((completionRate * 0.6) + (timeScore * 0.4));
          
          return {
            subject: pillar,
            A: Math.min(100, overallScore),
            fullMark: 100
          };
        });
        
        // Calculate monthly streaks based on actual streak history
        const monthlyStreaks = last5Months.map(({ month, date }) => {
          // Find the highest streak in that month
          const monthStreaks = state.user.streakHistory.filter(s => s.date.startsWith(date));
          const maxStreak = monthStreaks.length > 0 
            ? Math.max(...monthStreaks.map(s => s.streak))
            : 0;
          
          return {
            month,
            streak: maxStreak
          };
        });
        
        // Time distribution data (real-time from time logs)
        const timeByPillar = {};
        const timeByCategory = {};
        
        state.timeLogs.forEach(log => {
          // By pillar
          if (!timeByPillar[log.pillar]) {
            timeByPillar[log.pillar] = 0;
          }
          timeByPillar[log.pillar] += log.duration;
          
          // By category
          if (!timeByCategory[log.category]) {
            timeByCategory[log.category] = 0;
          }
          timeByCategory[log.category] += log.duration;
        });
        
        const pillarColorMap = {
          Health: '#10b981',
          Academics: '#3b82f6',
          Passions: '#8b5cf6',
          Relationship: '#ec4899',
          Career: '#f59e0b'
        };
        
        const defaultColors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899', '#6366f1', '#06b6d4', '#14b8a6'];
        
        const timeDistributionByPillar = Object.entries(timeByPillar).map(([name, value], index) => ({
          name,
          value,
          color: pillarColorMap[name] || defaultColors[index % defaultColors.length]
        }));
        
        const timeDistributionByCategory = Object.entries(timeByCategory).map(([name, value], index) => ({
          name,
          value,
          color: defaultColors[index % defaultColors.length]
        }));
        
        return {
          weeklyProgress,
          categoryPerformance,
          monthlyStreaks,
          timeDistributionByPillar,
          timeDistributionByCategory,
          totalTimeLogged: Object.values(timeByPillar).reduce((sum, time) => sum + time, 0),
          totalActivities: state.timeLogs.length
        };
      },
      
      // Update streak tracking
      updateStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const state = get();
        const newStreak = state.user.currentStreak + 1;
        
        set({
          user: { 
            ...state.user, 
            currentStreak: newStreak,
            lastStreakUpdate: today,
            streakHistory: [
              ...state.user.streakHistory,
              { date: today, streak: newStreak }
            ]
          },
        });
      },
      
      // Reset streak
      resetStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        set((state) => ({
          user: {
            ...state.user,
            currentStreak: 0,
            lastStreakUpdate: today,
            streakHistory: [
              ...state.user.streakHistory,
              { date: today, streak: 0 }
            ]
          }
        }));
      },
      
      // Check daily goal completion and update streak
      checkDailyCompletion: () => {
        const state = get();
        const today = new Date().toISOString().split('T')[0];
        const todayGoals = state.goals.today;
        const completedToday = todayGoals.filter(goal => goal.completed).length;
        const totalToday = todayGoals.length;
        
        // Update daily completion history
        const pillarBreakdown = {};
        state.pillars.forEach(pillar => {
          const pillarGoals = todayGoals.filter(g => g.pillar === pillar);
          const pillarCompleted = pillarGoals.filter(g => g.completed).length;
          pillarBreakdown[pillar] = {
            completed: pillarCompleted,
            total: pillarGoals.length
          };
        });
        
        const historyEntry = {
          date: today,
          completed: completedToday,
          total: totalToday,
          pillars: pillarBreakdown
        };
        
        const existingHistoryIndex = state.user.dailyCompletionHistory.findIndex(h => h.date === today);
        let updatedHistory;
        
        if (existingHistoryIndex >= 0) {
          updatedHistory = [...state.user.dailyCompletionHistory];
          updatedHistory[existingHistoryIndex] = historyEntry;
        } else {
          updatedHistory = [...state.user.dailyCompletionHistory, historyEntry];
        }
        
        // Check if ALL daily goals are completed for streak update
        if (totalToday > 0 && completedToday === totalToday && state.user.lastStreakUpdate !== today) {
          const newStreak = state.user.currentStreak + 1;
          set({
            user: {
              ...state.user,
              currentStreak: newStreak,
              lastStreakUpdate: today,
              dailyCompletionHistory: updatedHistory,
              streakHistory: [
                ...state.user.streakHistory,
                { date: today, streak: newStreak }
              ]
            }
          });
        } else {
          set({
            user: {
              ...state.user,
              dailyCompletionHistory: updatedHistory
            }
          });
    }),
    {
      name: 'life-os-storage',
    }
  )
);

export default useStore;