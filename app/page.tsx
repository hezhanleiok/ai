import { supabase } from '@/lib/supabase';

export default async function Home({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams?.q || '';
  let dbQuery = supabase.from('tools').select('*');
  if (query) dbQuery = dbQuery.ilike('name', `%${query}%`);
  const { data: tools } = await dbQuery.order('created_at', { ascending: false });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">AI 效率工具导航</h1>
      <form action="/" method="get" className="mb-8">
        <input name="q" defaultValue={query} placeholder="搜索工具..." className="border p-2 rounded w-full max-w-md" />
        <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded">搜索</button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tools?.map((tool: any) => (
          <div key={tool.id} className="border p-4 rounded shadow">
            <h2 className="font-bold">{tool.name}</h2>
            <p className="text-sm text-gray-600">{tool.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
