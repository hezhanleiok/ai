'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function ProfessionalAdmin() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const { error } = await supabase.from('posts').insert([{
      title: formData.get('title'),
      content: formData.get('content'),        // 普通内容（所有人可见）
      member_content: formData.get('member_content'), // 关键内容（登录可见）
      cover_url: formData.get('cover_url'),
      category: formData.get('category'),
      status: formData.get('status')           // 草稿或发布
    }]);

    setLoading(false);
    if (error) alert('发布失败: ' + error.message);
    else {
      alert('文章发布成功！');
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-black">创作中心</h2>
          <select name="status" className="bg-gray-100 px-4 py-2 rounded-xl font-bold text-sm">
            <option value="published">立即发布</option>
            <option value="draft">保存草稿</option>
          </select>
        </div>

        <input name="title" placeholder="文章标题..." required className="w-full text-4xl font-black border-none outline-none placeholder:text-gray-200" />

        {/* 普通内容区 */}
        <div>
          <label className="block text-sm font-black text-gray-400 mb-2 uppercase tracking-widest">普通内容 (公开预览部分)</label>
          <textarea name="content" rows={8} className="w-full p-6 bg-gray-50 rounded-2xl border-none focus:ring-4 focus:ring-blue-100 transition-all" placeholder="在此输入所有人都能看到的内容..." />
        </div>

        {/* 关键内容区 - 核心功能点 */}
        <div className="p-8 bg-blue-50/50 rounded-[2rem] border-2 border-dashed border-blue-100">
          <label className="block text-sm font-black text-blue-600 mb-2 uppercase tracking-widest">🔒 关键内容 (仅登录用户可见)</label>
          <p className="text-xs text-blue-400 mb-4 font-bold">如果不填写此项，文章将默认全文公开。</p>
          <textarea name="member_content" rows={6} className="w-full p-6 bg-white rounded-2xl border-none focus:ring-4 focus:ring-blue-100 transition-all" placeholder="在此输入只有登录后才能看到的关键步骤、链接或秘密..." />
        </div>

        <button disabled={loading} className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition">
          {loading ? '发布中...' : '确认发表'}
        </button>
      </form>
    </div>
  );
}
