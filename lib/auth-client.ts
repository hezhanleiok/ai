import { supabase } from './supabase';

export async function signInWithGithub() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      // 登录成功后跳转回你的 Vercel 首页
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  
  if (error) console.error('登录失败:', error.message);
}
