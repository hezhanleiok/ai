'use client';

import './globals.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Github, Youtube, Twitter, LogIn, UserPlus, Mail, ShieldCheck, X, UserCircle } from 'lucide-react'
import { signInWithGithub } from '../lib/auth-client'
import { supabase } from '../lib/supabase'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 安全获取初始 Session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getInitialSession();

    // 实时监听状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 管理员判断逻辑：优先从环境变量读取，没有则不开启，防止报错
  const adminId = process.env.NEXT_PUBLIC_ADMIN_UID || 'NONE';
  const isAdmin = user && user.id === adminId;

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return alert("请输入邮箱");
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setLoading(false);
    if (error) alert("错误: " + error.message);
    else {
      alert("验证邮件已发送！");
      setShowAuthModal(false);
    }
  };

  return (
    <html lang="zh">
      <body className="flex flex-col min-h-screen bg-[#fafafa] relative font-sans antialiased">
        <div className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
        
        <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
            <div className="flex items-center space-x-10">
              <Link href="/" className="font-black text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">AI HUB</Link>
              <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-gray-500">
                <Link href="/" className="hover:text-blue-600">发现工具</Link>
                {user && (
                  isAdmin ? (
                    <Link href="/admin" className="text-red-500 flex items-center gap-1 font-black bg-red-50 px-3 py-1 rounded-full animate-pulse"><ShieldCheck size={16}/> 管理后台</Link>
                  ) : (
                    <Link href="/dashboard" className="text-blue-600 flex items-center gap-1 font-black bg-blue-50 px-3 py-1 rounded-full"><UserCircle size={16}/> 个人中心</Link>
                  )
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {user ? (
                <div className="flex items-center gap-4">
                  <img src={user.user_metadata.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`} className="w-9 h-9 rounded-full border shadow-sm" alt="avatar" />
                  <button onClick={() => supabase.auth.signOut()} className="text-sm font-bold text-gray-400 hover:text-red-500">退出账号</button>
                </div>
              ) : (
                <button onClick={() => setShowAuthModal(true)} className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-200">登录 / 注册</button>
              )}
            </div>
          </div>
        </nav>

        <main className="flex-grow">{children}</main>

        {showAuthModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 relative shadow-2xl">
              <button onClick={() => setShowAuthModal(false)} className="absolute right-6 top-6 text-gray-300 hover:text-gray-600"><X size={24}/></button>
              <h3 className="text-3xl font-black text-center mb-8">开始使用</h3>
              <form onSubmit={handleEmailSignIn} className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-600" size={20}/>
                  <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="您的邮箱..." className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white outline-none" />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-blue-100">
                  {loading ? '发送中...' : '邮箱一键登录'}
                </button>
                <div className="flex items-center gap-4 py-2"><div className="h-px flex-grow bg-gray-100"></div><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">or social</span><div className="h-px flex-grow bg-gray-100"></div></div>
                <button type="button" onClick={() => signInWithGithub()} className="w-full flex items-center justify-center gap-3 border-2 border-gray-50 py-4 rounded-2xl font-bold text-gray-600"><Github size={20}/> GitHub 快速登录</button>
              </form>
            </div>
          </div>
        )}

        <footer className="bg-white border-t border-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex justify-center items-center space-x-12 mb-10">
              <a href="#" className="group transition-transform hover:scale-125 duration-300"><Github size={40} className="text-gray-300 group-hover:text-[#24292e] transition-colors" /></a>
              <a href="#" className="group transition-transform hover:scale-125 duration-300"><Youtube size={40} className="text-gray-300 group-hover:text-[#FF0000] transition-colors" /></a>
              <a href="#" className="group transition-transform hover:scale-125 duration-300"><Twitter size={40} className="text-gray-300 group-hover:text-[#1DA1F2] transition-colors" /></a>
            </div>
            <p className="text-gray-400 text-xs tracking-widest uppercase font-black italic">© 2026 AI HUB | 赋能数字游民</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
