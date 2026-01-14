'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Bookmark, Send, Clock, Settings, Zap, Star } from 'lucide-react';

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  if (!user) return <div className="p-20 text-center font-bold text-gray-400">正在加载您的个人空间...</div>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      {/* 头部：欢迎信息 */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 mb-10 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <img src={user.user_metadata.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'} className="w-20 h-20 rounded-full border-4 border-blue-50 shadow-sm" />
          <div>
            <h1 className="text-3xl font-black text-gray-900">你好, {user.user_metadata.full_name || '探索者'}</h1>
            <p className="text-gray-400 font-medium mt-1">今天想发现什么新的 AI 工具？</p>
          </div>
        </div>
        <div className="hidden md:flex gap-4">
          <div className="bg-blue-50 px-6 py-3 rounded-2xl text-center">
            <p className="text-blue-600 font-black text-xl">0</p>
            <p className="text-blue-400 text-xs font-bold">已收藏</p>
          </div>
          <div className="bg-green-50 px-6 py-3 rounded-2xl text-center">
            <p className="text-green-600 font-black text-xl">0</p>
            <p className="text-green-400 text-xs font-bold">已推荐</p>
          </div>
        </div>
      </div>

      {/* 功能网格 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 我的收藏 */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all group cursor-pointer">
          <div className="w-14 h-14 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-pink-500 group-hover:text-white transition-all">
            <Star size={28} />
          </div>
          <h3 className="text-xl font-black mb-2">私藏工具箱</h3>
          <p className="text-gray-400 text-sm leading-relaxed">快速访问您收藏的所有 AI 工具，打造您的专属工作流。</p>
        </div>

        {/* 提交推荐 */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all group cursor-pointer">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-all">
            <Send size={28} />
          </div>
          <h3 className="text-xl font-black mb-2">推荐新工具</h3>
          <p className="text-gray-400 text-sm leading-relaxed">发现好用的 AI 了？分享给站长，审核通过后将获得积分奖励。</p>
        </div>

        {/* 积分权益 */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all group cursor-pointer">
          <div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-500 group-hover:text-white transition-all">
            <Zap size={28} />
          </div>
          <h3 className="text-xl font-black mb-2">会员权益</h3>
          <p className="text-gray-400 text-sm leading-relaxed">升级为 Pro 成员，解锁深度研究报告与收费工具限时优惠。</p>
        </div>
      </div>

      {/* 最近活动 */}
      <div className="mt-12 bg-white rounded-[2.5rem] border border-gray-100 p-10">
        <div className="flex items-center gap-2 mb-8">
          <Clock className="text-blue-600" size={24} />
          <h2 className="text-2xl font-black">最近足迹</h2>
        </div>
        <div className="text-center py-10">
          <p className="text-gray-300 font-bold italic">暂无最近访问记录，快去首页逛逛吧！</p>
        </div>
      </div>
    </div>
  );
}
