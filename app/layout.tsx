'use client';

import './globals.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Github, Youtube, Twitter, LogIn, UserPlus, ShieldCheck } from 'lucide-react'
import { signInWithGithub } from '../lib/auth-client'
import { supabase } from '../lib/supabase'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 监听 Supabase 登录状态
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
  }, []);

  // 这里的 UID 来自你提供的截图
  const isAdmin = user?.id === '67863636-ae54-4697-9539-d383badc3e56';

  return (
    <html lang="zh">
      <body className="flex flex-col min-h-screen bg-[#fafafa] relative font-sans antialiased">
        <div className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
        
        <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
            <div className="flex items-center space-x-10">
              <Link href="/" className="font-black text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">AI HUB</Link>
              <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-gray-600">
                <Link href="/" className="hover:text-blue-600 transition">发现工具</Link>
                {isAdmin && <Link href="/admin" className="text-red-500 flex items-center gap-1 font-black underline"><ShieldCheck size={16}/> 管理后台</Link>}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {user ? (
                <div className="flex items-center gap-4">
                  <img src={user.user_metadata.avatar_url} className="w-8 h-8 rounded-full border-2 border-blue-100 shadow-sm" alt="avatar" />
                  <button onClick={() => supabase.auth.signOut().then(() => window.location.reload())} className="text-sm font-bold text-gray-400 hover:text-red-500 transition">退出</button>
                </div>
              ) : (
                <>
                  <button onClick={() => signInWithGithub()} className="text-sm font-bold text-gray-500 hover:text-blue-600 px-4 py-2">登录</button>
                  <button onClick={() => signInWithGithub()} className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition">免费注册</button>
                </>
              )}
            </div>
          </div>
        </nav>

        <main className="flex-grow">{children}</main>

        <footer className="bg-white border-t border-gray-100 py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex justify-center items-center space-x-12 mb-10">
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
            <p className="text-gray-400 text-xs tracking-widest uppercase font-bold italic">© 2026 AI NAV HUB | Professional AI Directory</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
