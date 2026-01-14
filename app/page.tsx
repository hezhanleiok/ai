'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('posts').select('*').eq('status', 'published').limit(3).then(({ data }) => setPosts(data || []));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map(post => (
          <Link href={`/articles/${post.id}`} key={post.id} className="bg-white p-8 rounded-[2.5rem] border shadow-sm hover:shadow-xl transition">
            <img src={post.cover_url} className="w-full h-48 object-cover rounded-2xl mb-6" />
            <h3 className="text-xl font-black">{post.title}</h3>
            <p className="text-gray-400 mt-4 font-bold">查看全文 →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
