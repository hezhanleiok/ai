# 🚀 AI HUB - 2026 全能 AI 生产力聚合平台模版

这是一个基于 **Next.js 14+**、**Tailwind CSS** 和 **Supabase** 构建的高性能 AI 工具导航与内容发布系统。本项目旨在为数字游民提供一个开箱即用的自动化收益站点模版。

![站点预览](https://ai-delta-flax.vercel.app/favicon.svg) ## ✨ 项目亮点

- **全站搜索系统**：内置双搜索框逻辑，支持对工具和文章的快速模糊查询。
- **现代化 UI 设计**：极致简约的卡片式布局，深度适配移动端交互体验。
- **双重认证体系**：集成 Supabase Auth，支持 GitHub 第三方一键登录及邮箱验证登录。
- **合规性页面齐备**：预置了符合 Google 审核标准的“关于我们”、“隐私政策”、“商务合作”及“免责声明”页面。
- **高清品牌标识**：支持多端适配的 Favicon 体系及苹果设备高清图标。

---

## 🛠️ 快速部署指南

如果你想部署一个一模一样的站点，请按照以下步骤操作：

### 1. Fork 本仓库
点击页面右上角的 **Fork** 按钮，将本项目克隆到你的 GitHub 账号下。

### 2. 准备数据库 (Supabase)
1. 前往 [Supabase 官网](https://supabase.com/) 创建新项目。
2. 进入 **SQL Editor**，复制并运行以下初始化代码以创建数据表：

```sql
-- 创建文章表
CREATE TABLE posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL, -- software, article, tool
  cover_url TEXT,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 创建评论表
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
3. 设置环境变量在 Vercel 部署设置或本地 .env.local 文件中添加以下变量：变量名描述NEXT_PUBLIC_SUPABASE_URLSupabase 项目设置中的 API URLNEXT_PUBLIC_SUPABASE_ANON_KEYSupabase 项目设置中的 anon public keyNEXT_PUBLIC_ADMIN_UID你的 GitHub UID（用于开启管理后台权限）4. 替换个人素材为了让站点属于你，请替换 public/ 文件夹下的以下文件：favicon.ico：浏览器标签页图标。wechat-qr.png：商务合作页面的微信二维码。apple-touch-icon.png：苹果设备快捷图标。📖 运营建议SEO 优化：本项目已配置好语义化 HTML 标签，建议在管理后台发布内容时保持标题包含关键词。Google 审核：本站提供的“隐私政策”已包含 Cookie 说明与数据安全条款，有助于通过 AdSense 审核。商务联络：请在 app/contact/page.tsx 中修改为您真实的邮箱与联系方式。⚖️ 许可与免责本项目仅供学习与经验分享使用。用户利用本模版发布的任何第三方工具及内容产生的风险需由运营者自行承担。⭐ 如果这个项目对你有帮助，欢迎点一个 Star！
---

### 💡 如何获取你的 GitHub UID？
部署时，别人需要知道自己的 UID 才能当管理员。你可以告诉他们：
* 访问 `https://api.github.com/users/你的用户名`。
* 找到返回内容里的 `"id": 123456`，那一串数字就是 `NEXT_PUBLIC_ADMIN_UID`。

**完成 README 后，您的 GitHub 仓库看起来就像一个成熟的开源项目了！您还需要我为您生成一个 `LICENSE` (许可证) 文件说明吗？**
