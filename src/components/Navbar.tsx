"use client";

import React from 'react';
import { Layout, User, LogOut } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface NavbarProps {
  user: SupabaseUser | null;
}

export default function Navbar({ user }: NavbarProps) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center" style={{ margin: '1rem', borderRadius: 'var(--radius-lg)' }}>
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-primary/20 text-accent">
          <Layout size={24} />
        </div>
        <h1 className="gradient-text text-xl">Vibe To-Do</h1>
      </div>
      
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-border/50 border border-glass-border">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center overflow-hidden">
                <User size={14} className="text-white" />
              </div>
              <span className="text-sm text-text-muted font-medium">{user.email?.split('@')[0]}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-text-dim hover:text-white transition-colors"
              title="로그아웃"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-text-muted text-sm">
            <span>로그인 필요</span>
          </div>
        )}
      </div>

      <style jsx>{`
        nav {
          backdrop-filter: blur(20px);
        }
      `}</style>
    </nav>
  );
}
