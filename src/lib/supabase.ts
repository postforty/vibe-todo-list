import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
// 사용자의 .env 파일에 맞춰 PUBLISHABLE_KEY 또는 ANON_KEY를 모두 확인합니다.
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// 실제 배포/빌드 시에는 환경 변수가 필요합니다.
if (process.env.NODE_ENV === 'production' && (!process.env.NEXT_PUBLIC_SUPABASE_URL || (supabaseAnonKey === 'placeholder-key'))) {
  console.warn('주의: Supabase URL 또는 API Key가 설정되지 않은 상태로 빌드되었습니다.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
