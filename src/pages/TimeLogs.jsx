import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock, Filter, Calendar, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import useStore from '../store/useStore';
import AnimatedCard from '../components/AnimatedCard';
import TimeLog from '../components/TimeLog';

const TimeLogs = () => {
  const { timeLogs } = useStore();
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterPillar, setFilterPillar] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  
  const { pillars } = useStore();
  const categories = {
    Health: ['Exercise', 'Sports', 'Training', 'Recovery', 'Nutrition'],
    Academics: ['Study', 'Research', 'Problem Solving', 'Learning', 'Homework'],
    Passions: ['Project', 'Reading', 'Reflection', 'Creativity', 'Hobbies'],
    Relationship: ['Family Time', 'Friends', 'Social Events', 'Communication', 'Dating'],
    Career: ['Work', 'Networking', 'Skill Building', 'Job Search', 'Professional Development']
  };
  
  const filteredLogs = useMemo(() => {
    return timeLogs.filter(log => {
      const dateMatch = filterDate ? log.date === filterDate : true;
      const pillarMatch = filterPillar ? log.pillar === filterPillar : true;
      const categoryMatch = filterCategory ? log.category === filterCategory : true;
      return dateMatch && pillarMatch && categoryMatch;
    });
  }, [timeLogs, filterDate, filterPillar, filterCategory]);
  
  // Calculate total time spent by pillar
  const timeByPillar = useMemo(() => {
    const result = {};
    filteredLogs.forEach(log => {
      if (!result[log.pillar]) {
        result[log.pillar] = 0;
      }
      result[log.pillar] += log.duration;
    });
    
    return Object.entries(result).map(([name, value]) => ({
      name,
      value,
      color: name === 'Brain' ? '#3b82f6' : 
             name === 'Voice' ? '#8b5cf6' : 
             name === 'Body' ? '#10b981' : 
             '#f59e0b'
    }));
  }, [filteredLogs]);
  
  // Calculate total time spent by category
  const timeByCategory = useMemo(() => {
    const result = {};
    filteredLogs.forEach(log => {
      if (!result[log.category]) {
        result[log.category] = 0;
      }
      result[log.category] += log.duration;
    });
    
    const defaultColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1', '#14b8a6'];
    
    return Object.entries(result).map(([name, value], index) => ({
      name,
      value,
      color: defaultColors[index % defaultColors.length]
    }));
  }, [filteredLogs]);
  
  // Calculate total time spent
  const totalTime = useMemo(() => {
    return filteredLogs.reduce((total, log) => total + log.duration, 0);
  }, [filteredLogs]);
  
  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold text-white flex items-center">
          <Clock className="w-8 h-8 text-blue-400 mr-3" />
          Time Logs
        </h1>
      </motion.div>
      
      {/* Filters */}
      <AnimatedCard delay={0.1}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Filter className="w-6 h-6 text-purple-400 mr-3" />
            Filters
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-1">Date</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full bg-dark-700 border border-dark-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-1">Pillar</label>
            <select
              value={filterPillar}
              onChange={(e) => {
                setFilterPillar(e.target.value);
                setFilterCategory('');
              }}
              className="w-full bg-dark-700 border border-dark-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Pillars</option>
              {pillars.map(pillar => (
                <option key={pillar} value={pillar}>{pillar}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-1">Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              disabled={!filterPillar}
              className="w-full bg-dark-700 border border-dark-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
            >
              <option value="">All Categories</option>
              {filterPillar && categories[filterPillar].map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </AnimatedCard>
      
      {/* Time Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Time Log Form */}
        <AnimatedCard delay={0.2}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center">
              <Clock className="w-6 h-6 text-green-400 mr-3" />
              Track Time
            </h3>
          </div>
          
          <TimeLog isNew={true} />
        </AnimatedCard>
        
        {/* Time Distribution by Pillar */}
        <AnimatedCard delay={0.3}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center">
              <PieChartIcon className="w-6 h-6 text-blue-400 mr-3" />
              Time by Pillar
            </h3>
            <div className="text-lg font-bold text-white">
              {Math.floor(totalTime / 60)}h {totalTime % 60}m
            </div>
          </div>
          
          {timeByPillar.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={timeByPillar}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    dataKey="value"
                    strokeWidth={0}
                    label={({ name, value }) => `${name}: ${Math.floor(value / 60)}h ${value % 60}m`}
                  >
                    {timeByPillar.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => `${Math.floor(value / 60)}h ${value % 60}m`}
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-dark-400">
              No data available for selected filters
            </div>
          )}
        </AnimatedCard>
        
        {/* Time Distribution by Category */}
        <AnimatedCard delay={0.4}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center">
              <PieChartIcon className="w-6 h-6 text-purple-400 mr-3" />
              Time by Category
            </h3>
          </div>
          
          {timeByCategory.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={timeByCategory}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    dataKey="value"
                    strokeWidth={0}
                    label={({ name, value }) => `${name}: ${Math.floor(value / 60)}h ${value % 60}m`}
                  >
                    {timeByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => `${Math.floor(value / 60)}h ${value % 60}m`}
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-dark-400">
              No data available for selected filters
            </div>
          )}
        </AnimatedCard>
      </div>
      
      {/* Time Log List */}
      <AnimatedCard delay={0.5}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Calendar className="w-6 h-6 text-emerald-400 mr-3" />
            Activity Log
          </h3>
          <div className="text-sm text-dark-400">
            {filteredLogs.length} activities
          </div>
        </div>
        
        {filteredLogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLogs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-700/30 rounded-xl p-4 border border-dark-600/30 hover:border-dark-500/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-blue-400">{log.category}</span>
                    <span className="text-xs text-dark-500">•</span>
                    <span className="text-xs font-medium text-purple-400">{log.pillar}</span>
                  </div>
                  <span className="text-xs text-dark-400">{log.date}</span>
                </div>
                
                <h4 className="font-semibold text-white mb-1">{log.activity}</h4>
                
                <div className="flex items-center justify-between text-sm text-dark-300 mb-2">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{log.startTime} - {log.endTime}</span>
                  </div>
                  <span>{log.duration} min</span>
                </div>
                
                {log.notes && (
                  <p className="text-sm text-dark-400 mt-2 line-clamp-2">{log.notes}</p>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-dark-400">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
            No time logs found for the selected filters
          </div>
        )}
      </AnimatedCard>
    </div>
  );
};

export default TimeLogs;