import { motion } from 'framer-motion';

const ProgressBar = ({ progress, className = '', showLabel = true, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-emerald-500 to-emerald-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-2">
        {showLabel && (
          <span className="text-sm text-dark-300">Progress</span>
        )}
        <span className="text-sm text-white font-medium">{progress}%</span>
      </div>
      
      <div className="w-full h-3 bg-dark-700/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${colorClasses[color]} shadow-lg`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;