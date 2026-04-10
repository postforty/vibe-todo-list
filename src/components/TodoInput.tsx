"use client";

import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  onAdd: (title: string) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl mx-auto mb-8">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="무엇을 해야 하나요?"
        className="input-field flex-1"
      />
      <button type="submit" className="btn-primary flex items-center gap-2">
        <Plus size={20} />
        <span>추가</span>
      </button>
    </form>
  );
}
