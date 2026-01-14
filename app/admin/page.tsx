'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { FileText, Image as ImageIcon, Video, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BloggerAdmin() {
  const [loading, setLoading] = useState(false);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    // 动态加载专业编辑器样式和脚本
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
              [{ 'header': [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],        // 文本格式
              [{ 'color': [] }, { 'background': [] }],          // 颜色
              [{ 'align': [] }],                                // 对齐
              ['link', 'image', 'video'],                       // 插入媒体（支持图片和视频）
              ['blockquote', 'code-block'],                     // 引用和代码
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],     // 列表
              ['clean']                                         // 清除格式
            ]
          },
          placeholder: '开始创作您的精彩内容... 支持图片粘贴、视频链接嵌入。'
        });
      }
    };
    document.head.appendChild(script);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const htmlContent = quillRef.current ? quillRef.current.root.innerHTML : '';
    const formData = new FormData(e.target as HTMLFormElement);

    const { error } = await supabase.from('posts').insert([{
      title: formData.get('title'),
      content: htmlContent,
      cover_url: formData.get('cover_url'),
      category: formData.get('category'), // 可以在这里标注是“工具推荐”还是“深度文章”
    }]);

    setLoading(false);
    if (error) alert('保存失败: ' + error.message);
    else {
      alert('发布成功！');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] pb-24">
      {/* 顶部操作条 */}
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition">
              <ArrowLeft size={24} className="text-gray-600" />
            </Link>
            <h1 className="text-xl font-bold text-gray-800">创作中心</h1>
          </div>
          <button 
            form="post-form" 
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition active:scale-95"
          >
            <Save size={20} />
            {loading ? '发布中...' : '立即发表'}
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto mt-12 px-6">
        <form id="post-form" onSubmit={handleSubmit} className="space-y-8">
          {/* 标题区 */}
          <input 
            name="title" 
            placeholder="在此输入标题..." 
            required 
            className="w-full text-5xl font-black placeholder:text-gray-200 border-none outline-none bg-transparent"
          />

          {/* 元数据设置区 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">封面图链接</label>
              <input name="cover_url" placeholder="https://..." className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-100 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">内容分类</label>
              <select name="category" className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-100 transition-all font-bold">
                <option value="article">深度文章</option>
                <option value="tool">工具推荐</option>
                <option value="software">精品软件</option>
              </select>
            </div>
          </div>

          {/* 富文本编辑器主体 */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div id="editor" style={{ minHeight: '600px' }} className="text-lg leading-relaxed"></div>
          </div>
        </form>
      </div>
    </div>
  );
}
