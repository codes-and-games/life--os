import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Plus, Edit3, Trash2, Check, X, AlertTriangle } from 'lucide-react';
import useStore from '../store/useStore';

const PillarManager = () => {
  const { pillars, addPillar, updatePillar, deletePillar } = useStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPillar, setEditingPillar] = useState(null);
  const [newPillarName, setNewPillarName] = useState('');
  const [editPillarName, setEditPillarName] = useState('');

  const handleAdd = () => {
    const trimmedName = newPillarName.trim();
    if (trimmedName && !pillars.includes(trimmedName)) {
      addPillar(trimmedName);
      setNewPillarName('');
      setShowAddForm(false);
    }
  };

  const handleEdit = (pillar) => {
    setEditingPillar(pillar);
    setEditPillarName(pillar);
  };

  const handleSaveEdit = () => {
    const trimmedName = editPillarName.trim();
    if (trimmedName && trimmedName !== editingPillar && !pillars.includes(trimmedName)) {
      updatePillar(editingPillar, trimmedName);
      setEditingPillar(null);
      setEditPillarName('');
    }
  };

  const handleCancelEdit = () => {
    setEditingPillar(null);
    setEditPillarName('');
  };

  const handleDelete = (pillar) => {
    if (pillars.length <= 1) {
      alert('You must have at least one pillar.');
      return;
    }
    
    if (confirm(`Are you sure you want to delete "${pillar}"? This will remove all associated data including goals, journal entries, time logs, and achievements.`)) {
      deletePillar(pillar);
    }
  };

  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter') {
      action();
    } else if (e.key === 'Escape') {
      if (action === handleAdd) {
        setNewPillarName('');
        setShowAddForm(false);
      } else {
        handleCancelEdit();
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Layers className="w-7 h-7 text-blue-400 mr-3" />
          Life Pillars
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-400 hover:text-blue-300 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Pillar</span>
        </button>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-blue-300 text-sm font-medium mb-1">About Life Pillars</p>
            <p className="text-blue-200/80 text-sm">
              Pillars are the core areas of your life. All your goals, journal entries, time logs, and achievements are organized by these pillars. 
              Editing or deleting a pillar will update or remove all associated data.
            </p>
          </div>
        </div>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-dark-700/30 rounded-xl p-6 border border-blue-500/30"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Add New Pillar</h3>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={newPillarName}
                onChange={(e) => setNewPillarName(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleAdd)}
                className="flex-1 px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder="Enter pillar name..."
                autoFocus
              />
              <button
                onClick={handleAdd}
                disabled={!newPillarName.trim() || pillars.includes(newPillarName.trim())}
                className="flex items-center space-x-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-dark-600 disabled:text-dark-400 rounded-lg text-white font-medium transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>Add</span>
              </button>
              <button
                onClick={() => {
                  setNewPillarName('');
                  setShowAddForm(false);
                }}
                className="p-3 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {newPillarName.trim() && pillars.includes(newPillarName.trim()) && (
              <p className="text-red-400 text-sm mt-2">This pillar already exists.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pillars List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pillars.map((pillar, index) => (
          <motion.div
            key={pillar}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark-700/30 rounded-xl p-4 border border-dark-600/30 hover:border-blue-500/30 transition-colors group"
          >
            {editingPillar === pillar ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editPillarName}
                  onChange={(e) => setEditPillarName(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, handleSaveEdit)}
                  className="w-full px-3 py-2 bg-dark-700 border border-blue-500/50 rounded-lg text-white text-sm"
                  autoFocus
                />
                {editPillarName.trim() && editPillarName !== editingPillar && pillars.includes(editPillarName.trim()) && (
                  <p className="text-red-400 text-xs">This pillar already exists.</p>
                )}
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={handleCancelEdit}
                    className="p-1 text-red-400 hover:bg-red-400/20 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    disabled={!editPillarName.trim() || (editPillarName.trim() !== editingPillar && pillars.includes(editPillarName.trim()))}
                    className="p-1 text-emerald-400 hover:bg-emerald-400/20 rounded transition-colors disabled:text-dark-500"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white text-lg">{pillar}</h4>
                  <p className="text-dark-400 text-sm">Life pillar</p>
                </div>
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(pillar)}
                    className="p-2 text-blue-400 hover:bg-blue-400/20 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(pillar)}
                    disabled={pillars.length <= 1}
                    className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors disabled:text-dark-500 disabled:hover:bg-transparent"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {pillars.length === 0 && (
        <div className="text-center py-8 text-dark-400">
          <Layers className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No pillars defined yet. Add your first pillar to get started!</p>
        </div>
      )}
    </div>
  );
};

export default PillarManager;