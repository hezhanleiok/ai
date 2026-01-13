import { supabase } from './supabase';

export async function signInWithGithub() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      // 这里的路径要和上面创建的 route.ts 对应
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  if (error) console.error('Login error:', error.message);
}
