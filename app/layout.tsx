import './globals.css'
import Link from 'next/link'
import { Github, Youtube, Twitter, LogIn, UserPlus } from 'lucide-react'

export const metadata = {
  title: 'AI 效率工具导航 2026',
  description: '发现最赚钱的 AI 副业工具',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className="flex flex-col min-h-screen bg-[#fafafa] relative">
        {/* 背景装饰 */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
        <div className="fixed top-0 -z-10 h-full w-full bg-gradient-to-b from-blue-50/50 to-transparent"></div>

        {/* 顶部导航栏 */}
        <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
            {/* 左侧 Logo 与 分类 */}
            <div className="flex items-center space-x-10">
              <Link href="/" className="font-black text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI HUB
              </Link>
              
              <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-gray-600">
                <Link href="/" className="hover:text-blue-600 transition">发现工具</Link>
                <Link href="/software" className="hover:text-blue-600 transition">精品软件</Link>
                <Link href="/articles" className="hover:text-blue-600 transition">深度文章</Link>
              </div>
            </div>
            
            {/* 右上角：登录注册 */}
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-1 text-sm font-bold text-gray-600 hover:text-blue-600 transition px-4 py-2">
                <LogIn size={18} />
                <span>登录</span>
              </button>
              <button className="flex items-center space-x-1 bg-blue-600 text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                <UserPlus size={18} />
                <span>免费注册</span>
              </button>
            </div>
          </div>
        </nav>

        {/* 页面主要内容 */}
        <main className="flex-grow">{children}</main>

        {/* 底部页脚：大尺寸、彩色悬停图标 */}
        <footer className="bg-white border-t py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col items-center">
              
              {/* 彩色图标组 */}
              <div className="flex items-center space-x-12 mb-10">
                <a href="https://github.com/hezhanleiok/ai" target="_blank" 
                   className="text-gray-400 hover:text-black transition-all transform hover:scale-125 duration-300">
                  <Github size={40} />
                </a>
                <a href="https://www.youtube.com/@xiaoheai" target="_blank" 
                   className="text-gray-400 hover:text-[#FF0000] transition-all transform hover:scale-125 duration-300">
                  <Youtube size={40} />
                </a>
                <a href="https://x.com/xiaoheyiyi" target="_blank" 
                   className="text-gray-400 hover:text-[#1DA1F2] transition-all transform hover:scale-125 duration-300">
                  <Twitter size={40} />
                </a>
              </div>

              {/* 底部辅助链接 */}
              <div className="flex justify-center space-x-8 text-sm font-bold text-gray-400 mb-8">
                <Link href="/about" className="hover:text-blue-600 transition">关于我们</Link>
                <Link href="/privacy" className="hover:text-blue-600 transition">隐私政策</Link>
                <Link href="/contact" className="hover:text-blue-600 transition">联系方式</Link>
              </div>
              
              <p className="text-gray-400 text-xs tracking-widest">
                © 2026 AI NAV HUB | 让每一位数字游民拥有更强大的生产力
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
