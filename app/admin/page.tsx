'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { FileText, PlusCircle, Trash2, Edit3, Image as ImageIcon, Tag, LayoutDashboard, Save } from 'lucide-react';

export default function BloggerAdmin() {
  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list');
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const quillRef = useRef<any>(null);

  // 初始化全功能编辑器
  useEffect(() => {
    if (activeTab === 'create') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://cdn.quilljs.com/1.3.6/quill.js';
      script.onload = () => {
        if (typeof window !== 'undefined' && (window as any).Quill) {
          quillRef.current = new (window as any).Quill('#editor', {
            theme: 'snow',
            modules: {
              toolbar: [
                [{ 'header': [1, 2, 3, false] }, { 'size': ['small', false, 'large', 'huge'] }], // 字体大小
                ['bold', 'italic', 'underline', 'strike'], 
                [{ 'color': [] }, { 'background': [] }], // 颜色
                [{ 'align': [] }], // 对齐
                ['blockquote', 'code-block'], // 引用
                ['link', 'image', 'video'], // 图片、视频、链接
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['clean']
              ]
            }
          });
        }
      };
      document.head.appendChild(script);
    }
  }, [activeTab]);

  const fetchPosts = async () => {
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    setPosts(data || []);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handlePublish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const htmlContent = quillRef.current ? quillRef.current.root.innerHTML : '';
    const formData = new FormData(e.currentTarget);
    
    const { error } = await supabase.from('posts').insert([{
      title: formData.get('title'),
      content: htmlContent, // 获取全功能编辑器内容
      cover_url: formData.get('cover_url'),
      category: formData.get('category'),
      status: 'published'
    }]);

    setLoading(false);
    if (error) alert('发布失败: ' + error.message);
    else {
      alert('文章发布成功！');
      setActiveTab('list');
      fetchPosts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-64 bg-white border-r p-6 sticky top-0 h-screen">
        <h2 className="font-black text-xl mb-10 flex items-center gap-2 text-blue-600"><LayoutDashboard size={20}/> 管理后台</h2>
        <nav className="space-y-3">
          <button onClick={() => setActiveTab('list')} className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition ${activeTab === 'list' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-400 hover:bg-gray-100'}`}><FileText size={18}/> 文章管理</button>
          <button onClick={() => setActiveTab('create')} className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition ${activeTab === 'create' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-400 hover:bg-gray-100'}`}><PlusCircle size={18}/> 发布新文</button>
        </nav>
      </div>

      <div className="flex-grow p-12">
        {activeTab === 'list' ? (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black mb-10 text-gray-900">内容管理中心</h2>
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-xs font-black uppercase text-gray-400 border-b">
                  <tr><th className="px-8 py-5">文章标题</th><th className="px-8 py-5">分类</th><th className="px-8 py-5 text-right">操作</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {posts.map(post => (
                    <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-5 font-bold text-gray-700">{post.title}</td>
                      <td className="px-8 py-5 text-xs font-black uppercase text-blue-500 bg-blue-50/50 rounded-full inline-block mt-4">{post.category}</td>
                      <td className="px-8 py-5 text-right"><button onClick={async () => { if(confirm('删除?')) { await supabase.from('posts').delete().eq('id', post.id); fetchPosts(); }}} className="text-red-300 hover:text-red-500 transition"><Trash2 size={20}/></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handlePublish} className="space-y-8">
              <input name="title" placeholder="文章标题..." required className="w-full text-4xl font-black bg-transparent border-none outline-none placeholder:text-gray-200" />
              <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-3xl shadow-sm border">
                <div><label className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">封面图链接</label><input name="cover_url" placeholder="https://..." className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-100 outline-none" /></div>
                <div><label className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">文章分类</label><select name="category" className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 font-bold outline-none"><option value="tool">发现工具</option><option value="software">精品软件</option><option value="article">深度文章</option></select></div>
              </div>
              <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
                {/* 核心：带工具栏的富文本编辑区 */}
                <div id="editor" style={{ height: '500px' }} className="text-lg"></div>
              </div>
              <button disabled={loading} className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition flex items-center justify-center gap-2"><Save size={24}/> {loading ? '同步中...' : '立即发表文章'}</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
