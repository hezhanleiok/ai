'use client';

import './globals.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Github, Youtube, Twitter, LogIn, UserPlus, Mail, ShieldCheck, X } from 'lucide-react'
import { signInWithGithub } from '../lib/auth-client'
import { supabase } from '../lib/supabase'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false); // 控制登录弹窗

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
  }, []);

  const isAdmin = user?.id === '67863636-ae54-4697-9539-d383badc3e56';

  return (
    <html lang="zh">
      <body className="flex flex-col min-h-screen bg-[#fafafa] relative font-sans antialiased text-gray-900">
        <div className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
        
        {/* 导航栏 */}
        <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
            <div className="flex items-center space-x-10">
              <Link href="/" className="font-black text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">AI HUB</Link>
              <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-gray-500">
                <Link href="/" className="hover:text-blue-600">发现工具</Link>
                <Link href="/software" className="hover:text-blue-600">精品软件</Link>
                <Link href="/articles" className="hover:text-blue-600">深度文章</Link>
                {isAdmin && <Link href="/admin" className="text-red-500 flex items-center gap-1 underline font-black"><ShieldCheck size={16}/> 管理后台</Link>}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {user ? (
                <div className="flex items-center gap-4">
                  <img src={user.user_metadata.avatar_url} className="w-8 h-8 rounded-full border shadow-sm" alt="avatar" />
                  <button onClick={() => supabase.auth.signOut().then(() => window.location.reload())} className="text-sm font-bold text-gray-400 hover:text-red-500 transition">退出</button>
                </div>
              ) : (
                <>
                  <button onClick={() => setShowAuthModal(true)} className="text-sm font-bold text-gray-500 hover:text-blue-600 px-4 py-2">登录</button>
                  <button onClick={() => setShowAuthModal(true)} className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition">免费注册</button>
                </>
              )}
            </div>
          </div>
        </nav>

        <main className="flex-grow">{children}</main>

        {/* 注册/登录 弹窗页面 */}
        {showAuthModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 relative shadow-2xl animate-in fade-in zoom-in duration-300">
              <button onClick={() => setShowAuthModal(false)} className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"><X size={24}/></button>
              
              <div className="text-center mb-10">
                <h3 className="text-3xl font-black text-gray-900 mb-2">加入 AI HUB</h3>
                <p className="text-gray-500 font-medium">开启您的 2026 AI 效率之旅</p>
              </div>

              <div className="space-y-4">
                {/* 邮箱注册输入框 */}
                <div className="relative group">
                  <Mail className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20}/>
                  <input type="email" placeholder="您的电子邮箱地址..." className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium text-gray-700 border border-gray-100" />
                </div>
                <button onClick={() => alert('邮箱注册需配合验证码，建议先使用 GitHub 快速体验')} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95">邮箱一键注册</button>
                
                <div className="flex items-center gap-4 py-4 text-gray-300">
                  <div className="h-px flex-grow bg-gray-100"></div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">或者使用社交账号</span>
                  <div className="h-px flex-grow bg-gray-100"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => signInWithGithub()} className="flex items-center justify-center gap-3 border-2 border-gray-100 py-3 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-200 transition-all">
                    <Github size={20}/> GitHub
                  </button>
                  <button onClick={() => alert('请在 Supabase 后台配置 Google Client ID 即可开启')} className="flex items-center justify-center gap-3 border-2 border-gray-100 py-3 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-200 transition-all">
                    <img src="https://www.google.com/favicon.ico" className="w-5 h-5" /> Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 底部彩色图标 */}
        <footer className="bg-white border-t border-gray-100 py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex justify-center items-center space-x-12 mb-12">
              <a href="https://github.com/hezhanleiok/ai" target="_blank" className="group transition-transform hover:scale-125 duration-300">
                <Github size={40} className="text-gray-300 group-hover:text-[#24292e] transition-colors" />
              </a>
              <a href="https://www.youtube.com/@xiaoheai" target="_blank" className="group transition-transform hover:scale-125 duration-300">
                <Youtube size={40} className="text-gray-300 group-hover:text-[#FF0000] transition-colors" />
              </a>
              <a href="https://x.com/xiaoheyiyi" target="_blank" className="group transition-transform hover:scale-125 duration-300">
                <Twitter size={40} className="text-gray-300 group-hover:text-[#1DA1F2] transition-colors" />
              </a>
            </div>
            <p className="text-gray-400 text-xs tracking-widest uppercase font-bold">© 2026 AI NAV HUB | 为数字游民赋能</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
