import { motion } from 'framer-motion';
import { Target, Calendar, Clock, Trophy } from 'lucide-react';
import TodoList from '../components/TodoList';
import AnimatedCard from '../components/AnimatedCard';
import useStore from '../store/useStore';

const Goals = () => {
  const { goals } = useStore();

  const getCompletionStats = (periodGoals) => {
    const completed = periodGoals.filter(goal => goal.completed).length;
    const total = periodGoals.length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    return { completed, total, percentage };
  };

  const todayStats = getCompletionStats(goals.today);
  const weeklyStats = getCompletionStats(goals.weekly);
  const monthlyStats = getCompletionStats(goals.monthly);

  const statCards = [
    {
      title: 'Today',
      icon: Clock,
      stats: todayStats,
      color: 'emerald',
      description: 'Daily focus items'
    },
    {
      title: 'This Week',
      icon: Calendar,
      stats: weeklyStats,
      color: 'blue',
      description: 'Weekly objectives'
    },
    {
      title: 'This Month',
      icon: Trophy,
      stats: monthlyStats,
      color: 'purple',
      description: 'Monthly targets'
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
          <Target className="w-8 h-8 md:w-10 md:h-10 text-emerald-400 mr-3 md:mr-4" />
          Goals & Tasks
        </h1>
        <p className="text-dark-400 text-base md:text-lg">
          Organize your objectives by timeframe and track your progress toward success.
        </p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <AnimatedCard key={card.title} delay={index * 0.1} className="h-full">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dark-400 text-xs md:text-sm font-medium">{card.description}</p>
                  <p className="text-xl md:text-2xl font-bold text-white mt-1">
                    {card.stats.completed}/{card.stats.total}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex-1 h-2 bg-dark-700/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${card.stats.percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className={`h-full bg-gradient-to-r from-${card.color}-500 to-${card.color}-600`}
                      />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-white">
                      {card.stats.percentage.toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-${card.color}-500/20`}>
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 text-${card.color}-400`} />
                </div>
              </div>
            </AnimatedCard>
          );
        })}
      </div>

      {/* Goals Sections */}
      <div className="space-y-6 md:space-y-8">
        {/* Today's Goals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <TodoList period="today" title="Today's Goals" />
        </motion.div>

        {/* Weekly Goals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <TodoList period="weekly" title="Weekly Goals" />
        </motion.div>

        {/* Monthly Goals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <TodoList period="monthly" title="Monthly Goals" />
        </motion.div>
      </div>

      {/* Goal Insights */}
      <AnimatedCard delay={1.0}>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <Target className="w-5 h-5 md:w-6 md:h-6 text-orange-400 mr-2 md:mr-3" />
          Goal Insights
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="text-center p-4 bg-dark-700/30 rounded-xl">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
            </div>
            <h4 className="text-base md:text-lg font-semibold text-white mb-1">23</h4>
            <p className="text-xs md:text-sm text-dark-400">Total Completed</p>
          </div>
          
          <div className="text-center p-4 bg-dark-700/30 rounded-xl">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
            </div>
            <h4 className="text-base md:text-lg font-semibold text-white mb-1">7</h4>
            <p className="text-xs md:text-sm text-dark-400">In Progress</p>
          </div>
          
          <div className="text-center p-4 bg-dark-700/30 rounded-xl">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
            </div>
            <h4 className="text-base md:text-lg font-semibold text-white mb-1">5</h4>
            <p className="text-xs md:text-sm text-dark-400">Due This Week</p>
          </div>
          
          <div className="text-center p-4 bg-dark-700/30 rounded-xl">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-5 h-5 md:w-6 md:h-6 text-orange-400" />
            </div>
            <h4 className="text-base md:text-lg font-semibold text-white mb-1">92%</h4>
            <p className="text-xs md:text-sm text-dark-400">Success Rate</p>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Goals;