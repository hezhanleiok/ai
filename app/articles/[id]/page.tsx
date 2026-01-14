'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import { Lock, MessageCircle, Send } from 'lucide-react';

export default function ArticleDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // 1. 获取用户信息
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    // 2. 获取文章正文
    supabase.from('posts').select('*').eq('id', id).single().then(({ data }) => setPost(data));
    // 3. 获取评论列表
    fetchComments();
  }, [id]);

  const fetchComments = async () => {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: true });
    setComments(data || []);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert('请先登录后再评论');
    if (!newComment.trim()) return;

    const { error } = await supabase.from('comments').insert([
      {
        post_id: id,
        content: newComment,
        user_email: user.email
      }
    ]);

    if (error) {
      alert('评论失败: ' + error.message);
    } else {
      setNewComment('');
      fetchComments(); // 立即刷新列表
    }
  };

  if (!post) return <div className="p-20 text-center text-gray-400 font-bold">文章努力加载中...</div>;

  return (
    <article className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-black mb-10 leading-tight text-gray-900">{post.title}</h1>
      
      {/* 使用 ql-editor 类名以适配你修改后的 globals.css */}
      <div className="ql-editor max-w-none mb-12" 
           dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* 隐藏内容拦截逻辑 */}
      {post.member_content && (
        <div className="mt-10 p-1 bg-gradient-to-b from-blue-50 to-white rounded-[2.5rem] border border-blue-100 overflow-hidden relative">
          {user ? (
            <div className="p-10">
              <div className="text-blue-600 font-black mb-6 flex items-center gap-2 border-b border-blue-50 pb-4 italic">🔒 会员专享内容已解锁</div>
              <div className="ql-editor" dangerouslySetInnerHTML={{ __html: post.member_content }} />
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

      {/* --- 评论系统 --- */}
      <div className="mt-24 border-t pt-16">
        <h2 className="text-3xl font-black mb-10 flex items-center gap-3">
          <MessageCircle className="text-blue-600" /> 交流讨论 ({comments.length})
        </h2>

        {/* 评论列表显示 */}
        <div className="space-y-8 mb-12">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center font-bold text-white shadow-md">
                {comment.user_email[0].toUpperCase()}
              </div>
              <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 flex-grow">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-black text-gray-900">{comment.user_email}</span>
                  <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 font-medium leading-relaxed">{comment.content}</p>
              </div>
            </div>
          ))}
          {comments.length === 0 && (
            <div className="text-center py-10 bg-gray-50 rounded-3xl border-2 border-dashed">
              <p className="text-gray-400 font-bold">暂时还没有评论，期待你的见解 ✨</p>
            </div>
          )}
        </div>

        {/* 发表评论表单 */}
        {user ? (
          <form onSubmit={handleSubmitComment} className="relative">
            <textarea 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="分享你的看法..." 
              className="w-full bg-white border border-gray-200 rounded-3xl p-6 h-36 focus:ring-4 focus:ring-blue-100 outline-none transition font-medium text-lg shadow-sm"
            />
            <button type="submit" className="absolute bottom-5 right-5 bg-blue-600 text-white p-4 rounded-2xl shadow-xl shadow-blue-100 hover:scale-105 transition active:scale-95">
              <Send size={20} />
            </button>
          </form>
        ) : (
          <div className="bg-blue-50 p-10 rounded-[2.5rem] text-center border-2 border-dashed border-blue-200">
            <p className="text-blue-600 font-black text-lg">登录后即可参与深度讨论 ✨</p>
          </div>
        )}
      </div>
    </article>
  );
}
