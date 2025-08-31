import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon } from 'lucide-react';
import AnimatedCard from '../components/AnimatedCard';
import AchievementManager from '../components/AchievementManager';
import FocusAreaManager from '../components/FocusAreaManager';
import PillarManager from '../components/PillarManager';

const Settings = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
          <SettingsIcon className="w-10 h-10 text-blue-400 mr-4" />
          Settings & Management
        </h1>
        <p className="text-dark-400 text-lg">
          Customize your life pillars, manage achievements, and set focus areas.
        </p>
      </motion.div>

      {/* Pillar Management */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <AnimatedCard>
          <PillarManager />
        </AnimatedCard>
      </motion.div>

      {/* Achievement Management */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <AnimatedCard>
          <AchievementManager />
        </AnimatedCard>
      </motion.div>

      {/* Focus Area Management */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <AnimatedCard>
          <FocusAreaManager />
        </AnimatedCard>
      </motion.div>
    </div>
  );
};

export default Settings;