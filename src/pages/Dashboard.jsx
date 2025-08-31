import { motion } from 'framer-motion';
import { TrendingUp, Target, BookOpen, Calendar, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import AnimatedCard from '../components/AnimatedCard';
import ProgressBar from '../components/ProgressBar';
import useStore from '../store/useStore';

const Dashboard = () => {
  const { user, goals, analytics, journalEntries, achievements, currentFocus } = useStore();

  const todayCompleted = goals.today.filter(goal => goal.completed).length;
  const todayTotal = goals.today.length;
  const todayProgress = todayTotal > 0 ? (todayCompleted / todayTotal) * 100 : 0;

  const recentEntries = journalEntries.slice(0, 3);
  const recentAchievements = achievements.slice(0, 3);

  const statCards = [
    {
      icon: Award,
      title: 'Current Streak',
      value: `${user.currentStreak} days`,
      change: '+2 from yesterday',
      color: 'emerald',
    },
    {
      icon: Target,
      title: 'Today\'s Progress',
      value: `${todayCompleted}/${todayTotal}`,
      change: `${todayProgress.toFixed(0)}% complete`,
      color: 'blue',
    },
    {
      icon: BookOpen,
      title: 'Journal Entries',
      value: user.totalJournalEntries,
      change: '+3 this week',
      color: 'purple',
    },
    {
      icon: TrendingUp,
      title: 'Goals Completed',
      value: user.completedGoals,
      change: '+5 this month',
      color: 'orange',
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-dark-400 text-lg">
          You're doing amazing! Here's your life overview for today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <AnimatedCard key={stat.title} delay={index * 0.1} className="h-full">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dark-400 text-xs md:text-sm font-medium">{stat.title}</p>
                  <p className="text-xl md:text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className="text-emerald-400 text-xs mt-2">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-xl bg-${stat.color}-500/20`}>
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 text-${stat.color}-400`} />
                </div>
              </div>
            </AnimatedCard>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress */}
        <AnimatedCard delay={0.4}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-blue-400 mr-2 md:mr-3" />
            Weekly Progress
          </h3>
          <div className="h-48 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.weeklyProgress}>
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Line type="monotone" dataKey="Health" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 6 }} />
                <Line type="monotone" dataKey="Academics" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 6 }} />
                <Line type="monotone" dataKey="Passions" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 6 }} />
                <Line type="monotone" dataKey="Career" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', r: 6 }} />
                <Line type="monotone" dataKey="Relationship" stroke="#ec4899" strokeWidth={3} dot={{ fill: '#ec4899', r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </AnimatedCard>

        {/* Performance Radar */}
        <AnimatedCard delay={0.5}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Target className="w-5 h-5 md:w-6 md:h-6 text-purple-400 mr-2 md:mr-3" />
            Performance Overview
          </h3>
          <div className="h-48 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={analytics.categoryPerformance}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" className="text-dark-300 text-sm" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                <Radar dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </AnimatedCard>
      </div>

      {/* Today's Goals & Recent Journal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Goals */}
        <AnimatedCard delay={0.6}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Calendar className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 mr-2 md:mr-3" />
            Today's Goals
          </h3>
          <ProgressBar progress={todayProgress} className="mb-6" />
          <div className="space-y-3">
            {goals.today.slice(0, 4).map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className={`flex items-center space-x-3 p-3 rounded-lg ${
                  goal.completed ? 'bg-emerald-500/10' : 'bg-dark-700/30'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${
                  goal.completed ? 'bg-emerald-400' : 'bg-dark-500'
                }`} />
                <p className={`font-medium text-sm md:text-base ${
                  goal.completed ? 'text-dark-400 line-through' : 'text-white'
                }`}>
                  {goal.text}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatedCard>

        {/* Recent Journal Entries */}
        <AnimatedCard delay={0.7}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-orange-400 mr-2 md:mr-3" />
            Recent Journal Entries
          </h3>
          <div className="space-y-4">
            {recentEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="p-4 bg-dark-700/30 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-blue-400">{entry.category}</span>
                    <span className="text-xs text-dark-500">•</span>
                    <span className="text-xs font-medium text-purple-400">{entry.pillar}</span>
                  </div>
                  <span className="text-xs text-dark-400">{entry.date}</span>
                </div>
                <h4 className="font-semibold text-white mb-1 text-sm md:text-base">{entry.title}</h4>
                <p className="text-xs md:text-sm text-dark-300 line-clamp-2">{entry.content}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedCard>
      </div>

      {/* Current Focus & Recent Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Focus */}
        <AnimatedCard delay={0.8}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Target className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 mr-2 md:mr-3" />
            Current Focus Areas
          </h3>
          <div className="space-y-4">
            {Object.entries(currentFocus).map(([pillar, focus], index) => (
              <motion.div
                key={pillar}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="p-4 bg-dark-700/30 rounded-lg"
              >
                <h4 className="font-semibold text-blue-400 mb-2">{pillar}</h4>
                <p className="text-xs md:text-sm text-dark-300">{focus}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedCard>

        {/* Recent Achievements */}
        <AnimatedCard delay={0.9}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Award className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 mr-2 md:mr-3" />
            Recent Achievements
          </h3>
          <div className="space-y-4">
            {recentAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-dark-700/30 rounded-lg"
              >
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm md:text-base">{achievement.title}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-purple-400">{achievement.pillar}</span>
                    <span className="text-xs text-dark-500">•</span>
                    <span className="text-xs text-dark-400">{achievement.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default Dashboard;