'use client';

import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-black mb-12 text-gray-900 flex items-center gap-4">
        <span className="w-2 h-10 bg-blue-600 rounded-full"></span>
        隐私政策与免责声明
      </h1>
      
      <div className="bg-white p-10 rounded-[3rem] border shadow-sm space-y-8 text-gray-600 leading-relaxed">
        <p className="font-bold text-gray-900 text-lg">
          生效日期：2026年1月14日
        </p>

        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">1. 信息收集</h2>
          <p>
            当您使用 GitHub 登录 AI HUB 时，我们会收集您的基础公开信息（如用户名、头像及电子邮箱）。如果您使用邮箱验证登录，我们会仅收集您的电子邮箱地址用于身份验证。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">2. 信息用途</h2>
          <p>
            我们收集的信息仅用于以下用途：
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>识别您的身份以提供会员专属隐藏内容。</li>
            <li>维护您的个人偏好设置。</li>
            <li>在必要时通过邮件向您发送重要的系统更新通知。</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">3. 数据安全</h2>
          <p>
            我们采用 Supabase (PostgreSQL) 提供的企业级数据库安全架构。我们不会将您的个人数据出售、交易或转移给任何第三方机构。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">4. Cookie 使用</h2>
          <p>
            我们使用必要的 Cookie 以保持您的登录状态。您可以根据浏览器设置拒绝 Cookie，但这可能会导致您无法访问需要登录的会员专享内容。
          </p>
        </section>

        {/* 新增：免责声明部分 */}
        <section className="pt-8 border-t border-gray-100">
          <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
            <ShieldCheck className="text-blue-600" size={24} /> 5. 免责声明
          </h2>
          <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100 italic">
            <p>
              <strong>内容准确性：</strong> AI HUB 尽力确保评测及 SOP 流程的准确性。但鉴于 AI 技术迭代极快，我们不保证所有信息的实时性，用户应以工具官方说明为准。
            </p>
            <p>
              <strong>第三方责任：</strong> 本站包含第三方链接。这些工具的安全性及服务质量由其开发者负责，AI HUB 不对因使用第三方工具而产生的任何损失承担法律责任。
            </p>
            <p>
              <strong>无盈利担保：</strong> 本站分享的“一人公司 SOP”等内容仅供参考。我们不保证用户能通过本站内容获得特定的经济回报。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">6. 政策更新</h2>
          <p>
            我们可能会不时更新本政策。继续使用本网站即表示您同意最新的隐私协议与免责条款。
          </p>
        </section>

        <div className="pt-8 border-t">
          <p className="text-sm font-bold text-gray-400">
            如果您对上述政策有任何疑问，请通过“联系合作”页面与我们取得联系。
          </p>
        </div>
      </div>
    </div>
  );
}
