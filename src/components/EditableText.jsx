import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Check, X } from 'lucide-react';

const EditableText = ({ 
  value, 
  onSave, 
  className = '', 
  placeholder = 'Click to edit',
  multiline = false,
  maxLength = 500 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (!multiline) {
        inputRef.current.select();
      }
    }
  }, [isEditing, multiline]);

  const handleSave = () => {
    if (editValue.trim() !== value) {
      onSave(editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <motion.div
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        className="relative"
      >
        {multiline ? (
          <textarea
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            maxLength={maxLength}
            className={`w-full bg-dark-700/50 border border-blue-500/50 rounded-lg px-3 py-2 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none ${className}`}
            placeholder={placeholder}
            rows={3}
          />
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            maxLength={maxLength}
            className={`w-full bg-dark-700/50 border border-blue-500/50 rounded-lg px-3 py-2 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${className}`}
            placeholder={placeholder}
          />
        )}
        
        <div className="flex items-center justify-end space-x-2 mt-2">
          <button
            onClick={handleSave}
            className="p-1.5 text-emerald-400 hover:bg-emerald-400/20 rounded-md transition-colors"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1.5 text-red-400 hover:bg-red-400/20 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      onClick={() => setIsEditing(true)}
      className={`cursor-pointer group relative ${className}`}
    >
      <p className="text-white group-hover:text-blue-300 transition-colors">
        {value || placeholder}
      </p>
      <Edit3 className="w-4 h-4 text-dark-500 group-hover:text-blue-400 absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" />
    </motion.div>
  );
};

export default EditableText;