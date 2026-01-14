'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    // 获取最新发布的3篇文章
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(3);
      setPosts(data || []);
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link href={`/articles/${post.id}`} key={post.id} className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all">
            <img src={post.cover_url} className="w-full h-48 object-cover rounded-2xl mb-6" alt="封面" />
            <h3 className="text-xl font-black mb-4 group-hover:text-blue-600 transition">{post.title}</h3>
            <div className="flex justify-between items-center text-sm font-bold text-gray-400">
              <span>阅读全文 →</span>
              {post.member_content && <span className="text-blue-500">🔒 包含隐藏内容</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
