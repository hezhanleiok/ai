'use client';
import { Mail, MessageSquare, Zap, Globe, Share2, MousePointer2 } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      {/* 头部标题区 */}
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-black mb-6 tracking-widest uppercase">
          Partnership
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
          商务合作与媒体联络
        </h1>
        <p className="text-xl text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed">
          AI HUB 致力于打造全球领先的 AI 生产力聚合平台。我们诚邀工具开发者、创作者及品牌方，共同探索 AI 赋能数字游民的无限可能。
        </p>
      </div>

      {/* 合作细分卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {[
          { icon: <Zap className="text-blue-600" />, title: "产品入驻", desc: "申请将您的 AI 工具加入我们的精品库，直接触达万名高频 AI 用户。" },
          { icon: <Share2 className="text-purple-600" />, title: "媒体评测", desc: "提供深度产品测评报告与推文展示，为您的工具提供专业背书。" },
          { icon: <Globe className="text-green-600" />, title: "流量合作", desc: "包括但不限于友情链接交换、资源互换及数字游民社区联动。" }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 text-3xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
              {item.icon}
            </div>
            <h3 className="text-2xl font-black mb-4">{item.title}</h3>
            <p className="text-gray-500 font-bold leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 联系卡片主区域 */}
      <div className="bg-gray-900 rounded-[4rem] p-10 md:p-20 text-white flex flex-col lg:flex-row items-center justify-between gap-16 relative overflow-hidden">
        {/* 装饰性背景 */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full"></div>
        
        <div className="flex-1 space-y-10 z-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
              准备好开启合作了吗？
            </h2>
            <p className="text-gray-400 text-lg font-bold">
              我们的团队通常会在 24 小时内回复您的所有咨询。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <a href="mailto:hezhanleiok@gmail.com" className="flex items-center gap-6 bg-white/5 hover:bg-white/10 p-6 rounded-[2rem] border border-white/10 transition group">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-black uppercase tracking-widest mb-1">官方邮箱</p>
                <p className="text-xl font-bold group-hover:text-blue-400 transition">hezhanleiok@gmail.com</p>
              </div>
              <MousePointer2 className="ml-auto text-gray-700 group-hover:text-white transition" size={20} />
            </a>

            <div className="flex items-center gap-6 bg-white/5 p-6 rounded-[2rem] border border-white/10">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <MessageSquare size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-black uppercase tracking-widest mb-1">商务微信</p>
                <p className="text-xl font-bold text-green-400">ID: hezhanlei</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 二维码展示区 */}
        <div className="relative group z-10">
          <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition"></div>
          <div className="bg-white p-6 rounded-[3rem] shadow-2xl relative">
            <img 
              src="/wechat-qr.png" 
              alt="WeChat QR Code" 
              className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl" 
            />
            <p className="text-center text-gray-400 font-black text-xs mt-6 tracking-widest uppercase">
              扫码立即沟通
            </p>
          </div>
        </div>
      </div>

      <p className="text-center mt-12 text-gray-300 font-bold text-sm italic">
        * 请在添加联系方式时备注“AI HUB 合作”，以便我们快速通过审核。
      </p>
    </div>
  );
}
