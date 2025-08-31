import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, X, Calendar, Edit, ChevronDown, ChevronUp, List } from 'lucide-react';
import useStore from '../store/useStore';

const TodoList = ({ period, title }) => {
  const { goals, addGoal, toggleGoal, deleteGoal, updateGoal, checkStreakUpdate, pillars } = useStore();
  const [newGoal, setNewGoal] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [editingGoalText, setEditingGoalText] = useState('');
  const [expandedGoalId, setExpandedGoalId] = useState(null);
  const [newSubgoal, setNewSubgoal] = useState('');
  const [addingSubgoalId, setAddingSubgoalId] = useState(null);

  const periodGoals = goals[period] || [];

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      addGoal(period, {
        text: newGoal.trim(),
        category: 'General',
        subgoals: [],
      });
      setNewGoal('');
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddGoal();
    } else if (e.key === 'Escape') {
      setNewGoal('');
      setIsAdding(false);
    }
  };

  const handleToggleGoal = (goalId) => {
    toggleGoal(period, goalId);
    // Check for streak update when toggling today's goals
    if (period === 'today') {
      setTimeout(() => checkStreakUpdate(), 100);
    }
  };

  const addSubgoalLocal = (goalId, subgoalText) => {
    const goal = periodGoals.find(g => g.id === goalId);
    if (goal) {
      const newSubgoals = [...(goal.subgoals || []), {
        id: Date.now(),
        text: subgoalText,
        completed: false
      }];
      updateGoal(period, goalId, { subgoals: newSubgoals });
    }
  };

  const toggleSubgoalLocal = (goalId, subgoalId) => {
    const goal = periodGoals.find(g => g.id === goalId);
    if (goal && goal.subgoals) {
      const updatedSubgoals = goal.subgoals.map(sub => 
        sub.id === subgoalId ? { ...sub, completed: !sub.completed } : sub
      );
      updateGoal(period, goalId, { subgoals: updatedSubgoals });
    }
  };

  const handleEditGoal = (id, text) => {
    setEditingGoalId(id);
    setEditingGoalText(text);
  };

  const handleSaveEdit = (id) => {
    if (editingGoalText.trim()) {
      updateGoal(period, id, { text: editingGoalText.trim() });
      setEditingGoalId(null);
      setEditingGoalText('');
    }
  };

  const handleEditKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      handleSaveEdit(id);
    } else if (e.key === 'Escape') {
      setEditingGoalId(null);
      setEditingGoalText('');
    }
  };

  const handleAddSubgoal = (goalId) => {
    if (newSubgoal.trim()) {
      addSubgoalLocal(goalId, newSubgoal.trim());
      setNewSubgoal('');
      setAddingSubgoalId(null);
    }
  };

  const handleSubgoalKeyDown = (e, goalId) => {
    if (e.key === 'Enter') {
      handleAddSubgoal(goalId);
    } else if (e.key === 'Escape') {
      setNewSubgoal('');
      setAddingSubgoalId(null);
    }
  };

  const toggleExpand = (goalId) => {
    setExpandedGoalId(expandedGoalId === goalId ? null : goalId);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-dark-800/30 backdrop-blur-sm border border-dark-700/30 rounded-2xl p-4 md:p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-3">
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
          <h3 className="text-lg md:text-xl font-bold text-white">{title}</h3>
        </div>
        
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-400 hover:text-blue-300 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Goal</span>
        </button>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center space-x-3 p-3 bg-dark-700/30 rounded-lg border border-blue-500/30"
            >
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Add new ${period} goal...`}
                className="flex-1 bg-transparent text-white placeholder-dark-400 focus:outline-none text-sm md:text-base"
                autoFocus
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleAddGoal}
                  className="p-1.5 text-emerald-400 hover:bg-emerald-400/20 rounded-md transition-colors"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setNewGoal('');
                    setIsAdding(false);
                  }}
                  className="p-1.5 text-red-400 hover:bg-red-400/20 rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {periodGoals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`group rounded-lg border transition-all p-4 ${
              goal.completed
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-dark-700/30 border-dark-600/30 hover:border-dark-500/50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <button
                onClick={() => handleToggleGoal(goal.id)}
                className={`flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 transition-colors mt-0.5 ${
                  goal.completed
                    ? 'bg-emerald-500 border-emerald-500'
                    : 'border-dark-500 hover:border-emerald-500'
                }`}
              >
                {goal.completed && <Check className="w-3 h-3 md:w-4 md:h-4 text-white m-auto" />}
              </button>
              
              <div className="flex-1">
                {editingGoalId === goal.id ? (
                  <input
                    type="text"
                    value={editingGoalText}
                    onChange={(e) => setEditingGoalText(e.target.value)}
                    onBlur={() => handleSaveEdit(goal.id)}
                    onKeyDown={(e) => handleEditKeyDown(e, goal.id)}
                    className="w-full bg-dark-700/50 border border-blue-500/50 rounded px-2 py-1 text-white text-sm md:text-base"
                    autoFocus
                  />
                ) : (
                  <p 
                    onClick={() => handleEditGoal(goal.id, goal.text)}
                    className={`font-medium cursor-pointer hover:text-blue-300 transition-colors text-sm md:text-base ${
                      goal.completed ? 'text-dark-400 line-through' : 'text-white'
                    }`}
                  >
                    {goal.text}
                  </p>
                )}
                
                {/* Subgoals */}
                {goal.subgoals && goal.subgoals.length > 0 && (
                  <div className="mt-2 ml-4 space-y-1">
                    {goal.subgoals.map(subgoal => (
                      <div key={subgoal.id} className="flex items-center space-x-2 group/subgoal">
                        <button
                          onClick={() => toggleSubgoalLocal(goal.id, subgoal.id)}
                          className={`w-3 h-3 rounded-full border transition-colors ${
                            subgoal.completed
                              ? 'bg-blue-400 border-blue-400'
                              : 'border-dark-500 hover:border-blue-400'
                          }`}
                        />
                        <span className={`text-xs md:text-sm flex-1 ${
                          subgoal.completed ? 'text-dark-400 line-through' : 'text-dark-300'
                        }`}>
                          {subgoal.text}
                        </span>
                        <button
                          onClick={() => {
                            const updatedSubgoals = goal.subgoals.filter(sg => sg.id !== subgoal.id);
                            updateGoal(period, goal.id, { subgoals: updatedSubgoals });
                          }}
                          className="p-1 text-red-400 hover:bg-red-400/20 rounded-md transition-colors opacity-0 group-hover/subgoal:opacity-100"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Add Subgoal */}
                {addingSubgoalId === goal.id ? (
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      type="text"
                      value={newSubgoal}
                      onChange={(e) => setNewSubgoal(e.target.value)}
                      onKeyDown={(e) => handleSubgoalKeyDown(e, goal.id)}
                      placeholder="Add a subgoal..."
                      className="flex-1 bg-transparent text-sm text-white placeholder-dark-400 focus:outline-none border-b border-dark-600 py-1"
                      autoFocus
                    />
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleAddSubgoal(goal.id)}
                        className="p-1 text-emerald-400 hover:bg-emerald-400/20 rounded-md transition-colors"
                      >
                        <Check className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => {
                          setNewSubgoal('');
                          setAddingSubgoalId(null);
                        }}
                        className="p-1 text-red-400 hover:bg-red-400/20 rounded-md transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setAddingSubgoalId(goal.id)}
                    className="flex items-center text-sm text-blue-400 hover:text-blue-300 mt-2"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    <span>Add subtask</span>
                  </button>
                )}
              </div>
              
              <button
                onClick={() => deleteGoal(period, goal.id)}
                className="p-1 text-red-400 hover:bg-red-400/20 rounded-md transition-colors opacity-0 group-hover:opacity-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
        
        {periodGoals.length === 0 && !isAdding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-6 md:py-8 text-dark-400"
          >
            <Calendar className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm md:text-base">No {period} goals yet</p>
            <p className="text-sm">Click "Add Goal" to get started</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TodoList;