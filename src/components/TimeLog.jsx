import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Play, Square, Edit, Trash, Check, X } from 'lucide-react';
import useStore from '../store/useStore';

const TimeLog = ({ isNew = false }) => {
  const { addTimeLog, updateTimeLog, deleteTimeLog, timeLogs } = useStore();
  
  const [isEditing, setIsEditing] = useState(isNew);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    startTime: '',
    endTime: '',
    duration: 0,
    activity: '',
    category: '',
    pillar: '',
    notes: ''
  });
  
  const pillars = ['Brain', 'Voice', 'Body', 'Soul'];
  const categories = {
    Brain: ['Study', 'Research', 'Problem Solving', 'Learning'],
    Voice: ['Debate', 'Practice', 'Analysis', 'Communication'],
    Body: ['Exercise', 'Sports', 'Training', 'Recovery'],
    Soul: ['Project', 'Reading', 'Reflection', 'Creativity']
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update categories when pillar changes
    if (name === 'pillar') {
      setFormData(prev => ({
        ...prev,
        category: ''
      }));
    }
  };
  
  const handleStartTimer = () => {
    const now = new Date();
    setIsRunning(true);
    setStartTime(now);
    setFormData(prev => ({
      ...prev,
      date: now.toISOString().split('T')[0],
      startTime: now.toTimeString().split(' ')[0].substring(0, 5)
    }));
  };
  
  const handleStopTimer = () => {
    const now = new Date();
    setIsRunning(false);
    
    // Calculate duration in minutes
    const endTimeObj = now;
    const startTimeObj = startTime;
    const durationMs = endTimeObj - startTimeObj;
    const durationMinutes = Math.round(durationMs / 60000);
    
    setFormData(prev => ({
      ...prev,
      endTime: now.toTimeString().split(' ')[0].substring(0, 5),
      duration: durationMinutes
    }));
  };
  
  const handleSubmit = () => {
    if (!formData.activity || !formData.pillar || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (isNew) {
      addTimeLog(formData);
      // Reset form
      setFormData({
        date: new Date().toISOString().split('T')[0],
        startTime: '',
        endTime: '',
        duration: 0,
        activity: '',
        category: '',
        pillar: '',
        notes: ''
      });
    } else {
      updateTimeLog(formData.id, formData);
      setIsEditing(false);
    }
  };
  
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this time log?')) {
      deleteTimeLog(formData.id);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-800 rounded-xl p-4 shadow-lg"
    >
      {isEditing ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center">
              <Clock className="w-5 h-5 text-blue-400 mr-2" />
              {isNew ? 'New Time Log' : 'Edit Time Log'}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-full hover:bg-dark-700"
              >
                <X className="w-5 h-5 text-red-400" />
              </button>
              <button
                onClick={handleSubmit}
                className="p-1 rounded-full hover:bg-dark-700"
              >
                <Check className="w-5 h-5 text-green-400" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-dark-700 border border-dark-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Pillar</label>
              <select
                name="pillar"
                value={formData.pillar}
                onChange={handleChange}
                className="w-full bg-dark-700 border border-dark-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Pillar</option>
                {pillars.map(pillar => (
                  <option key={pillar} value={pillar}>{pillar}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={!formData.pillar}
                className="w-full bg-dark-700 border border-dark-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="">Select Category</option>
                {formData.pillar && categories[formData.pillar].map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Activity</label>
              <input
                type="text"
                name="activity"
                value={formData.activity}
                onChange={handleChange}
                placeholder="What did you do?"
                className="w-full bg-dark-700 border border-dark-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full bg-dark-700 border border-dark-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1">End Time</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full bg-dark-700 border border-dark-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-dark-300 mb-1">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any additional notes..."
                className="w-full bg-dark-700 border border-dark-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 h-20"
              />
            </div>
          </div>
        </div>
      ) : isNew ? (
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          {isRunning ? (
            <>
              <div className="text-2xl font-bold text-white">
                {new Date().toLocaleTimeString()}
              </div>
              <button
                onClick={handleStopTimer}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Square className="w-5 h-5" />
                <span>Stop</span>
              </button>
            </>
          ) : (
            <>
              <h3 className="text-lg font-medium text-white">Track New Activity</h3>
              <button
                onClick={handleStartTimer}
                className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Play className="w-5 h-5" />
                <span>Start Timer</span>
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                or enter manually
              </button>
            </>
          )}
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-blue-400">{formData.category}</span>
              <span className="text-xs text-dark-500">•</span>
              <span className="text-xs font-medium text-purple-400">{formData.pillar}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 rounded-full hover:bg-dark-700"
              >
                <Edit className="w-4 h-4 text-blue-400" />
              </button>
              <button
                onClick={handleDelete}
                className="p-1 rounded-full hover:bg-dark-700"
              >
                <Trash className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
          
          <h4 className="font-semibold text-white mb-1">{formData.activity}</h4>
          
          <div className="flex items-center justify-between text-sm text-dark-300 mb-2">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formData.startTime} - {formData.endTime}</span>
            </div>
            <span>{formData.duration} min</span>
          </div>
          
          {formData.notes && (
            <p className="text-sm text-dark-400 mt-2 line-clamp-2">{formData.notes}</p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default TimeLog;