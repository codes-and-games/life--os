import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  TrendingUp,
  Eye,
  Target,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Clock
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import useStore from '../store/useStore';
import { useEffect, useState } from 'react';

const navigationItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: BookOpen, label: 'Journal', path: '/journal' },
  { icon: TrendingUp, label: 'Insights', path: '/insights' },
  { icon: Eye, label: 'Vision', path: '/vision' },
  { icon: Target, label: 'Goals', path: '/goals' },
  { icon: Clock, label: 'Time Logs', path: '/timelogs' },
];

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar } = useStore();
  const [internalMobileMenuOpen, setInternalMobileMenuOpen] = useState(false);

  // Use prop if provided, else fallback to internal state
  const mobileMenuOpen = typeof isMobileMenuOpen === 'boolean' ? isMobileMenuOpen : internalMobileMenuOpen;
  const setMobileMenuOpen = setIsMobileMenuOpen || setInternalMobileMenuOpen;

  // Hide topbar on mobile: add a class to body
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        document.body.classList.add('hide-topbar');
      } else {
        document.body.classList.remove('hide-topbar');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <>
      {/* Hamburger menu button for mobile only */}
      <button
        className="fixed top-4 left-4 z-50 sm:hidden bg-dark-900/80 p-2 rounded-lg border border-dark-700/30"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open sidebar"
        style={{ display: mobileMenuOpen ? 'none' : 'block' }}
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      {/* Mobile/tablet overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-dark-950/80 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <motion.aside
        initial={{ x: -280 }}
        animate={{
          x: mobileMenuOpen ? 0 : (window.innerWidth < 1024 ? -280 : 0),
          width: sidebarCollapsed && !mobileMenuOpen ? 80 : 280
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`
          fixed left-0 top-0 h-full bg-dark-900/50 backdrop-blur-xl border-r border-dark-700/50 z-50
          ${mobileMenuOpen ? 'block' : 'hidden lg:block'}
          ${mobileMenuOpen ? 'w-72' : sidebarCollapsed ? 'w-20' : 'w-72'}
        `}
        style={{
          maxWidth: '100vw'
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-dark-700/50">
            <motion.div
              animate={{ opacity: sidebarCollapsed && !mobileMenuOpen ? 0 : 1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              {(!sidebarCollapsed || mobileMenuOpen) && (
                <div>
                  <h1 className="text-xl font-bold text-white">Life OS</h1>
                  <p className="text-sm text-dark-400">Journal v2</p>
                </div>
              )}
            </motion.div>

            <button
              onClick={() => mobileMenuOpen ? setMobileMenuOpen(false) : toggleSidebar()}
              className="p-2 rounded-lg hover:bg-dark-800/50 transition-colors"
              aria-label={mobileMenuOpen ? "Close sidebar" : "Toggle sidebar"}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-dark-400" />
              ) : sidebarCollapsed ? (
                <ChevronRight className="w-5 h-5 text-dark-400" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-dark-400" />
              )}
            </button>
          </div>

         
          <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
            <ul className="space-y-2">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <motion.li
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center p-3 rounded-xl transition-all duration-200 group ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-400'
                          : 'hover:bg-dark-800/50 text-dark-300 hover:text-white'
                      }`}
                      onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}
                    >
                      <Icon className={`w-6 h-6 ${isActive ? 'text-blue-400' : 'text-dark-400 group-hover:text-white'}`} />
                      {(!sidebarCollapsed || mobileMenuOpen) && (
                        <span className="ml-3 font-medium">{item.label}</span>
                      )}
                      {isActive && (!sidebarCollapsed || mobileMenuOpen) && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto w-2 h-2 bg-blue-400 rounded-full"
                        />
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* User Info */}
          {(!sidebarCollapsed || mobileMenuOpen) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-4 border-t border-dark-700/50"
            >
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-dark-800/30">
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-blue-500/30"
                />
                <div>
                  <p className="text-white font-medium">Alex Chen</p>
                  <p className="text-sm text-dark-400">15-day streak 🔥</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.aside>
      {/* Hide topbar on mobile/tablet using CSS */}
      <style>{`
        @media (max-width: 639px) {
          .topbar, header.topbar {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
export { navigationItems };