import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Plus, Edit3, Trash2, Check, X, Brain, Mic, Dumbbell, Heart } from 'lucide-react';
import useStore from '../store/useStore';

const FocusAreaManager = () => {
  const { currentFocus, updateCurrentFocus, addCurrentFocus, deleteCurrentFocus } = useStore();
  const [editingPillar, setEditingPillar] = useState(null);
  const [editText, setEditText] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFocus, setNewFocus] = useState({
    pillar: '',
    focus: ''
  });

  const pillars = ['Brain', 'Voice', 'Body', 'Soul'];
  const pillarIcons = {
    Brain: Brain,
    Voice: Mic,
    Body: Dumbbell,
    Soul: Heart
  };
  const pillarColors = {
    Brain: 'blue',
    Voice: 'purple',
    Body: 'emerald',
    Soul: 'orange'
  };

  const handleEdit = (pillar, focus) => {
    setEditingPillar(pillar);
    setEditText(focus);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      updateCurrentFocus(editingPillar, editText.trim());
      setEditingPillar(null);
      setEditText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingPillar(null);
    setEditText('');
  };

  const handleAdd = () => {
    if (newFocus.pillar && newFocus.focus.trim()) {
      addCurrentFocus(newFocus.pillar, newFocus.focus.trim());
      setNewFocus({ pillar: '', focus: '' });
      setShowAddForm(false);
    }
  };

  const handleDelete = (pillar) => {
    if (confirm(`Are you sure you want to delete the ${pillar} focus area?`)) {
      deleteCurrentFocus(pillar);
    }
  };

  const availablePillars = pillars.filter(pillar => !currentFocus[pillar]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Target className="w-7 h-7 text-emerald-400 mr-3" />
          Current Focus Areas
        </h2>
        {availablePillars.length > 0 && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Focus Area</span>
          </button>
        )}
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-dark-700/30 rounded-xl p-6 border border-emerald-500/30"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Add New Focus Area</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Pillar</label>
                <select
                  value={newFocus.pillar}
                  onChange={(e) => setNewFocus(prev => ({ ...prev, pillar: e.target.value }))}
                  className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                >
                  <option value="">Select Pillar</option>
                  {availablePillars.map(pillar => (
                    <option key={pillar} value={pillar}>{pillar}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Focus Description</label>
                <textarea
                  value={newFocus.focus}
                  onChange={(e) => setNewFocus(prev => ({ ...prev, focus: e.target.value }))}
                  className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 h-20 resize-none"
                  placeholder="Describe your current focus for this pillar..."
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
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white font-medium transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>Add Focus Area</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Focus Areas */}
      <div className="space-y-4">
        {Object.entries(currentFocus).map(([pillar, focus], index) => {
          const Icon = pillarIcons[pillar];
          const color = pillarColors[pillar];
          
          return (
            <motion.div
              key={pillar}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-700/30 rounded-xl p-6 border border-dark-600/30 hover:border-dark-500/50 transition-colors group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`p-3 rounded-xl bg-${color}-500/20 flex-shrink-0`}>
                    <Icon className={`w-6 h-6 text-${color}-400`} />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={`font-semibold text-${color}-400 mb-2`}>{pillar}</h4>
                    
                    {editingPillar === pillar ? (
                      <div className="space-y-3">
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full px-3 py-2 bg-dark-700 border border-blue-500/50 rounded-lg text-white text-sm h-20 resize-none"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.ctrlKey) {
                              handleSaveEdit();
                            } else if (e.key === 'Escape') {
                              handleCancelEdit();
                            }
                          }}
                        />
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
                      <p className="text-dark-300 text-sm leading-relaxed">{focus}</p>
                    )}
                  </div>
                </div>
                
                {editingPillar !== pillar && (
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(pillar, focus)}
                      className="p-2 text-blue-400 hover:bg-blue-400/20 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(pillar)}
                      className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {Object.keys(currentFocus).length === 0 && (
        <div className="text-center py-8 text-dark-400">
          <Target className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No focus areas defined yet. Add your first focus area to get started!</p>
        </div>
      )}
    </div>
  );
};

export default FocusAreaManager;