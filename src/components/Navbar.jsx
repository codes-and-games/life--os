import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Bell, Menu, Target, X } from 'lucide-react';
import useStore from '../store/useStore';


const Navbar = ({ setIsMobileMenuOpen }) => {
  const { user, sidebarCollapsed, goals } = useStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Get monthly goals for notifications
  const monthlyGoals = goals.monthly || [];
  const uncompletedMonthlyGoals = monthlyGoals.filter(goal => !goal.completed);
  const notificationCount = uncompletedMonthlyGoals.length;

  return (
    <motion.header
      animate={{
        marginLeft: isMobile ? 0 : isTablet ? 0 : (sidebarCollapsed ? 80 : 280)
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="topbar fixed top-0 left-0 right-0 h-16 bg-dark-900/80 backdrop-blur-xl border-b border-dark-700/50 z-40 hidden sm:flex"
    >
      <div className="flex items-center justify-between h-full px-4 sm:px-6 md:px-8 w-full">
        <div className="flex items-center">
          {/* Hamburger menu for tablet */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 mr-2 rounded-lg hover:bg-dark-800/50 transition-colors lg:hidden sm:block"
          >
            <Menu className="w-6 h-6 text-dark-400" />
          </button>

          <div className="flex items-center space-x-4">
            <Calendar className="w-6 h-6 text-blue-400 hidden sm:block" />
            <div>
              <p className="text-white font-medium text-sm sm:text-base">{formattedDate}</p>
              <p className="text-sm text-dark-400 hidden sm:block">Today's focus: Excellence</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="hidden sm:flex items-center space-x-3 px-4 py-2 rounded-xl bg-dark-800/30 border border-dark-700/30"
          >
            <div className="text-right">
              <p className="text-sm text-dark-400">Current Streak</p>
              <p className="text-xl font-bold text-emerald-400">{user?.currentStreak || 0} days</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔥</span>
            </div>
          </motion.div>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-3 rounded-xl bg-dark-800/30 border border-dark-700/30 hover:bg-dark-700/30 transition-colors"
            >
              <Bell className="w-6 h-6 text-dark-400" />
              {notificationCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">{notificationCount}</span>
                </div>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-dark-800/95 backdrop-blur-xl border border-dark-700/50 rounded-xl shadow-xl z-50"
                >
                  <div className="p-4 border-b border-dark-700/50">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-medium flex items-center">
                        <Target className="w-4 h-4 text-purple-400 mr-2" />
                        Monthly Goals
                      </h3>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="p-1 rounded-lg hover:bg-dark-700/50"
                      >
                        <X className="w-4 h-4 text-dark-400" />
                      </button>
                    </div>
                  </div>

                  <div className="p-2">
                    {uncompletedMonthlyGoals.length > 0 ? (
                      <div className="space-y-2">
                        {uncompletedMonthlyGoals.map((goal) => (
                          <div
                            key={goal.id}
                            className="p-3 bg-dark-700/30 rounded-lg hover:bg-dark-700/50 transition-colors"
                          >
                            <div className="flex items-start">
                              <div className={`w-2 h-2 mt-1.5 rounded-full bg-${goal.pillar === 'Brain' ? 'blue' : goal.pillar === 'Body' ? 'emerald' : goal.pillar === 'Voice' ? 'purple' : 'orange'}-400 mr-2`}></div>
                              <div>
                                <p className="text-white text-sm">{goal.text}</p>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-xs text-dark-400">{goal.pillar}</span>
                                  <div className="flex items-center">
                                    <div className="w-24 h-1.5 bg-dark-600/50 rounded-full overflow-hidden">
                                      <div
                                        className={`h-full bg-${goal.pillar === 'Brain' ? 'blue' : goal.pillar === 'Body' ? 'emerald' : goal.pillar === 'Voice' ? 'purple' : 'orange'}-500`}
                                        style={{ width: `${goal.progress}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs text-dark-400 ml-2">{goal.progress}%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <p className="text-dark-400 text-sm">No pending monthly goals</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <img
            src={user.avatar}
            alt="Profile"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-blue-500/30"
          />
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;