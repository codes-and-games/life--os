import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';
import Insights from './pages/Insights';
import Vision from './pages/Vision';
import Goals from './pages/Goals';
import TimeLogs from './pages/TimeLogs';
import useStore from './store/useStore';
import { useState, useEffect } from 'react';

const PageWrapper = ({ children }) => {
  const { sidebarCollapsed } = useStore();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <motion.div
      animate={{ 
        marginLeft: isMobile ? 0 : isTablet ? 0 : (sidebarCollapsed ? 80 : 280),
        marginTop: isMobile ? 0 : 80
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="min-h-screen p-4 sm:p-6 md:p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-4">
      <Router>
        <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <Navbar setIsMobileMenuOpen={setIsMobileMenuOpen} />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <PageWrapper>
                <Dashboard />
              </PageWrapper>
            } />
            <Route path="/journal" element={
              <PageWrapper>
                <Journal />
              </PageWrapper>
            } />
            <Route path="/insights" element={
              <PageWrapper>
                <Insights />
              </PageWrapper>
            } />
            <Route path="/vision" element={
              <PageWrapper>
                <Vision />
              </PageWrapper>
            } />
            <Route path="/goals" element={
              <PageWrapper>
                <Goals />
              </PageWrapper>
            } />
            <Route path="/timelogs" element={
              <PageWrapper>
                <TimeLogs />
              </PageWrapper>
            } />
          </Routes>
        </AnimatePresence>
      </Router>
    </div>
  );
}

export default App;