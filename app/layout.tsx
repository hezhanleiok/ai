import './globals.css'
import Link from 'next/link'
import { Github, Youtube, Twitter, Globe } from 'lucide-react'

export const metadata = {
  title: 'AI 效率工具导航 2026',
  description: '发现最赚钱的 AI 副业工具',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className="flex flex-col min-h-screen bg-[#fafafa] relative">
        {/* 背景美化：漂亮的渐变和纹理 */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
        <div className="fixed top-0 -z-10 h-full w-full bg-gradient-to-b from-blue-50/50 to-transparent"></div>

        {/* 导航栏 */}
        <nav className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
            <Link href="/" className="font-black text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI HUB
            </Link>
            
            <div className="flex items-center space-x-6">
              {/* 中英文切换按钮 */}
              <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition group border px-3 py-1 rounded-full">
                <Globe size={16} className="group-hover:rotate-12 transition-transform" />
                <span className="text-sm font-medium">EN / 中文</span>
              </button>

              {/* 社交链接：按你要求的地址 */}
              <div className="flex items-center space-x-4 border-l pl-6">
                <a href="https://github.com/hezhanleiok/ai" target="_blank" title="GitHub" className="text-gray-400 hover:text-black transition transform hover:scale-110">
                  <Github size={20} />
                </a>
                <a href="https://www.youtube.com/@xiaoheai" target="_blank" title="YouTube" className="text-gray-400 hover:text-red-600 transition transform hover:scale-110">
                  <Youtube size={20} />
                </a>
                <a href="https://x.com/xiaoheyiyi" target="_blank" title="X (Twitter)" className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">{children}</main>

        {/* 页脚 */}
        <footer className="bg-white/80 border-t py-12 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex justify-center space-x-8 text-sm font-medium text-gray-500 mb-6">
              <Link href="/about" className="hover:text-blue-600">关于我们</Link>
              <Link href="/privacy" className="hover:text-blue-600">隐私政策</Link>
              <Link href="/contact" className="hover:text-blue-600">联系方式</Link>
            </div>
            <p className="text-gray-400 text-xs">© 2026 AI Nav Hub | 合作: hezhanleiok@gmail.com</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
