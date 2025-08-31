import { motion } from 'framer-motion';
import { Eye, Target, Calendar, TrendingUp, Star, Trash2, Edit3, Plus, Minus, Check, X } from 'lucide-react';
import AnimatedCard from '../components/AnimatedCard';
import EditableText from '../components/EditableText';
import ProgressBar from '../components/ProgressBar';
import useStore from '../store/useStore';
import { useState } from 'react';

// Tailwind color mapping for dynamic classes
const colorMap = {
  green: 'emerald',
  blue: 'blue',
  purple: 'purple',
  orange: 'orange',
};

const Vision = () => {
  const { visions, updateVision, deleteVision, addVision } = useStore();
  const [editingProgress, setEditingProgress] = useState(null);
  const [editingMilestones, setEditingMilestones] = useState(null);
  const [newMilestone, setNewMilestone] = useState('');
  const [showNewVisionForm, setShowNewVisionForm] = useState(false);
  const [newVision, setNewVision] = useState({
    title: '',
    description: '',
    category: 'Career',
    targetDate: '',
    progress: 0
  });


  // Helper functions
  const getProgressColor = (progress) => {
    if (progress >= 80) return 'green';
    if (progress >= 60) return 'blue';
    if (progress >= 40) return 'purple';
    return 'orange';
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Career': return Target;
      case 'Finance': return TrendingUp;
      case 'Personal': return Star;
      default: return Eye;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date)) return 'N/A';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Most advanced vision
  const mostAdvanced = visions.length > 0
    ? visions.reduce((prev, current) => (prev.progress > current.progress ? prev : current))
    : null;

  // Next deadline vision
  const nextDeadline = visions.length > 0
    ? visions.reduce((prev, current) => (new Date(prev.targetDate) < new Date(current.targetDate) ? prev : current))
    : null;

  // Most active category
  const categoryCounts = visions.reduce((acc, vision) => {
    acc[vision.category] = (acc[vision.category] || 0) + 1;
    return acc;
  }, {});
  const mostActiveCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  // Average progress
  const avgProgress = visions.length > 0
    ? Math.round(visions.reduce((sum, v) => sum + v.progress, 0) / visions.length)
    : 0;

  // Near completion count
  const nearCompletion = visions.filter(v => v.progress >= 75).length;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
          <Eye className="w-10 h-10 text-purple-400 mr-4" />
          Vision Board
        </h1>
        <p className="text-dark-400 text-lg">
          Your long-term aspirations and the roadmap to achieve them. Click to edit any vision.
        </p>
      </motion.div>

      {/* Show empty state or add button */}
      {(!visions || visions.length === 0) ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <Eye className="w-16 h-16 text-dark-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-dark-400 mb-2">No visions yet</h3>
          <p className="text-dark-500 mb-6">
            Create your first vision to start mapping your future
          </p>
          <button
            onClick={() => setShowNewVisionForm(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 rounded-xl text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl mx-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Create Your First Vision</span>
          </button>
        </motion.div>
      ) : (
        <>
          {/* Add New Vision Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setShowNewVisionForm(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 rounded-xl text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Add Vision</span>
            </button>
          </div>
        </>
      )}

      {/* New Vision Form */}
      {showNewVisionForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <AnimatedCard>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Create New Vision</h3>
              <button
                onClick={() => setShowNewVisionForm(false)}
                className="p-2 rounded-lg hover:bg-dark-700/50 transition-colors"
              >
                <X className="w-5 h-5 text-dark-400" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Title</label>
                <input
                  type="text"
                  value={newVision.title}
                  onChange={(e) => setNewVision(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600/30 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  placeholder="Enter your vision title..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Category</label>
                <select
                  value={newVision.category}
                  onChange={(e) => setNewVision(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                >
                  <option value="Career">Career</option>
                  <option value="Finance">Finance</option>
                  <option value="Personal">Personal</option>
                  <option value="Health">Health</option>
                  <option value="Education">Education</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Target Date</label>
                <input
                  type="date"
                  value={newVision.targetDate}
                  onChange={(e) => setNewVision(prev => ({ ...prev, targetDate: e.target.value }))}
                  className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Initial Progress (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newVision.progress}
                  onChange={(e) => setNewVision(prev => ({ ...prev, progress: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-dark-300 mb-2">Description</label>
                <textarea
                  value={newVision.description}
                  onChange={(e) => setNewVision(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full h-24 px-4 py-3 bg-dark-700/50 border border-dark-600/30 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 resize-none"
                  placeholder="Describe your vision in detail..."
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowNewVisionForm(false)}
                className="px-6 py-3 text-dark-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newVision.title.trim() && newVision.description.trim()) {
                    addVision({
                      ...newVision,
                      milestones: []
                    });
                    setNewVision({
                      title: '',
                      description: '',
                      category: 'Career',
                      targetDate: '',
                      progress: 0
                    });
                    setShowNewVisionForm(false);
                  }
                }}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 rounded-xl text-white font-medium transition-all duration-300 shadow-lg"
              >
                Create Vision
              </button>
            </div>
          </AnimatedCard>
        </motion.div>
      )}

      {/* Only show content if there are visions */}
      {visions && visions.length > 0 && (
        <>
          {/* Vision Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedCard delay={0.1}>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-blue-400 mb-2">{visions.length}</h3>
                <p className="text-dark-300">Active Visions</p>
              </div>
            </AnimatedCard>
            <AnimatedCard delay={0.2}>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-emerald-400 mb-2">
                  {avgProgress}%
                </h3>
                <p className="text-dark-300">Average Progress</p>
              </div>
            </AnimatedCard>
            <AnimatedCard delay={0.3}>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-purple-400 mb-2">
                  {nearCompletion}
                </h3>
                <p className="text-dark-300">Near Completion</p>
              </div>
            </AnimatedCard>
          </div>

          {/* Vision Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {visions.map((vision, index) => {
              const progressColor = getProgressColor(vision.progress);
              const twColor = colorMap[progressColor];
              const CategoryIcon = getCategoryIcon(vision.category);

              return (
                <motion.div
                  key={vision.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.2 }}
                >
                  <AnimatedCard className="h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-xl bg-${twColor}-500/20`}>
                          <CategoryIcon className={`w-6 h-6 text-${twColor}-400`} />
                        </div>
                        <div>
                          <span className={`px-3 py-1 bg-${twColor}-500/20 text-${twColor}-400 text-xs font-medium rounded-full`}>
                            {vision.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-dark-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>Target: {formatDate(vision.targetDate)}</span>
                        <button
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this vision?')) {
                              deleteVision(vision.id);
                            }
                          }}
                          className="ml-2 p-1 rounded-md hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
                        </button>
                      </div>
                    </div>

                    <EditableText
                      value={vision.title}
                      onSave={(value) => updateVision(vision.id, { title: value })}
                      className="text-2xl font-bold text-white mb-4"
                      placeholder="Vision title..."
                    />

                    <EditableText
                      value={vision.description}
                      onSave={(value) => updateVision(vision.id, { description: value })}
                      className="text-dark-300 leading-relaxed mb-6"
                      placeholder="Describe your vision in detail..."
                      multiline
                      maxLength={500}
                    />

                    <div className="space-y-4">
                      <ProgressBar
                        progress={vision.progress}
                        color={progressColor}
                        className="mb-4"
                      />
                      
                      {/* Editable Progress */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-dark-400">Progress</span>
                        {editingProgress === vision.id ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={vision.progress}
                              onChange={(e) => updateVision(vision.id, { progress: parseInt(e.target.value) || 0 })}
                              className="w-16 px-2 py-1 bg-dark-700/50 border border-blue-500/50 rounded text-white text-sm"
                              onBlur={() => setEditingProgress(null)}
                              onKeyDown={(e) => e.key === 'Enter' && setEditingProgress(null)}
                              autoFocus
                            />
                            <span className="text-white">%</span>
                            <button
                              onClick={() => setEditingProgress(null)}
                              className="p-1 rounded-md hover:bg-emerald-500/20 transition-colors"
                            >
                              <Check className="w-3 h-3 text-emerald-400" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setEditingProgress(vision.id)}
                            className="flex items-center space-x-1 text-white font-medium hover:text-blue-300 transition-colors"
                          >
                            <span>{vision.progress}%</span>
                            <Edit3 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-dark-400">Time remaining</span>
                        <span className="text-white font-medium">
                          {vision.targetDate
                            ? Math.max(0, Math.ceil((new Date(vision.targetDate) - new Date()) / (1000 * 60 * 60 * 24)))
                            : 'N/A'} days
                        </span>
                      </div>
                    </div>

                    {/* Editable Milestones */}
                    <div className="mt-6 pt-4 border-t border-dark-700/30">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium text-dark-300">Milestones</h4>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingMilestones(editingMilestones === vision.id ? null : vision.id)}
                            className={`p-1 rounded-md hover:bg-dark-700/50 transition-colors ${
                              editingMilestones === vision.id ? 'text-blue-300' : 'text-blue-400'
                            }`}
                          >
                            <Edit3 className="w-3 h-3 text-blue-400" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {vision.milestones && vision.milestones.length > 0 ? (
                          vision.milestones.map((milestone, index) => (
                            <div key={index} className="flex items-center justify-between text-sm group">
                              <div className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${
                                  milestone.completed ? 'bg-emerald-400' : 'bg-dark-500'
                                }`}></div>
                                <span className={milestone.completed ? 'text-emerald-300' : 'text-dark-300'}>
                                  {milestone.text}
                                </span>
                              </div>
                              {editingMilestones === vision.id && (
                                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={() => {
                                      const updatedMilestones = vision.milestones.map((m, i) =>
                                        i === index ? { ...m, completed: !m.completed } : m
                                      );
                                      updateVision(vision.id, { milestones: updatedMilestones });
                                    }}
                                    className="p-1 rounded-md hover:bg-emerald-500/20 transition-colors"
                                  >
                                    <Check className="w-3 h-3 text-emerald-400" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      const updatedMilestones = vision.milestones.filter((_, i) => i !== index);
                                      updateVision(vision.id, { milestones: updatedMilestones });
                                    }}
                                    className="p-1 rounded-md hover:bg-red-500/20 transition-colors"
                                  >
                                    <Minus className="w-3 h-3 text-red-400" />
                                  </button>
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-dark-500">No milestones yet</div>
                        )}
                        
                        {/* Add new milestone */}
                        {editingMilestones === vision.id && (
                          <div className="flex items-center space-x-2 mt-2">
                            <input
                              type="text"
                              value={newMilestone}
                              onChange={(e) => setNewMilestone(e.target.value)}
                              placeholder="Add new milestone..."
                              className="flex-1 px-2 py-1 bg-dark-700/50 border border-dark-600/30 rounded text-white text-sm placeholder-dark-400"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && newMilestone.trim()) {
                                  const currentMilestones = vision.milestones || [];
                                  updateVision(vision.id, {
                                    milestones: [...currentMilestones, { text: newMilestone.trim(), completed: false }]
                                  });
                                  setNewMilestone('');
                                }
                              }}
                            />
                            <button
                              onClick={() => {
                                if (newMilestone.trim()) {
                                  const currentMilestones = vision.milestones || [];
                                  updateVision(vision.id, {
                                    milestones: [...currentMilestones, { text: newMilestone.trim(), completed: false }]
                                  });
                                  setNewMilestone('');
                                }
                              }}
                              className="p-1 rounded-md hover:bg-dark-700/50"
                            >
                              <Plus className="w-3 h-3 text-emerald-400" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </AnimatedCard>
                </motion.div>
              );
            })}
          </div>

          {/* Vision Insights */}
          <AnimatedCard delay={1.2}>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 text-blue-400 mr-3" />
              Vision Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-dark-700/30 rounded-xl">
                <h4 className="text-lg font-semibold text-emerald-400 mb-2">Most Advanced</h4>
                <p className="text-white">{mostAdvanced ? mostAdvanced.title : 'N/A'}</p>
                <p className="text-sm text-dark-400 mt-1">
                  {mostAdvanced ? mostAdvanced.progress : 0}% complete
                </p>
              </div>
              <div className="text-center p-4 bg-dark-700/30 rounded-xl">
                <h4 className="text-lg font-semibold text-blue-400 mb-2">Next Deadline</h4>
                <p className="text-white">
                  {nextDeadline ? nextDeadline.title : 'N/A'}
                </p>
                <p className="text-sm text-dark-400 mt-1">
                  Due {nextDeadline ? formatDate(nextDeadline.targetDate) : 'N/A'}
                </p>
              </div>
              <div className="text-center p-4 bg-dark-700/30 rounded-xl">
                <h4 className="text-lg font-semibold text-purple-400 mb-2">Focus Area</h4>
                <p className="text-white">{mostActiveCategory}</p>
                <p className="text-sm text-dark-400 mt-1">Most active category</p>
              </div>
            </div>
          </AnimatedCard>
        </>
      )}
    </div>
  );
};

export default Vision;