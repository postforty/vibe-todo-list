"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { LogIn } from 'lucide-react';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('체크할 이메일을 확인해주세요! 매직 링크를 보냈습니다.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="glass p-8 rounded-2xl w-full max-w-md border border-glass-border">
        <h2 className="text-3xl font-bold mb-6 text-center gradient-text">시작하기</h2>
        <p className="text-text-muted text-center mb-8">이메일 매직 링크로 간편하게 로그인하세요.</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="이메일 주소"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field w-full"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <LogIn size={20} />
            {loading ? '전송 중...' : '매직 링크 보내기'}
          </button>
        </form>
        
        {message && (
          <p className="mt-4 text-center text-sm text-accent bg-accent/10 p-3 rounded-lg border border-accent/20">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
