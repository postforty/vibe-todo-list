"use client";

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import TodoItem from './TodoItem';

interface Todo {
  id: string;
  title: string;
  is_completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.is_completed;
    if (filter === 'completed') return todo.is_completed;
    return true;
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6 px-2">
        {(['all', 'active', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-sm font-medium transition-all ${
              filter === f ? 'text-accent border-b-2 border-accent pb-1' : 'text-text-muted hover:text-text-main'
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="flex flex-col">
        <AnimatePresence mode="popLayout">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </AnimatePresence>
        
        {filteredTodos.length === 0 && (
          <div className="text-center py-20 text-text-dim">
            <p>할 일이 없습니다. 즐거운 하루 되세요! ✨</p>
          </div>
        )}
      </div>
    </div>
  );
}
