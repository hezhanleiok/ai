import { supabase } from '../lib/supabase'; // 保持相对路径

export default async function Home({ searchParams }: { searchParams: { q?: string; category?: string } }) {
  const query = searchParams?.q || '';
  const selectedCategory = searchParams?.category || ''; // 接收分类参数
  
  // 1. 构建基础查询
  let dbQuery = supabase.from('tools').select('*');
  
  // 2. 如果有搜索词，按名称或描述模糊匹配
  if (query) {
    dbQuery = dbQuery.or(`name.ilike.%${query}%,desc.ilike.%${query}%`);
  }
  
  // 3. 如果点击了分类（如：Software, Chatbot），按分类过滤
  if (selectedCategory) {
    dbQuery = dbQuery.eq('category', selectedCategory);
  }

  const { data: tools } = await dbQuery.order('created_at', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      {/* 标题区：根据 2026 风格优化 */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
          发现 2026 <span className="text-blue-600">AI 生产力</span> 极限
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
          聚合全球顶尖 AI 工具，助力每一个数字游民开启自动化收益时代。
        </p>
      </div>

      {/* 搜索框：保持毛玻璃质感 */}
      <div className="max-w-2xl mx-auto mb-20 relative group">
        <form action="/" method="get">
          <input 
            name="q" 
            defaultValue={query}
            placeholder="搜索你需要的 AI 工具 (中英文均可)..." 
            className="w-full px-8 py-5 rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-blue-100/50 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-lg"
          />
          <button type="submit" className="absolute right-3 top-3 bg-blue-600 text-white px-8 py-2.5 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
            搜索
          </button>
        </form>
      </div>

      {/* 工具展示网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools && tools.length > 0 ? (
          tools.map((tool: any) => (
            <div key={tool.id} className="group bg-white p-8 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              {/* 彩色首字母图标，增强视觉丰富度 */}
              <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 rounded-2xl mb-6 flex items-center justify-center text-xl font-black">
                {tool.name.charAt(0)}
              </div>
              <h2 className="text-2xl font-bold mb-3 text-gray-800">{tool.name}</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">{tool.desc}</p>
              
              <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                <span className="text-xs font-bold text-blue-500 bg-blue-50 px-4 py-1.5 rounded-full uppercase tracking-wider">
                  {tool.category || 'Efficiency'}
                </span>
                <a href={tool.url} target="_blank" className="text-sm font-bold text-gray-400 group-hover:text-blue-600 transition">
                  立即访问 →
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium text-lg">
              {query ? `未找到与 "${query}" 相关的工具` : "数据库正在同步中，请稍后再试..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
