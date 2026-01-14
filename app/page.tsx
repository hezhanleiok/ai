'use client';

import { useEffect, useState } from 'react';
// 必须是 ../ 才能跳出 app 文件夹找到根目录的 lib
import { supabase } from '../lib/supabase';
import Link from 'next/link';

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false })
          .limit(6); // 增加到显示6篇
        
        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        console.error("加载失败:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {posts.map(post => (
          <Link href={`/articles/${post.id}`} key={post.id} className="group bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            {post.cover_url ? (
              <img src={post.cover_url} className="w-full h-52 object-cover rounded-3xl mb-6" alt="封面" />
            ) : (
              <div className="w-full h-52 bg-gray-50 rounded-3xl mb-6 flex items-center justify-center text-gray-300 font-bold">无封面图</div>
            )}
            <h3 className="text-2xl font-black mb-4 group-hover:text-blue-600 transition-colors leading-tight">{post.title}</h3>
            <div className="flex justify-between items-center text-sm">
               <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-black uppercase tracking-tighter">{post.category || '未分类'}</span>
               <span className="font-bold text-gray-400">阅读全文 →</span>
            </div>
          </Link>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-32 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-black text-xl italic uppercase tracking-widest">探索中... 暂无已发布的文章</p>
        </div>
      )}
    </div>
  );
}
