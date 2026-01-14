'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function BloggerAdmin() {
  const [activeTab, setActiveTab] = useState<'tool' | 'post'>('post');
  const [loading, setLoading] = useState(false);

  const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const { error } = await supabase.from('posts').insert([{
      title: formData.get('title'),
      content: formData.get('content'), // 这里可以对接富文本组件的值
      cover_url: formData.get('cover_url'),
      video_url: formData.get('video_url'),
    }]);

    setLoading(false);
    if (error) alert('发布失败: ' + error.message);
    else {
      alert('文章已成功发表！');
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="flex gap-4 mb-10 bg-gray-100 p-2 rounded-2xl w-fit">
        <button onClick={() => setActiveTab('post')} className={`px-6 py-2 rounded-xl font-bold transition ${activeTab === 'post' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}>撰写文章</button>
        <button onClick={() => setActiveTab('tool')} className={`px-6 py-2 rounded-xl font-bold transition ${activeTab === 'tool' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}>发布工具</button>
      </div>

      {activeTab === 'post' ? (
        <form onSubmit={handlePostSubmit} className="space-y-6 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-50">
          <h2 className="text-3xl font-black mb-6">像 Blogger 一样创作</h2>
          
          <div>
            <label className="block text-sm font-bold mb-2">文章标题</label>
            <input name="title" placeholder="输入引人入胜的标题..." required className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-4 focus:ring-blue-100 transition-all text-xl font-bold" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2">封面图片 URL</label>
              <input name="cover_url" placeholder="https://..." className="w-full px-6 py-4 bg-gray-50 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">视频嵌入 URL (YouTube/Bilibili)</label>
              <input name="video_url" placeholder="粘贴视频地址..." className="w-full px-6 py-4 bg-gray-50 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">正文内容 (支持 HTML 格式)</label>
            <textarea 
              name="content" 
              rows={15} 
              placeholder="在这里自由创作... 您可以粘贴 HTML 代码来嵌入图片和视频。"
              className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-4 focus:ring-blue-100 transition-all font-mono"
            />
          </div>

          <button disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 rounded-2xl font-black text-xl hover:opacity-90 transition shadow-xl shadow-blue-200">
            {loading ? '正在同步至云端...' : '立即发表文章'}
          </button>
        </form>
      ) : (
        /* 这里保留之前的发布工具表单... */
        <div className="text-center p-20 bg-white rounded-[2.5rem]">工具发布模块已就绪</div>
      )}
    </div>
  );
}
