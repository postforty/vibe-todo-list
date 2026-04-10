"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { todoService, Todo } from '@/lib/todoService';
import Navbar from '@/components/Navbar';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import Auth from '@/components/Auth';
import { User } from '@supabase/supabase-js';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Auth 상태 구독
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. To-Do 데이터 로드
  useEffect(() => {
    if (user) {
      fetchTodos();
    } else {
      setTodos([]);
    }
  }, [user]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoService.getTodos();
      setTodos(data);
    } catch (error) {
      console.error('To-Dos를 가져오는데 실패했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (title: string) => {
    if (!user) return;
    try {
      const newTodo = await todoService.addTodo(title, user.id);
      setTodos([newTodo, ...todos]);
    } catch (error) {
      alert('할 일을 추가하는 중 오류가 발생했습니다.');
    }
  };

  const handleToggleTodo = async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    
    // 낙관적 업데이트 (UI 먼저 업데이트)
    const prevTodos = [...todos];
    setTodos(todos.map(t => t.id === id ? { ...t, is_completed: !t.is_completed } : t));

    try {
      await todoService.toggleTodo(id, !todo.is_completed);
    } catch (error) {
      setTodos(prevTodos); // 오류 발생 시 롤백
      alert('상태를 변경하는 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteTodo = async (id: string) => {
    const prevTodos = [...todos];
    setTodos(todos.filter(t => t.id !== id));

    try {
      await todoService.deleteTodo(id);
    } catch (error) {
      setTodos(prevTodos); // 롤백
      alert('할 일을 삭제하는 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />
      
      <main className="flex-1 px-6 py-12 max-w-4xl mx-auto w-full">
        {!user ? (
          <Auth />
        ) : (
          <>
            <header className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Hello, {user.email?.split('@')[0]}!</h2>
              <p className="text-text-muted">세련된 디자인으로 할 일을 관리하고 생산성을 높이세요.</p>
            </header>

            <TodoInput onAdd={handleAddTodo} />
            
            {loading ? (
              <div className="text-center py-20 text-text-muted animate-pulse">로딩 중...</div>
            ) : (
              <TodoList 
                todos={todos} 
                onToggle={handleToggleTodo} 
                onDelete={handleDeleteTodo} 
              />
            )}
          </>
        )}
      </main>

      <footer className="py-8 text-center text-text-dim text-sm">
        © 2026 Vibe To-Do List. Built with Next.js & Supabase.
      </footer>
    </div>
  );
}
