'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
// 该文件在 app/articles/[id] 三级目录下，必须跳三级才能到根目录
import { supabase } from '../../../lib/supabase';
import { Lock } from 'lucide-react';

export default function ArticleDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    supabase.from('posts').select('*').eq('id', id).single().then(({ data }) => setPost(data));
  }, [id]);

  if (!post) return <div className="p-20 text-center text-gray-400 font-bold">文章努力加载中...</div>;

  return (
    <article className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-black mb-10 leading-tight">{post.title}</h1>
      
      {/* 所有人可见内容 */}
      <div className="prose prose-lg prose-blue max-w-none mb-12" 
           dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* 隐藏内容拦截 */}
      {post.member_content && (
        <div className="mt-10 p-1 bg-gradient-to-b from-blue-50 to-white rounded-[2.5rem] border border-blue-100 overflow-hidden relative">
          {user ? (
            <div className="p-10">
              <div className="text-blue-600 font-black mb-4 flex items-center gap-2 border-b border-blue-50 pb-4 italic">🔒 会员专享内容已解锁</div>
              <div dangerouslySetInnerHTML={{ __html: post.member_content }} />
            </div>
          ) : (
            <div className="p-16 text-center">
               <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-100">
                  <Lock size={32} />
               </div>
               <h3 className="text-2xl font-black mb-4 tracking-tighter">此部分内容仅限登录查看</h3>
               <p className="text-gray-400 mb-8 font-medium">请登录后解锁完整工具链接和关键步骤</p>
               <button onClick={() => window.location.href='/#login'} className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black shadow-lg">登录账号</button>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
