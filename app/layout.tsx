'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Image as ImageIcon, Lock, Eye, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProfessionalAdmin() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    // 这里的 member_content 对应你刚刚在 SQL Editor 成功运行的字段
    const { error } = await supabase.from('posts').insert([{
      title: formData.get('title'),
      content: formData.get('content'),        // 所有人可见部分
      member_content: formData.get('member_content'), // 仅登录可见的关键部分
      cover_url: formData.get('cover_url'),     // 封面图
      category: formData.get('category'),       // 分类：工具、软件或文章
      status: formData.get('status')            // 状态：已发布或草稿
    }]);

    setLoading(false);
    if (error) alert('发布失败: ' + error.message);
    else {
      alert('文章发布成功！');
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pb-24">
      {/* 顶部操作导航 */}
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 mb-10">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition">
              <ArrowLeft size={24} className="text-gray-600" />
            </Link>
            <h1 className="text-xl font-black text-gray-800">专业创作模式</h1>
          </div>
          <button form="post-form" disabled={loading} className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition flex items-center gap-2">
            <Save size={20} />
            {loading ? '同步至云端...' : '立即发表'}
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6">
        <form id="post-form" onSubmit={handleSubmit} className="space-y-8">
          {/* 标题 */}
          <input name="title" placeholder="在此输入引人入胜的标题..." required className="w-full text-5xl font-black placeholder:text-gray-200 border-none outline-none bg-transparent" />

          {/* 工具栏配置区 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <div>
              <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-3"><ImageIcon size={14}/> 封面图片 URL</label>
              <input name="cover_url" placeholder="https://..." className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-4 focus:ring-blue-100 transition-all" />
            </div>
            <div>
              <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-3"><Tag size={14}/> 内容分类</label>
              <select name="category" className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-4 focus:ring-blue-100 font-bold outline-none">
                <option value="tool">发现工具</option>
                <option value="software">精品软件</option>
                <option value="article">深度文章</option>
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-3"><Eye size={14}/> 发布状态</label>
              <select name="status" className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-4 focus:ring-blue-100 font-bold outline-none text-green-600">
                <option value="published">正式发布</option>
                <option value="draft">保存为草稿</option>
              </select>
            </div>
          </div>

          {/* 公开正文区 */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
            <label className="block text-sm font-black text-gray-400 mb-4 uppercase">普通内容 (所有人可见部分)</label>
            <textarea name="content" rows={12} required className="w-full border-none outline-none text-lg leading-relaxed placeholder:text-gray-200" placeholder="在这里自由创作，您可以粘贴 HTML 或直接撰写内容..." />
          </div>

          {/* 隐藏关键内容区 - 核心功能点 */}
          <div className="bg-blue-50/50 rounded-[2.5rem] border-2 border-dashed border-blue-100 p-8">
            <label className="flex items-center gap-2 text-sm font-black text-blue-600 mb-2 uppercase tracking-widest">
              <Lock size={16}/> 关键内容 (仅登录用户可见)
            </label>
            <p className="text-xs text-blue-400 mb-6 font-bold">如果不填写此项，文章将默认全文公开。</p>
            <textarea name="member_content" rows={6} className="w-full bg-white rounded-2xl border-none outline-none p-6 text-lg shadow-inner placeholder:text-blue-200" placeholder="输入只有登录后才能看到的关键步骤、下载链接或秘密信息..." />
          </div>
        </form>
      </div>
    </div>
  );
}
