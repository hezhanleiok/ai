'use client';

import { useEffect, useState, Suspense } from 'react'; // 增加 Suspense
import { useParams, useSearchParams } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import Link from 'next/link';

// 将搜索逻辑抽离到一个子组件中，以便使用 useSearchParams
function CategoryContent() {
  const { type } = useParams();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search'); // 获取 URL 里的 ?search=...
  
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const titleMap: any = {
    'article': '深度文章',
    'software': '精品软件',
    'tool': '发现工具'
  };

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      setLoading(true);
      
      // 构建基础查询
      let query = supabase
        .from('posts')
        .select('*')
        .eq('status', 'published');

      // 逻辑判断：如果有搜索词，则全表标题模糊搜索；否则按分类过滤
      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      } else {
        query = query.eq('category', type);
      }

      const { data } = await query.order('created_at', { ascending: false });
      
      setPosts(data || []);
      setLoading(false);
    };

    fetchCategoryPosts();
  }, [type, searchQuery]); // 监听 type 或 searchQuery 的变化

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-black mb-12 flex items-center gap-4">
        <span className="w-2 h-10 bg-blue-600 rounded-full"></span>
        {searchQuery ? `搜索: ${searchQuery}` : (titleMap[type as string] || '全部分类')}
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
                <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                  {post.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed">
          <p className="text-gray-400 font-bold">未找到相关内容</p>
        </div>
      )}
    </div>
  );
}

// 主页面组件包裹在 Suspense 中
export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">加载中...</div>}>
      <CategoryContent />
    </Suspense>
  );
}
