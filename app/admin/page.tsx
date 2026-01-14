'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  FileText, PlusCircle, Trash2, Edit3, Lock, 
  Tag, Eye, Image as ImageIcon, LayoutDashboard, ChevronRight 
} from 'lucide-react';

export default function SuperAdmin() {
  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list');
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 获取文章列表
  const fetchPosts = async () => {
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    setPosts(data || []);
  };

  useEffect(() => { fetchPosts(); }, []);

  // 删除文章
  const deletePost = async (id: string) => {
    if (!confirm('确定要删除这篇文章吗？此操作不可撤销。')) return;
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) alert('删除失败');
    else fetchPosts();
  };

  // 发布文章提交
  const handlePublish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const { error } = await supabase.from('posts').insert([{
      title: formData.get('title'),
      content: formData.get('content'),
      member_content: formData.get('member_content'),
      cover_url: formData.get('cover_url'),
      category: formData.get('category'),
      status: formData.get('status')
    }]);

    setLoading(false);
    if (error) alert('发布失败: ' + error.message);
    else {
      alert('发布成功！');
      setActiveTab('list');
      fetchPosts();
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* 左侧侧边栏 */}
      <div className="w-64 bg-white border-r border-gray-100 flex flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <LayoutDashboard size={18} />
          </div>
          <span className="font-black text-xl tracking-tight">管理后台</span>
        </div>
        
        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab('list')}
            className={`w-full flex items-center justify-between p-3 rounded-xl font-bold transition-all ${activeTab === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <div className="flex items-center gap-3"><FileText size={18}/> 文章管理</div>
            <ChevronRight size={14} opacity={activeTab === 'list' ? 1 : 0}/>
          </button>
          <button 
            onClick={() => setActiveTab('create')}
            className={`w-full flex items-center justify-between p-3 rounded-xl font-bold transition-all ${activeTab === 'create' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <div className="flex items-center gap-3"><PlusCircle size={18}/> 发布新文</div>
            <ChevronRight size={14} opacity={activeTab === 'create' ? 1 : 0}/>
          </button>
        </nav>
      </div>

      {/* 右侧内容区 */}
      <div className="flex-grow p-10 overflow-y-auto">
        {activeTab === 'list' ? (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black mb-8 text-gray-900">文章列表管理</h2>
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 text-xs font-black uppercase text-gray-400 border-b border-gray-100">
                  <tr>
                    <th className="px-8 py-5">封面 & 标题</th>
                    <th className="px-6 py-5">分类</th>
                    <th className="px-6 py-5">状态</th>
                    <th className="px-6 py-5 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {posts.map(post => (
                    <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <img src={post.cover_url || 'https://via.placeholder.com/40'} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                          <div>
                            <div className="font-bold text-gray-900 line-clamp-1">{post.title}</div>
                            {post.member_content && <div className="text-[10px] text-blue-500 font-black flex items-center gap-1 mt-1"><Lock size={10}/> 包含隐藏内容</div>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-xs font-black px-3 py-1 bg-gray-100 rounded-full text-gray-500 uppercase tracking-tighter">{post.category}</span>
                      </td>
                      <td className="px-6 py-5">
                        {post.status === 'published' 
                          ? <span className="text-xs font-black text-green-500 flex items-center gap-1"><Eye size={14}/> 已发布</span>
                          : <span className="text-xs font-black text-gray-300 flex items-center gap-1 italic"><Edit3 size={14}/> 草稿</span>
                        }
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button onClick={() => deletePost(post.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {posts.length === 0 && <div className="p-20 text-center text-gray-400 font-bold">暂无文章，开始创作吧！</div>}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handlePublish} className="space-y-8">
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-3xl font-black text-gray-900">撰写新篇章</h2>
                <select name="status" className="bg-white border border-gray-200 px-4 py-2 rounded-xl font-bold text-sm outline-none text-blue-600 shadow-sm">
                  <option value="published">立即发布</option>
                  <option value="draft">保存为草稿</option>
                </select>
              </div>

              <input name="title" placeholder="输入标题..." required className="w-full text-4xl font-black bg-transparent border-none outline-none placeholder:text-gray-200" />

              <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2"><ImageIcon size={12}/> 封面图片链接</label>
                  <input name="cover_url" placeholder="https://..." className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-100 transition-all font-medium text-sm" />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2"><Tag size={12}/> 文章分类</label>
                  <select name="category" className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-100 font-bold text-sm outline-none">
                    <option value="tool">发现工具</option>
                    <option value="software">精品软件</option>
                    <option value="article">深度文章</option>
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
                <label className="block text-xs font-black text-gray-400 mb-4 uppercase tracking-widest">公开内容</label>
                <textarea name="content" rows={10} required className="w-full border-none outline-none text-lg leading-relaxed placeholder:text-gray-200 font-medium" placeholder="输入所有人可见的内容..." />
              </div>

              <div className="bg-blue-600 rounded-[2rem] p-8 text-white shadow-xl shadow-blue-100">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest mb-4 opacity-80"><Lock size={14}/> 会员专属隐藏内容</label>
                <textarea name="member_content" rows={5} className="w-full bg-white/10 border border-white/20 rounded-2xl outline-none p-6 text-lg placeholder:text-white/30 text-white font-medium shadow-inner" placeholder="输入只有登录后才能看到的关键部分..." />
              </div>

              <button disabled={loading} className="w-full bg-gray-900 text-white py-6 rounded-3xl font-black text-xl hover:bg-black transition-all shadow-xl active:scale-[0.98]">
                {loading ? '发布中...' : '确认发布文章'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
