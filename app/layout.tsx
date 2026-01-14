'use client';

import './globals.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Github, Youtube, Twitter, ShieldCheck, X, Mail, UserCircle } from 'lucide-react'
import { signInWithGithub } from '../lib/auth-client'
import { supabase } from '../lib/supabase'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  const adminUid = process.env.NEXT_PUBLIC_ADMIN_UID || '67863636-ae54-4697-9539-d383badc3e56';
  const isAdmin = user?.id === adminUid;

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
    });
    if (error) alert(error.message);
    else alert("验证链接已发送！请检查邮箱。");
  };

  return (
    <html lang="zh">
      <body className="flex flex-col min-h-screen bg-[#fafafa] font-sans text-gray-900">
        <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
            <div className="flex items-center space-x-10">
              <Link href="/" className="font-black text-2xl text-blue-600 tracking-tighter">AI HUB</Link>
              <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-gray-500">
                <Link href="/" className="hover:text-blue-600">发现工具</Link>
                {/* 导航栏新增：精品软件 */}
                <Link href="/category/software" className="hover:text-blue-600 transition">精品软件</Link>
                <Link href="/category/article" className="hover:text-blue-600 transition">深度文章</Link>
                {isAdmin && (
                  <Link href="/admin" className="text-red-500 flex items-center gap-1 font-black bg-red-50 px-3 py-1 rounded-full"><ShieldCheck size={16}/> 管理后台</Link>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {user ? (
                <div className="flex items-center gap-4">
                  <img src={user.user_metadata.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`} className="w-9 h-9 rounded-full border shadow-sm" alt="avatar" />
                  <button onClick={() => supabase.auth.signOut().then(() => window.location.reload())} className="text-xs font-bold text-gray-400 hover:text-red-500 transition">退出</button>
                </div>
              ) : (
                <button onClick={() => setShowAuthModal(true)} className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl text-sm font-bold shadow-lg hover:bg-blue-700 transition">登录 / 注册</button>
              )}
            </div>
          </div>
        </nav>

        <main className="flex-grow">{children}</main>

        {showAuthModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 relative shadow-2xl animate-in fade-in zoom-in duration-300">
              <button onClick={() => setShowAuthModal(false)} className="absolute right-6 top-6 text-gray-300 hover:text-gray-600 transition"><X size={24}/></button>
              <h3 className="text-3xl font-black text-center mb-8">开始创作</h3>
              <form onSubmit={handleEmailAuth} className="space-y-4">
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="您的邮箱地址..." required className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 font-bold transition" />
                <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition">获取登录链接</button>
                <div className="flex items-center gap-4 py-2 text-gray-200"><div className="h-px flex-grow bg-gray-100"></div><span className="text-[10px] font-bold text-gray-400">OR</span><div className="h-px flex-grow bg-gray-100"></div></div>
                {/* 恢复：GitHub 快速登录 */}
                <button type="button" onClick={() => signInWithGithub()} className="w-full flex items-center justify-center gap-2 border-2 border-gray-100 py-4 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all"><Github size={20}/> GitHub 快速登录</button>
              </form>
            </div>
          </div>
        )}

        <footer className="bg-white border-t border-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center space-x-12 mb-10">
              <a href="#" className="group transform transition hover:scale-125 duration-300"><Github size={40} className="text-gray-300 group-hover:text-black transition-colors" /></a>
              <a href="#" className="group transform transition hover:scale-125 duration-300"><Youtube size={40} className="text-gray-300 group-hover:text-red-600 transition-colors" /></a>
              <a href="#" className="group transform transition hover:scale-125 duration-300"><Twitter size={40} className="text-gray-300 group-hover:text-blue-400 transition-colors" /></a>
            </div>
            {/* 首页页脚底部链接：关于、隐私、联系 */}
            <div className="flex justify-center space-x-8 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              <Link href="/about" className="hover:text-blue-600 transition">关于我们</Link>
              <Link href="/privacy" className="hover:text-blue-600 transition">隐私政策</Link>
              <Link href="/contact" className="hover:text-blue-600 transition">联系合作</Link>
            </div>
            <p className="text-gray-300 text-[10px] text-center font-black italic">© 2026 AI HUB | 为数字游民赋能</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
