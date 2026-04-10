import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// 실제 배포/빌드 시에는 환경 변수가 필요합니다.
if (process.env.NODE_ENV === 'production' && (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
  console.warn('주의: Supabase URL 또는 Anon Key가 설정되지 않은 상태로 빌드되었습니다.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
