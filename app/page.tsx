import { supabase } from '@/lib/supabase';

export default async function Home({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams?.q || '';
  
  // 模拟数据搜索或对接 Supabase
  let dbQuery = supabase.from('tools').select('*');
  if (query) dbQuery = dbQuery.ilike('name', `%${query}%`);
  const { data: tools } = await dbQuery.order('created_at', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* 英雄区：标题 */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">
          发现未来的 <span className="text-blue-600">AI 副业</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          汇集全球最顶尖的效率工具，助力每一个数字游民开启 AI 自动化收益时代。
        </p>
      </div>

      {/* 搜索按钮区 */}
      <div className="max-w-2xl mx-auto mb-20">
        <form action="/" method="get" className="relative group">
          <input 
            name="q" 
            defaultValue={query}
            placeholder="搜索你感兴趣的 AI 工具 (如: 视频、写作)..." 
            className="w-full px-8 py-5 rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-xl shadow-2xl shadow-blue-100 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg"
          />
          <button type="submit" className="absolute right-3 top-2.5 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
            搜索
          </button>
        </form>
      </div>

      {/* 工具列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools && tools.length > 0 ? (
          tools.map((tool: any) => (
            <div key={tool.id} className="group bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl mb-4 flex items-center justify-center text-blue-600 font-bold group-hover:bg-blue-600 group-hover:text-white transition">
                {tool.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold mb-2 text-gray-800">{tool.name}</h2>
              <p className="text-gray-500 text-sm line-clamp-2 mb-4">{tool.desc}</p>
              <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-3 py-1 rounded-full uppercase">
                  {tool.category || 'Efficiency'}
                </span>
                <button className="text-sm font-bold text-gray-400 group-hover:text-blue-600 transition">详情 →</button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-white/50 rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400">暂无找到匹配的 AI 工具，换个词试试？</p>
          </div>
        )}
      </div>
    </div>
  );
}
