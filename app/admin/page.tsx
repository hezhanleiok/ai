'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { error } = await supabase.from('tools').insert([{
      name: formData.get('name'),
      desc: formData.get('desc'),
      url: formData.get('url'),
      category: formData.get('category'),
    }]);

    setLoading(false);
    if (error) alert('发布失败: ' + error.message);
    else {
      alert('工具发布成功！');
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-black mb-10">发布新工具</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
        <div>
          <label className="block text-sm font-bold mb-2">工具名称</label>
          <input name="name" required className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 transition-all" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">工具链接 (URL)</label>
          <input name="url" required className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 transition-all" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">分类</label>
          <select name="category" className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 transition-all">
            <option value="Efficiency">效率工具</option>
            <option value="Chatbot">聊天机器人</option>
            <option value="Design">创意设计</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">详细描述</label>
          <textarea name="desc" rows={4} required className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 transition-all" />
        </div>
        <button disabled={loading} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition shadow-xl shadow-blue-100">
          {loading ? '正在提交...' : '确认发布'}
        </button>
      </form>
    </div>
  );
}
