'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  // 新增：中间搜索框的状态
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    supabase.from('posts')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(6)
      .then(({ data }) => setPosts(data || []));
  }, []);

  // 新增：搜索提交逻辑
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchKeyword.trim()) return;
    // 跳转到分类页面并带上搜索参数，与导航栏搜索逻辑对齐
    window.location.href = `/category/article?search=${encodeURIComponent(searchKeyword)}`;
  };

  return (
    <div className="flex flex-col items-center">
      {/* 找回中间 2026 搜索区域 */}
      <section className="w-full max-w-4xl px-4 py-24 text-center">
        <h1 className="text-6xl font-black mb-6 tracking-tighter text-gray-900">
          发现 <span className="text-blue-600">2026 AI</span> 生产力 极限
        </h1>
        <p className="text-gray-400 font-bold text-xl mb-12">聚合全球顶尖 AI 工具，助力每一个数字游民开启自动化收益时代。</p>
        
        {/* 修复：将 div 改为 form 并绑定 onSubmit */}
        <form 
          onSubmit={handleSearch} 
          className="relative max-w-2xl mx-auto shadow-2xl shadow-blue-100 rounded-3xl overflow-hidden border border-gray-100 bg-white"
        >
          <input 
            type="text" 
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)} // 实时记录输入
            placeholder="搜索你需要的 AI 工具 (中英文均可)..." 
            className="w-full px-8 py-6 text-lg outline-none pr-32 font-medium" 
          />
          {/* 确保 button 是 type="submit" 以便响应回车键 */}
          <button 
            type="submit" 
            className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-8 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <Search size={20}/> 搜索
          </button>
        </form>
      </section>

      {/* 文章展示区 */}
      <section className="w-full max-w-7xl px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map(post => (
            <Link href={`/articles/${post.id}`} key={post.id} className="group bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all">
              <img src={post.cover_url || 'https://via.placeholder.com/400x200'} className="w-full h-48 object-cover rounded-3xl mb-6 shadow-inner" alt="封面" />
              <h3 className="text-xl font-black mb-4 group-hover:text-blue-600 transition-colors leading-tight">{post.title}</h3>
              <div className="flex justify-between items-center text-sm font-bold text-gray-400">
                <span className="uppercase tracking-widest text-[10px]">{post.category}</span>
                <span>阅读全文 →</span>
              </div>
            </Link>
          ))}
        </div>
        
        {posts.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200 text-gray-400 font-bold">
            暂无发布的文章，请进入管理后台创作
          </div>
        )}
      </section>
    </div>
  );
}
