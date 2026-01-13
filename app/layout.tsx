'use client';

import './globals.css'
import Link from 'next/link'
import { Github, Youtube, Twitter, LogIn, UserPlus } from 'lucide-react'
import { signInWithGithub } from '../lib/auth-client'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  const handleRegister = () => {
    alert("感谢加入 AI HUB！即将通过 GitHub 为您创建账号。");
    signInWithGithub();
  };

  return (
    <html lang="zh">
      <body className="flex flex-col min-h-screen bg-[#fafafa] relative">
        <div className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
        
        <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
            <div className="flex items-center space-x-10">
              <Link href="/" className="font-black text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">AI HUB</Link>
              <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-gray-600">
                <Link href="/" className="hover:text-blue-600 transition">发现工具</Link>
                <Link href="/software" className="hover:text-blue-600 transition">精品软件</Link>
                <Link href="/articles" className="hover:text-blue-600 transition">深度文章</Link>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={() => signInWithGithub()} className="text-sm font-bold text-gray-600 hover:text-blue-600 px-4 py-2">登录</button>
              <button onClick={handleRegister} className="flex items-center space-x-1 bg-blue-600 text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                <UserPlus size={18} />
                <span>免费注册</span>
              </button>
            </div>
          </div>
        </nav>

        <main className="flex-grow">{children}</main>

        <footer className="bg-white border-t py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex justify-center space-x-12 mb-10">
              {/* GitHub: 黑色 */}
              <a href="https://github.com/hezhanleiok/ai" target="_blank" className="text-gray-400 hover:text-[#24292e] transition-all transform hover:scale-125 duration-300"><Github size={40} /></a>
              {/* YouTube: 品牌红 */}
              <a href="https://www.youtube.com/@xiaoheai" target="_blank" className="text-gray-400 hover:text-[#FF0000] transition-all transform hover:scale-125 duration-300"><Youtube size={40} /></a>
              {/* X: 品牌蓝 */}
              <a href="https://x.com/xiaoheyiyi" target="_blank" className="text-gray-400 hover:text-[#1DA1F2] transition-all transform hover:scale-125 duration-300"><Twitter size={40} /></a>
            </div>
            <p className="text-gray-400 text-xs tracking-widest">© 2026 AI NAV HUB | 为数字游民赋能</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
