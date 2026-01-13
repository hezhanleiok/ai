import './globals.css'
import Link from 'next/link'
import { Github, Youtube, Twitter, Globe } from 'lucide-react' // 需要在package.json确保有lucide-react

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* 背景装饰：增加专业感 */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>

        <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              AI Hub
            </Link>
            
            <div className="flex items-center space-x-6">
              {/* 语言切换入口（UI 占位） */}
              <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition">
                <Globe size={18} />
                <span className="text-sm">EN / 中文</span>
              </button>

              {/* 社交图标 */}
              <div className="flex items-center space-x-4 border-l pl-6">
                <a href="https://github.com/hezhanleiok/ai" target="_blank" className="text-gray-600 hover:text-black transition">
                  <Github size={20} />
                </a>
                <a href="https://www.youtube.com/@xiaoheai" target="_blank" className="text-gray-600 hover:text-red-600 transition">
                  <Youtube size={20} />
                </a>
                <a href="https://x.com/xiaoheyiyi" target="_blank" className="text-gray-600 hover:text-blue-400 transition">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">{children}</main>

        <footer className="border-t py-12 bg-white/50 backdrop-blur-sm text-center">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center space-x-8 mb-6 text-sm font-medium text-gray-500">
              <Link href="/privacy" className="hover:text-blue-600">隐私政策</Link>
              <Link href="/about" className="hover:text-blue-600">关于我们</Link>
              <Link href="/contact" className="hover:text-blue-600">联系我们</Link>
            </div>
            <p className="text-gray-400 text-xs">© 2026 AI 效率工具导航 | 合作: hezhanleiok@gmail.com</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
