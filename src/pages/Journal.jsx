import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, Search, Filter, Calendar, Smile, Meh, Frown } from 'lucide-react';
import AnimatedCard from '../components/AnimatedCard';
import EditableText from '../components/EditableText';
import useStore from '../store/useStore';

const Journal = () => {
  const { journalEntries, addJournalEntry, updateJournalEntry } = useStore();
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    category: 'Health',
    mood: 3,
  });

  const categories = ['All', 'Health', 'Debate', 'Academics', 'Passions'];
  const pillars = ['All', 'Brain', 'Voice', 'Body', 'Soul'];
  const moods = [
    { value: 1, icon: Frown, color: 'text-red-400', label: 'Poor' },
    { value: 2, icon: Frown, color: 'text-orange-400', label: 'Fair' },
    { value: 3, icon: Meh, color: 'text-yellow-400', label: 'Good' },
    { value: 4, icon: Smile, color: 'text-blue-400', label: 'Great' },
    { value: 5, icon: Smile, color: 'text-emerald-400', label: 'Excellent' },
  ];

  const filteredEntries = journalEntries.filter(entry => {
    const matchesCategory = selectedCategory === 'All' || entry.category === selectedCategory;
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddEntry = () => {
    if (newEntry.title.trim() && newEntry.content.trim()) {
      addJournalEntry(newEntry);
      setNewEntry({ title: '', content: '', category: 'Health', mood: 3 });
      setShowNewEntry(false);
    }
  };

  const getMoodIcon = (mood) => {
    const moodData = moods.find(m => m.value === mood);
    return moodData ? { icon: moodData.icon, color: moodData.color } : { icon: Meh, color: 'text-gray-400' };
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <BookOpen className="w-10 h-10 text-blue-400 mr-4" />
            Journal
          </h1>
          <p className="text-dark-400 text-lg">
            Reflect, record, and track your journey to success.
          </p>
        </div>
        
        <button
          onClick={() => setShowNewEntry(true)}
          className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          <span>New Entry</span>
        </button>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
          <input
            type="text"
            placeholder="Search entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-dark-800/30 border border-dark-700/30 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-dark-400" />
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-dark-800/30 text-dark-300 hover:bg-dark-700/50 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* New Entry Modal */}
      <AnimatePresence>
        {showNewEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-dark-800/90 backdrop-blur-sm border border-dark-700/50 rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold text-white mb-6">New Journal Entry</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={newEntry.title}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600/30 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    placeholder="What's on your mind?"
                    autoFocus
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Category</label>
                  <select
                    value={newEntry.category}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  >
                    {categories.slice(1).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-3">Mood</label>
                  <div className="flex space-x-4">
                    {moods.map(mood => {
                      const Icon = mood.icon;
                      return (
                        <button
                          key={mood.value}
                          onClick={() => setNewEntry(prev => ({ ...prev, mood: mood.value }))}
                          className={`p-3 rounded-xl border transition-all ${
                            newEntry.mood === mood.value
                              ? 'border-blue-500/50 bg-blue-500/20'
                              : 'border-dark-600/30 bg-dark-700/30 hover:border-dark-500/50'
                          }`}
                        >
                          <Icon className={`w-6 h-6 ${mood.color}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Content</label>
                  <textarea
                    value={newEntry.content}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full h-32 px-4 py-3 bg-dark-700/50 border border-dark-600/30 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none"
                    placeholder="Write your thoughts here..."
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-4 mt-8">
                <button
                  onClick={() => setShowNewEntry(false)}
                  className="px-6 py-3 text-dark-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEntry}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl text-white font-medium transition-all duration-300 shadow-lg"
                >
                  Save Entry
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entries Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredEntries.map((entry, index) => {
            const moodData = getMoodIcon(entry.mood);
            const MoodIcon = moodData.icon;
            
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                layout
              >
                <AnimatedCard className="h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full">
                        {entry.category}
                      </span>
                      <MoodIcon className={`w-5 h-5 ${moodData.color}`} />
                    </div>
                    <div className="flex items-center space-x-2 text-dark-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{entry.date}</span>
                    </div>
                  </div>
                  
                  <EditableText
                    value={entry.title}
                    onSave={(value) => updateJournalEntry(entry.id, { title: value })}
                    className="text-xl font-bold text-white mb-3"
                    placeholder="Entry title..."
                  />
                  
                  <EditableText
                    value={entry.content}
                    onSave={(value) => updateJournalEntry(entry.id, { content: value })}
                    className="text-dark-300 leading-relaxed"
                    placeholder="Write your thoughts..."
                    multiline
                    maxLength={1000}
                  />
                </AnimatedCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      {filteredEntries.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <BookOpen className="w-16 h-16 text-dark-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-dark-400 mb-2">No entries found</h3>
          <p className="text-dark-500 mb-6">
            {searchTerm || selectedCategory !== 'All' 
              ? 'Try adjusting your filters or search terms'
              : 'Start writing your first journal entry'
            }
          </p>
          <button
            onClick={() => setShowNewEntry(true)}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-medium transition-colors"
          >
            Write First Entry
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Journal;