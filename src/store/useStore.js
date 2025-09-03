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
        currentStreak: 0, // Start with 0 streak
        lastStreakUpdate: null,
        streakHistory: [], // Track daily streak updates
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
          
          const updatedGoals = {
            ...state.goals,
            [period]: state.goals[period].map((goal) =>
              goal.id === id ? { ...goal, completed: newCompleted } : goal
            ),
          };
          
          // Update user stats
          let userUpdate = { ...state.user };
          if (newCompleted) {
            userUpdate.completedGoals = state.user.completedGoals + 1;
          } else {
            userUpdate.completedGoals = Math.max(0, state.user.completedGoals - 1);
          }
          
          return {
            goals: updatedGoals,
            user: userUpdate,
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
      
      // Check daily completion and update streak
      checkDailyCompletion: () => {
        const state = get();
        const today = new Date().toISOString().split('T')[0];
        
        // Only update once per day
        if (state.user.lastStreakUpdate === today) {
          return;
        }
        
        const todayGoals = state.goals.today || [];
        const completedToday = todayGoals.filter(goal => goal.completed).length;
        const totalToday = todayGoals.length;
        
        // Update streak if all daily goals are completed
        if (totalToday > 0 && completedToday === totalToday) {
          set((prevState) => ({
            user: {
              ...prevState.user,
              currentStreak: prevState.user.currentStreak + 1,
              lastStreakUpdate: today,
              streakHistory: [
                ...prevState.user.streakHistory,
                { date: today, completed: true, goalsCompleted: completedToday, totalGoals: totalToday }
              ]
            }
          }));
        }
      },
      
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
      
      // Calculate real-time analytics based on actual data
      getAnalytics: () => {
        const state = get();
        
        // Get last 7 days for weekly progress
        const getLast7Days = () => {
          const days = [];
          for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push({
              date: date.toISOString().split('T')[0],
              name: date.toLocaleDateString('en-US', { weekday: 'short' })
            });
          }
          return days;
        };
        
        // Calculate weekly progress based on actual goal completion and time logs
        const weeklyProgress = getLast7Days().map(day => {
          const dayData = { name: day.name };
          
          state.pillars.forEach(pillar => {
            // Get goals for this pillar on this day (using today's goals as proxy)
            const pillarGoals = state.goals.today.filter(g => g.pillar === pillar);
            const completedPillarGoals = pillarGoals.filter(g => g.completed);
            const goalCompletionRate = pillarGoals.length > 0 ? (completedPillarGoals.length / pillarGoals.length) * 100 : 0;
            
            // Get time logs for this pillar on this day
            const dayTimeLogs = state.timeLogs.filter(log => log.date === day.date && log.pillar === pillar);
            const totalTimeForDay = dayTimeLogs.reduce((sum, log) => sum + log.duration, 0);
            const timeScore = Math.min(100, (totalTimeForDay / 120) * 100); // 2 hours = 100%
            
            // Combine goal completion and time investment (70% goals, 30% time)
            const combinedScore = Math.round((goalCompletionRate * 0.7) + (timeScore * 0.3));
            dayData[pillar] = combinedScore;
          });
          
          return dayData;
        });
        
        // Calculate category performance based on real data
        const categoryPerformance = state.pillars.map(pillar => {
          // Goal completion rate across all periods
          const allGoals = Object.values(state.goals).flat().filter(g => g.pillar === pillar);
          const completedGoals = allGoals.filter(g => g.completed);
          const goalCompletionRate = allGoals.length > 0 ? (completedGoals.length / allGoals.length) * 100 : 0;
          
          // Time investment score
          const pillarTimeLogs = state.timeLogs.filter(log => log.pillar === pillar);
          const totalTime = pillarTimeLogs.reduce((sum, log) => sum + log.duration, 0);
          const timeScore = Math.min(100, (totalTime / 600) * 100); // 10 hours = 100%
          
          // Journal engagement score
          const pillarJournalEntries = state.journalEntries.filter(entry => entry.pillar === pillar);
          const journalScore = Math.min(100, pillarJournalEntries.length * 10); // 10 entries = 100%
          
          // Combined score (50% goals, 30% time, 20% journal)
          const overallScore = Math.round(
            (goalCompletionRate * 0.5) + 
            (timeScore * 0.3) + 
            (journalScore * 0.2)
          );
          
          return {
            subject: pillar,
            A: Math.min(100, overallScore),
            fullMark: 100
          };
        });
        
        // Calculate monthly streaks based on streak history
        const getMonthlyStreaks = () => {
          const months = [];
          for (let i = 4; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const monthName = date.toLocaleDateString('en-US', { month: 'short' });
            
            // Calculate streak for this month based on history
            let monthStreak = 0;
            if (i === 0) {
              // Current month - use current streak
              monthStreak = state.user.currentStreak;
            } else {
              // Previous months - simulate based on achievements and goals
              const monthAchievements = state.achievements.filter(achievement => {
                const achievementDate = new Date(achievement.date);
                return achievementDate.getMonth() === date.getMonth() && 
                       achievementDate.getFullYear() === date.getFullYear();
              });
              monthStreak = Math.min(31, monthAchievements.length * 3); // Estimate based on achievements
            }
            
            months.push({ month: monthName, streak: monthStreak });
          }
          return months;
        };
        
        // Calculate time distribution by pillar
        const timeDistributionByPillar = state.pillars.map(pillar => {
          const pillarTimeLogs = state.timeLogs.filter(log => log.pillar === pillar);
          const totalTime = pillarTimeLogs.reduce((sum, log) => sum + log.duration, 0);
          return {
            name: pillar,
            value: totalTime,
            percentage: 0 // Will be calculated below
          };
        });
        
        // Calculate percentages
        const totalLoggedTime = timeDistributionByPillar.reduce((sum, item) => sum + item.value, 0);
        timeDistributionByPillar.forEach(item => {
          item.percentage = totalLoggedTime > 0 ? Math.round((item.value / totalLoggedTime) * 100) : 0;
        });
        
        // Calculate time distribution by category
        const timeDistributionByCategory = {};
        state.timeLogs.forEach(log => {
          if (!timeDistributionByCategory[log.category]) {
            timeDistributionByCategory[log.category] = 0;
          }
          timeDistributionByCategory[log.category] += log.duration;
        });
        
        const categoryDistribution = Object.entries(timeDistributionByCategory).map(([name, value]) => ({
          name,
          value: totalLoggedTime > 0 ? Math.round((value / totalLoggedTime) * 100) : 0,
          totalTime: value
        }));
        
        return {
          weeklyProgress,
          categoryPerformance,
          monthlyStreaks: getMonthlyStreaks(),
          timeDistributionByPillar,
          timeDistributionByCategory: categoryDistribution,
          totalTimeLogged: totalLoggedTime,
          // Additional productivity metrics
          productivityMetrics: {
            averageSessionLength: state.timeLogs.length > 0 ? 
              Math.round(totalLoggedTime / state.timeLogs.length) : 0,
            mostProductivePillar: timeDistributionByPillar.length > 0 ? 
              timeDistributionByPillar.reduce((prev, current) => 
                prev.value > current.value ? prev : current
              ).name : 'None',
            totalSessions: state.timeLogs.length,
            goalCompletionRate: (() => {
              const allGoals = Object.values(state.goals).flat();
              const completedGoals = allGoals.filter(g => g.completed);
              return allGoals.length > 0 ? Math.round((completedGoals.length / allGoals.length) * 100) : 0;
            })(),
          }
        };
      },
    }),
    {
      name: 'life-os-storage',
    }
  )
);

export default useStore;