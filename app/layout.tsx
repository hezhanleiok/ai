import './globals.css'
import Link from 'next/link'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className="flex flex-col min-h-screen">
        <nav className="border-b p-4 bg-white">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="font-bold text-xl text-blue-600">AI Hub</Link>
            <div className="space-x-4">
              <Link href="/about" className="hover:text-blue-600">关于</Link>
              <Link href="/contact" className="hover:text-blue-600">联系</Link>
            </div>
          </div>
        </nav>

        <main className="flex-grow">{children}</main>

        <footer className="border-t p-8 bg-gray-50 text-center text-sm text-gray-500">
          <div className="space-x-4 mb-2">
            <Link href="/privacy">隐私政策</Link>
            <Link href="/about">关于我们</Link>
            <Link href="/contact">联系我们</Link>
          </div>
          <p>© 2026 AI 效率工具导航 | 邮箱: hezhanleiok@gmail.com</p>
        </footer>
      </body>
    </html>
  )
}
