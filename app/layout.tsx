'use client';

import './globals.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Github, Youtube, Twitter, ShieldCheck, X, Mail, Search, UserCircle } from 'lucide-react'
import { signInWithGithub } from '../lib/auth-client'
import { supabase } from '../lib/supabase'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [email, setEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // 新增：搜索内容状态

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  const adminUid = process.env.NEXT_PUBLIC_ADMIN_UID || '67863636-ae54-4697-9539-d383badc3e56';
  const isAdmin = user?.id === adminUid;

  // 新增：处理搜索跳转逻辑
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // 带着关键词跳转到分类页
    window.location.href = `/category/article?search=${encodeURIComponent(searchQuery)}`;
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
    });
    if (error) alert(error.message);
    else alert("验证链接已发送！");
  };

  return (
    <html lang="zh">
      <body className="flex flex-col min-h-screen bg-[#fafafa]">
        <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
            <div className="flex items-center space-x-10">
              <Link href="/" className="font-black text-2xl text-blue-600 tracking-tighter">AI HUB</Link>
              <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-gray-500">
                <Link href="/" className="hover:text-blue-600 transition">首页</Link>
                <Link href="/category/software" className="hover:text-blue-600 transition">精品软件</Link>
                <Link href="/category/article" className="hover:text-blue-600 transition">深度文章</Link>
                
                {/* 搜索框：现在具备提交功能 */}
                <form onSubmit={handleSearch} className="relative group ml-4">
                  <input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="text" 
                    placeholder="搜索内容..." 
                    className="bg-gray-100 border-none rounded-2xl py-2 px-4 pl-10 focus:ring-2 focus:ring-blue-100 outline-none w-48 transition-all group-hover:w-64 text-sm font-bold" 
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                </form>

                {isAdmin && (
                  <Link href="/admin" className="text-red-500 flex items-center gap-1 font-black bg-red-50 px-3 py-1 rounded-full animate-pulse"><ShieldCheck size={16}/> 管理后台</Link>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {user ? (
                <div className="flex items-center gap-4">
                  <img src={user.user_metadata.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`} className="w-9 h-9 rounded-full border shadow-sm" alt="avatar" />
                  <button onClick={() => supabase.auth.signOut().then(() => window.location.reload())} className="text-xs font-bold text-gray-400">退出</button>
                </div>
              ) : (
                <button onClick={() => setShowAuthModal(true)} className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl text-sm font-bold shadow-lg transition active:scale-95">登录 / 注册</button>
              )}
            </div>
          </div>
        </nav>

        <main className="flex-grow">{children}</main>

        {showAuthModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 relative shadow-2xl">
              <button onClick={() => setShowAuthModal(false)} className="absolute right-6 top-6 text-gray-300 hover:text-gray-600 transition"><X size={24}/></button>
              <h3 className="text-3xl font-black text-center mb-8">开始创作</h3>
              <form onSubmit={handleEmailAuth} className="space-y-4">
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="您的邮箱..." required className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 transition" />
                <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-blue-100">获取验证链接</button>
                <div className="flex items-center gap-4 py-2"><div className="h-px flex-grow bg-gray-100"></div><span className="text-[10px] font-bold text-gray-400">OR</span><div className="h-px flex-grow bg-gray-100"></div></div>
                <button type="button" onClick={() => signInWithGithub()} className="w-full flex items-center justify-center gap-2 border-2 py-4 rounded-2xl font-bold text-gray-600 hover:bg-gray-50"><Github size={20}/> GitHub 快速登录</button>
              </form>
            </div>
          </div>
        )}

        <footer className="bg-white border-t border-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            {/* 社交链接：已填入你的真实地址 */}
            <div className="flex justify-center space-x-12 mb-10">
              <a href="https://github.com/hezhanlei" target="_blank" className="group transition hover:scale-125">
                <Github size={40} className="text-gray-300 group-hover:text-black transition-colors" />
              </a>
              <a href="https://youtube.com/@hezhanlei" target="_blank" className="group transition hover:scale-125">
                <Youtube size={40} className="text-gray-300 group-hover:text-red-600 transition-colors" />
              </a>
              <a href="https://x.com/hezhanlei" target="_blank" className="group transition hover:scale-125">
                <Twitter size={40} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
              </a>
            </div>
            
            <div className="flex justify-center space-x-12 text-base font-black text-gray-600 uppercase tracking-widest mb-8">
              <Link href="/about" className="hover:text-blue-600 transition">关于我们</Link>
              <Link href="/privacy" className="hover:text-blue-600 transition">隐私政策</Link>
              <Link href="/contact" className="hover:text-blue-600 transition">联系合作</Link>
            </div>
            <p className="text-gray-300 text-[10px] font-black italic tracking-widest uppercase">© 2026 AI HUB | 赋能数字游民</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
