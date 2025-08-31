import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend } from 'recharts';
import { TrendingUp, Calendar, Award, Target, Activity, Brain } from 'lucide-react';
import AnimatedCard from '../components/AnimatedCard';
import useStore from '../store/useStore';

const Insights = () => {
  const { user, goals, timeLogs, journalEntries, getAnalytics } = useStore();
  
  const analytics = getAnalytics();

  const completionData = [
    { name: 'Today', completed: goals.today.filter(g => g.completed).length, total: goals.today.length },
    { name: 'Weekly', completed: goals.weekly.filter(g => g.completed).length, total: goals.weekly.length },
    { name: 'Monthly', completed: goals.monthly.filter(g => g.completed).length, total: goals.monthly.length },
  ];

  // Calculate time log insights
  const timeLogInsights = timeLogs.reduce((acc, log) => {
    if (!acc[log.pillar]) {
      acc[log.pillar] = { totalTime: 0, activities: 0 };
    }
    acc[log.pillar].totalTime += log.duration;
    acc[log.pillar].activities += 1;
    return acc;
  }, {});

  // Calculate productivity metrics
  const totalGoalsCompleted = Object.values(goals).flat().filter(g => g.completed).length;
  const totalTimeLogged = timeLogs.reduce((sum, log) => sum + log.duration, 0);
  const journalEntriesThisWeek = journalEntries.filter(entry => {
    const entryDate = new Date(entry.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return entryDate >= weekAgo;
  }).length;

  // Most productive pillar
  const mostProductivePillar = Object.entries(timeLogInsights)
    .sort((a, b) => b[1].totalTime - a[1].totalTime)[0]?.[0] || 'N/A';

  const { pillars } = useStore();
  
  const pillarColorMap = {
    Health: '#10b981',
    Academics: '#3b82f6',
    Passions: '#8b5cf6',
    Relationship: '#ec4899',
    Career: '#f59e0b'
  };
  
  const defaultColors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899', '#6366f1', '#06b6d4', '#14b8a6'];
  
  const categoryDistribution = pillars.map((pillar, index) => ({
    name: pillar,
    value: timeLogInsights[pillar] ? Math.round((timeLogInsights[pillar].totalTime / totalTimeLogged) * 100) : 0,
    color: pillarColorMap[pillar] || defaultColors[index % defaultColors.length]
  }));

  // Helper function to get the appropriate background color class
  const getBgColorClass = (color) => {
    switch(color) {
      case 'blue': return 'bg-blue-500/20';
      case 'emerald': return 'bg-emerald-500/20';
      case 'purple': return 'bg-purple-500/20';
      case 'orange': return 'bg-orange-500/20';
      default: return 'bg-blue-500/20';
    }
  };

  // Helper function to get the appropriate text color class
  const getTextColorClass = (color) => {
    switch(color) {
      case 'blue': return 'text-blue-400';
      case 'emerald': return 'text-emerald-400';
      case 'purple': return 'text-purple-400';
      case 'orange': return 'text-orange-400';
      default: return 'text-blue-400';
    }
  };

  const insights = [
    {
      icon: TrendingUp,
      title: 'Total Time Logged',
      description: `${Math.floor(totalTimeLogged / 60)}h ${totalTimeLogged % 60}m tracked this period`,
      trend: `${timeLogs.length} activities`,
      color: 'blue',
    },
    {
      icon: Award,
      title: 'Goals Completed',
      description: `${totalGoalsCompleted} goals accomplished across all timeframes`,
      trend: `${user.currentStreak} day streak`,
      color: 'emerald',
    },
    {
      icon: Target,
      title: 'Most Productive Area',
      description: `${mostProductivePillar} pillar shows highest activity`,
      trend: timeLogInsights[mostProductivePillar] ? `${Math.floor(timeLogInsights[mostProductivePillar].totalTime / 60)}h logged` : '0h',
      color: 'purple',
    },
    {
      icon: Brain,
      title: 'Journal Consistency',
      description: `${journalEntriesThisWeek} entries written this week`,
      trend: `${journalEntries.length} total entries`,
      color: 'orange',
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 md:mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center">
          <Activity className="w-8 h-8 md:w-10 md:h-10 text-purple-400 mr-2 md:mr-4" />
          Insights & Analytics
        </h1>
        <p className="text-dark-400 text-base md:text-lg">
          Understand your patterns, track your progress, and optimize your performance.
        </p>
      </motion.div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <AnimatedCard key={insight.title} delay={index * 0.1} className="h-full">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl ${getBgColorClass(insight.color)} flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${getTextColorClass(insight.color)}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1 text-sm md:text-base">{insight.title}</h3>
                  <p className="text-dark-300 text-xs md:text-sm mb-2">{insight.description}</p>
                  <span className="text-emerald-400 text-xs md:text-sm font-medium">{insight.trend}</span>
                </div>
              </div>
            </AnimatedCard>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Weekly Progress Trend */}
        <AnimatedCard delay={0.4}>
          <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-blue-400 mr-2 md:mr-3" />
            Weekly Progress Trend
          </h3>
          <div className="h-60 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.weeklyProgress}>
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                <Legend />
                <Line type="monotone" dataKey="Health" stroke="#10b981" strokeWidth={3} name="Health" />
                <Line type="monotone" dataKey="Academics" stroke="#3b82f6" strokeWidth={3} name="Academics" />
                <Line type="monotone" dataKey="Passions" stroke="#8b5cf6" strokeWidth={3} name="Passions" />
                <Line type="monotone" dataKey="Relationship" stroke="#ec4899" strokeWidth={3} name="Relationship" />
                <Line type="monotone" dataKey="Career" stroke="#f59e0b" strokeWidth={3} name="Career" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-xs md:text-sm text-dark-300">Health</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs md:text-sm text-dark-300">Academics</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-xs md:text-sm text-dark-300">Passions</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
              <span className="text-xs md:text-sm text-dark-300">Relationship</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-xs md:text-sm text-dark-300">Career</span>
            </div>
          </div>
        </AnimatedCard>

        {/* Monthly Streak Progress */}
        <AnimatedCard delay={0.5}>
          <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center">
            <Award className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 mr-2 md:mr-3" />
            Monthly Streak Progress
          </h3>
          <div className="h-60 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.monthlyStreaks}>
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                <Bar dataKey="streak" fill="url(#streakGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="streakGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AnimatedCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Performance Radar */}
        <AnimatedCard delay={0.6}>
          <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center">
            <Target className="w-5 h-5 md:w-6 md:h-6 text-purple-400 mr-2 md:mr-3" />
            Performance Radar
          </h3>
          <div className="h-60 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={analytics.categoryPerformance}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" className="text-dark-300 text-sm" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                <Radar dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} strokeWidth={3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </AnimatedCard>

        {/* Goal Completion Rate */}
        <AnimatedCard delay={0.7}>
          <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center">
            <Calendar className="w-5 h-5 md:w-6 md:h-6 text-orange-400 mr-2 md:mr-3" />
            Goal Completion Rate
          </h3>
          <div className="h-60 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={completionData}>
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                <Bar dataKey="completed" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Completed" />
                <Bar dataKey="total" fill="#1e293b" radius={[4, 4, 0, 0]} name="Total" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs md:text-sm text-dark-300">Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-dark-700 rounded-full"></div>
              <span className="text-xs md:text-sm text-dark-300">Total</span>
            </div>
          </div>
        </AnimatedCard>
      </div>

      {/* Category Distribution */}
      <AnimatedCard delay={0.8}>
        <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center">
          <Activity className="w-5 h-5 md:w-6 md:h-6 text-blue-400 mr-2 md:mr-3" />
          Time Distribution by Category
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="h-48 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex flex-col justify-center space-y-4">
            {categoryDistribution.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-dark-700/30 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-medium text-white">{category.name}</span>
                  <span className="text-xs text-dark-400">
                    ({timeLogInsights[category.name]?.activities || 0} activities)
                  </span>
                </div>
                <span className="text-dark-300 font-semibold text-sm md:text-base">{category.value}%</span>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedCard>

      {/* Productivity Metrics */}
      <AnimatedCard delay={0.9}>
        <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center">
          <Target className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 mr-2 md:mr-3" />
          Productivity Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(timeLogInsights).map(([pillar, data]) => (
            <div key={pillar} className="text-center p-4 bg-dark-700/30 rounded-xl">
              <h4 className="text-lg font-semibold text-white mb-2">{pillar}</h4>
              <p className="text-2xl font-bold text-blue-400 mb-1">
                {Math.floor(data.totalTime / 60)}h {data.totalTime % 60}m
              </p>
              <p className="text-sm text-dark-400">{data.activities} activities</p>
              <p className="text-xs text-dark-500 mt-1">
                Avg: {Math.round(data.totalTime / data.activities)}min/activity
              </p>
            </div>
          ))}
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Insights;