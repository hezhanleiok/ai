'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function CategoryPage() {
  const { type } = useParams();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 分类名称映射，让显示更好看
  const titleMap: any = {
    'article': '深度文章',
    'software': '精品软件',
    'tool': '发现工具'
  };

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('category', type) // 根据 URL 里的 type 过滤
        .eq('status', 'published')
        .order('created_at', { ascending: false });
      
      setPosts(data || []);
      setLoading(false);
    };

    if (type) fetchCategoryPosts();
  }, [type]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-black mb-12 flex items-center gap-4">
        <span className="w-2 h-10 bg-blue-600 rounded-full"></span>
        {titleMap[type as string] || '全部分类'}
      </h1>

      {loading ? (
        <div className="text-center py-20 text-gray-400 font-bold">内容加载中...</div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link href={`/articles/${post.id}`} key={post.id} className="group bg-white rounded-[2rem] border overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div className="aspect-video overflow-hidden">
                <img src={post.cover_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-black mb-3 group-hover:text-blue-600 transition">{post.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">{post.content.replace(/<[^>]*>/g, '')}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed">
          <p className="text-gray-400 font-bold">该分类下暂时没有文章</p>
        </div>
      )}
    </div>
  );
}
