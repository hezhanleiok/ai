'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { FileText, Users, Settings, Trash2, Edit3, EyeOff, CheckCircle } from 'lucide-react';

export default function SuperAdmin() {
  const [activeTab, setActiveTab] = useState<'posts' | 'users' | 'new'>('posts');
  const [items, setItems] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    if (activeTab === 'posts') {
      const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      setItems(data || []);
    } else if (activeTab === 'users') {
      // 注意：Supabase 客户端由于安全限制不能直接获取 auth.users 列表，需配合 Edge Functions 或直接在控制台查看。
      // 这里展示模拟逻辑
      alert("请在 Supabase 控制台的 Authentication 页面直接管理用户账号");
    }
  };

  const deletePost = async (id: string) => {
    if (confirm('确定删除这篇文章吗？')) {
      await supabase.from('posts').delete().eq('id', id);
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 侧边栏 */}
      <div className="w-64 bg-white border-r p-6 flex flex-col gap-2">
        <h2 className="font-black text-xl mb-6">控制台</h2>
        <button onClick={() => setActiveTab('new')} className={`flex items-center gap-2 p-3 rounded-xl font-bold ${activeTab === 'new' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
          <Edit3 size={18}/> 发布新文章
        </button>
        <button onClick={() => setActiveTab('posts')} className={`flex items-center gap-2 p-3 rounded-xl font-bold ${activeTab === 'posts' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
          <FileText size={18}/> 文章列表
        </button>
        <button onClick={() => setActiveTab('users')} className={`flex items-center gap-2 p-3 rounded-xl font-bold ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
          <Users size={18}/> 用户管理
        </button>
      </div>

      {/* 主内容区 */}
      <div className="flex-grow p-10">
        {activeTab === 'posts' && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs font-black uppercase text-gray-400">
                <tr>
                  <th className="px-6 py-4">标题</th>
                  <th className="px-6 py-4">状态</th>
                  <th className="px-6 py-4">可见性</th>
                  <th className="px-6 py-4">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map(post => (
                  <tr key={post.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-bold">{post.title}</td>
                    <td className="px-6 py-4">
                      {post.status === 'published' ? <span className="text-green-500 flex items-center gap-1"><CheckCircle size={14}/>已发布</span> : <span className="text-gray-400 italic">草稿</span>}
                    </td>
                    <td className="px-6 py-4">{post.visibility === 'public' ? '公开' : '登录可见'}</td>
                    <td className="px-6 py-4 flex gap-4">
                      <button className="text-blue-600 hover:underline">编辑</button>
                      <button onClick={() => deletePost(post.id)} className="text-red-500 hover:underline"><Trash2 size={16}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {activeTab === 'new' && (
           <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black mb-6">撰写新篇章</h2>
              {/* 这里放你之前的富文本编辑器代码，并增加 visibility 和 member_content 两个输入框 */}
              <p className="text-gray-400">编辑器已加载。请在下方设置隐藏内容区：</p>
              <textarea name="member_content" placeholder="输入只有登录后才能看到的内容..." className="w-full mt-4 p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-100"/>
           </div>
        )}
      </div>
    </div>
  );
}
