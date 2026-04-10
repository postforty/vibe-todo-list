"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Square } from 'lucide-react';

interface TodoItemProps {
  todo: {
    id: string;
    title: string;
    is_completed: boolean;
  };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`glass flex items-center justify-between p-4 rounded-xl border border-glass-border transition-all duration-300 ${
        todo.is_completed ? 'opacity-60' : 'opacity-100'
      }`}
      style={{ marginBottom: '0.75rem' }}
    >
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => onToggle(todo.id)}
          className={`w-6 h-6 rounded-md flex items-center justify-center border-2 transition-all ${
            todo.is_completed 
              ? 'bg-primary border-primary text-white' 
              : 'border-text-dim hover:border-accent'
          }`}
        >
          {todo.is_completed && <Check size={16} />}
        </button>
        <span className={`text-lg transition-all ${
          todo.is_completed ? 'line-through text-text-muted' : 'text-text-main'
        }`}>
          {todo.title}
        </span>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="p-2 text-text-dim hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
      >
        <Trash2 size={20} />
      </button>
    </motion.div>
  );
}
