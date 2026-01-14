'use client';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">
          关于 <span className="text-blue-600">AI HUB</span>
        </h1>
        <p className="text-xl text-gray-500 font-medium leading-relaxed">
          赋能每一位数字游民，在 AI 时代重塑生产力。
        </p>
      </div>

      <div className="space-y-12">
        <section className="bg-white p-10 rounded-[3rem] border shadow-sm">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            我们的愿景
          </h2>
          <p className="text-gray-600 leading-loose text-lg">
            AI HUB 成立于 2026 年，致力于成为全球领先的 AI 效率工具导航平台。我们深信，未来的竞争不是人与 AI 的竞争，而是掌握 AI 的人与未掌握 AI 的人之间的竞争。我们通过深度评测与实战案例，打破信息差，让每个人都能通过 AI 提升 10 倍效率。
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-10 rounded-[3rem]">
            <h3 className="text-xl font-black mb-4 text-blue-700">深度评测</h3>
            <p className="text-blue-900/70 leading-relaxed font-medium">
              不只看功能，更看应用场景。我们的 Agent 团队每日筛选上百款工具，只推荐真正能解决问题的精品。
            </p>
          </div>
          <div className="bg-gray-900 p-10 rounded-[3rem] text-white">
            <h3 className="text-xl font-black mb-4 text-blue-400">一人公司 SOP</h3>
            <p className="text-gray-400 leading-relaxed font-medium">
              分享全自动化内容分发、意图驱动的工作流，助力个人开发者构建自动化收入护城河。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
