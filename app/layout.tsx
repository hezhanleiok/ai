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
      <body className="flex flex-col min-h-screen bg-[#fafafa] relative font-sans antialiased text-gray-900">
        {/* 背景背景装饰 */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
        <div className="fixed top-0 -z-10 h-full w-full bg-gradient-to-b from-blue-50/50 to-transparent"></div>

        {/* 顶部导航 */}
        <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
            <div className="flex items-center space-x-10">
              <Link href="/" className="font-black text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                AI HUB
              </Link>
              
              <div className="hidden md:flex items-center space-x-8 text-sm font-bold">
                <Link href="/" className="text-blue-600">发现工具</Link>
                <Link href="/software" className="text-gray-500 hover:text-blue-600 transition">精品软件</Link>
                <Link href="/articles" className="text-gray-500 hover:text-blue-600 transition">深度文章</Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => signInWithGithub()} 
                className="flex items-center space-x-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition px-4 py-2"
              >
                <LogIn size={18} />
                <span>登录</span>
              </button>
              <button 
                onClick={handleRegister} 
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2.5 rounded-2xl text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
              >
                <UserPlus size={18} />
                <span>免费注册</span>
              </button>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          {children}
        </main>

        {/* 底部页脚：修正彩色图标渲染 */}
        <footer className="bg-white border-t border-gray-100 py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex justify-center items-center space-x-12 mb-12">
              {/* GitHub */}
              <a href="https://github.com/hezhanleiok/ai" target="_blank" className="group transition-transform hover:scale-125 duration-300">
                <Github size={40} className="text-gray-400 group-hover:text-[#24292e] transition-colors" />
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/@xiaoheai" target="_blank" className="group transition-transform hover:scale-125 duration-300">
                <Youtube size={40} className="text-gray-400 group-hover:text-[#FF0000] transition-colors" />
              </a>
              {/* Twitter/X */}
              <a href="https://x.com/xiaoheyiyi" target="_blank" className="group transition-transform hover:scale-125 duration-300">
                <Twitter size={40} className="text-gray-400 group-hover:text-[#1DA1F2] transition-colors" />
              </a>
            </div>
            
            <div className="flex justify-center space-x-8 text-sm font-bold text-gray-400 mb-8">
              <Link href="/about" className="hover:text-blue-600 transition">关于我们</Link>
              <Link href="/privacy" className="hover:text-blue-600 transition">隐私政策</Link>
              <Link href="/contact" className="hover:text-blue-600 transition">联系方式</Link>
            </div>

            <p className="text-gray-400 text-xs tracking-widest uppercase">
              © 2026 AI NAV HUB | 让生产力连接未来
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
