# 🚀 AI HUB - 2026 全能 AI 生产力聚合平台模版

这是一个基于 **Next.js 14+**、**Tailwind CSS** 和 **Supabase** 构建的高性能 AI 工具导航与内容发布系统。本项目旨在为数字游民提供一个开箱即用的自动化收益站点模版。

---

## ✨ 项目核心功能

- **双搜索系统**：内置首页大搜索框与导航栏搜索框，支持全站模糊查询。
- **现代化 UI 设计**：极致简约的卡片式布局，深度适配移动端交互。
- **双重认证体系**：集成 Supabase Auth，支持 GitHub 第三方一键登录及邮箱验证登录。
- **合规页面齐备**：预置符合 Google 审核标准的“关于我们”、“隐私政策”及“商务合作”页面。
- **全套品牌标识**：支持多端适配的 Favicon 体系及苹果设备高清图标。

---

## 🛠️ 详细部署指南

如果您想快速部署一个属于自己的 AI HUB 站点，请严格按照以下步骤操作：

### 1. Fork 本仓库
点击本项目页面右上角的 **Fork** 按钮，将项目完整克隆到您自己的 GitHub 账号下。

### 2. 准备 Supabase 数据库
1. 前往 [Supabase 官网](https://supabase.com/) 创建一个新项目。
2. 进入项目的 **SQL Editor** 页面，点击 **New Query**，复制并运行以下初始化代码：

```sql
-- 1. 创建文章表 (posts)
CREATE TABLE posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL, -- 可选值: software, article, tool
  cover_url TEXT,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. 创建评论表 (comments)
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. 开启 RLS 策略 (允许公开读取)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "允许任何人读取已发布的文章" ON posts FOR SELECT USING (status = 'published');

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "允许认证用户提交评论" ON comments FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "允许所有人查看评论" ON comments FOR SELECT USING (true);
### 3. 配置 Vercel 环境变量

在 Vercel 导入项目时，在 **Environment Variables** 栏目中添加以下变量：

| 变量名 | 描述 | 获取方式 |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase URL | Supabase Project Settings -> API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon Key | Supabase Project Settings -> API |
| `NEXT_PUBLIC_ADMIN_UID` | 管理员 UID | 见下文“如何获取 UID” |

---

### 💡 如何获取你的 GitHub UID？

部署时，你需要知道自己的 GitHub 数字 ID 才能获得管理后台权限：
1. 访问：`https://api.github.com/users/你的GitHub用户名`
2. 在返回的页面中查找 `"id":` 后面那一串数字（例如 `12345678`）。
3. 将这串数字填入 `NEXT_PUBLIC_ADMIN_UID` 变量中。

---

### 4. 替换个人素材文件

请将 `public/` 文件夹下的以下素材替换为您自己的内容：
- `favicon.ico`：您的网站浏览器图标。
- `wechat-qr.png`：您的商务合作微信二维码。
- `favicon.svg`：高清矢量 Logo。

---

## 📖 运营与合规建议

- **内容发布**：进入管理后台后，建议发布的文章标题包含核心关键词以利于 SEO。
- **Google AdSense**：本站提供的“隐私政策”已包含 Cookie 说明与数据安全条款，有助于快速通过审核。
- **商务联络**：请在 `app/contact/page.tsx` 中将邮箱修改为您自己的联系邮箱。

## ⚖️ 许可说明
本项目采用 MIT 许可证。您可以自由使用、修改和分发，但利用本模版发布的任何第三方内容及产生的风险需由运营者自行承担。

---
⭐ 如果这个项目对你有帮助，欢迎点一个 Star！
