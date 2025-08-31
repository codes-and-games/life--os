import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Plus, Edit3, Trash2, Check, X, Calendar } from 'lucide-react';
import useStore from '../store/useStore';

const AchievementManager = () => {
  const { achievements, addAchievement, updateAchievement, deleteAchievement } = useStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    pillar: 'Brain',
    icon: '🏆',
    date: new Date().toISOString().split('T')[0]
  });
  const [editData, setEditData] = useState({});

  const pillars = ['Brain', 'Voice', 'Body', 'Soul'];
  const commonIcons = ['🏆', '🎯', '⚡', '🔥', '💪', '🧠', '🎤', '❤️', '⭐', '🚀'];

  const handleAdd = () => {
    if (newAchievement.title.trim()) {
      addAchievement(newAchievement);
      setNewAchievement({
        title: '',
        pillar: 'Brain',
        icon: '🏆',
        date: new Date().toISOString().split('T')[0]
      });
      setShowAddForm(false);
    }
  };

  const handleEdit = (achievement) => {
    setEditingId(achievement.id);
    setEditData(achievement);
  };

  const handleSaveEdit = () => {
    if (editData.title?.trim()) {
      updateAchievement(editingId, editData);
      setEditingId(null);
      setEditData({});
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this achievement?')) {
      deleteAchievement(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Award className="w-7 h-7 text-yellow-400 mr-3" />
          Achievements
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 rounded-lg text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Achievement</span>
        </button>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-dark-700/30 rounded-xl p-6 border border-yellow-500/30"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Add New Achievement</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Title</label>
                <input
                  type="text"
                  value={newAchievement.title}
                  onChange={(e) => setNewAchievement(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/30"
                  placeholder="Achievement title..."
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Pillar</label>
                <select
                  value={newAchievement.pillar}
                  onChange={(e) => setNewAchievement(prev => ({ ...prev, pillar: e.target.value }))}
                  className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/30"
                >
                  {pillars.map(pillar => (
                    <option key={pillar} value={pillar}>{pillar}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Icon</label>
                <div className="flex flex-wrap gap-2">
                  {commonIcons.map(icon => (
                    <button
                      key={icon}
                      onClick={() => setNewAchievement(prev => ({ ...prev, icon }))}
                      className={`p-2 rounded-lg border transition-colors ${
                        newAchievement.icon === icon
                          ? 'border-yellow-500/50 bg-yellow-500/20'
                          : 'border-dark-600 hover:border-yellow-500/30'
                      }`}
                    >
                      <span className="text-xl">{icon}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Date</label>
                <input
                  type="date"
                  value={newAchievement.date}
                  onChange={(e) => setNewAchievement(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/30"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-dark-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white font-medium transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>Add Achievement</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievements List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark-700/30 rounded-xl p-4 border border-dark-600/30 hover:border-yellow-500/30 transition-colors group"
          >
            {editingId === achievement.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editData.title || ''}
                  onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 bg-dark-700 border border-yellow-500/50 rounded-lg text-white text-sm"
                  autoFocus
                />
                
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={editData.pillar || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, pillar: e.target.value }))}
                    className="px-2 py-1 bg-dark-700 border border-dark-600 rounded text-white text-sm"
                  >
                    {pillars.map(pillar => (
                      <option key={pillar} value={pillar}>{pillar}</option>
                    ))}
                  </select>
                  
                  <input
                    type="date"
                    value={editData.date || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, date: e.target.value }))}
                    className="px-2 py-1 bg-dark-700 border border-dark-600 rounded text-white text-sm"
                  />
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {commonIcons.map(icon => (
                    <button
                      key={icon}
                      onClick={() => setEditData(prev => ({ ...prev, icon }))}
                      className={`p-1 rounded border text-sm ${
                        editData.icon === icon
                          ? 'border-yellow-500/50 bg-yellow-500/20'
                          : 'border-dark-600 hover:border-yellow-500/30'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={handleCancelEdit}
                    className="p-1 text-red-400 hover:bg-red-400/20 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="p-1 text-emerald-400 hover:bg-emerald-400/20 rounded transition-colors"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(achievement)}
                      className="p-1 text-blue-400 hover:bg-blue-400/20 rounded transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(achievement.id)}
                      className="p-1 text-red-400 hover:bg-red-400/20 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <h4 className="font-semibold text-white mb-2 text-sm">{achievement.title}</h4>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full">
                    {achievement.pillar}
                  </span>
                  <div className="flex items-center text-dark-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{new Date(achievement.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>

      {achievements.length === 0 && (
        <div className="text-center py-8 text-dark-400">
          <Award className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No achievements yet. Add your first achievement to get started!</p>
        </div>
      )}
    </div>
  );
};

export default AchievementManager;