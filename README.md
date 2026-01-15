# 🚀 AI HUB - 2026 全能 AI 生产力聚合平台模版

这是一个基于 **Next.js 14+**、**Tailwind CSS** 和 **Supabase** 构建的高性能 AI 工具导航 with 内容发布系统。本项目旨在为数字游民提供一个开箱即用的自动化收益站点模版。

---

## ✨ 项目核心功能

* **双搜索系统**：内置首页大搜索框与导航栏搜索框，支持全站模糊查询。
* **现代化 UI 设计**：极致简约的卡片式布局，深度适配移动端交互。
* **双重认证体系**：集成 Supabase Auth，支持 GitHub 第三方登录及邮箱验证登录。
* **合规页面齐备**：预置符合 Google 审核标准的隐私政策及商务合作页面。
* **高清品牌标识**：支持多端适配的 Favicon 体系及苹果设备高清图标。

---

## 🛠️ 详细部署指南

### 1. Fork 本仓库
点击本项目页面右上角的 **Fork** 按钮，将项目完整克隆到您自己的 GitHub 账号下。

### 2. 准备 Supabase 数据库
前往 [Supabase 官网](https://supabase.com/) 创建新项目，在 **SQL Editor** 中运行以下代码初始化：

```sql
-- 创建文章表 (posts)
CREATE TABLE posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  cover_url TEXT,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 创建评论表 (comments)
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

```

### 3. 配置 Vercel 环境变量

在 Vercel 导入项目时，在 **Environment Variables** 栏目中添加以下变量：

| 变量名 | 描述 | 获取方式 |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL | Project Settings -> API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名 Key | Project Settings -> API |
| `NEXT_PUBLIC_ADMIN_UID` | 管理员 UID | 见下文“如何获取 UID” |

### 💡 如何获取你的 GitHub UID？

1. 访问：`https://api.github.com/users/你的GitHub用户名`。
2. 找到返回页面中 `"id":` 后面的一串数字（例如 `12345678`）。
3. 将这串数字填入 Vercel 的 `NEXT_PUBLIC_ADMIN_UID` 变量中，以开启管理员权限。

### 4. 替换个人素材文件

请替换 `public/` 文件夹下的以下素材为您自己的内容：

* **favicon.ico**：网站浏览器标签页图标.
* **wechat-qr.png**：商务合作页面的微信二维码.
* **favicon.svg**：高清矢量 Logo 文件.

---

## 📖 运营与合规建议

* **SEO**：发布文章时，标题请务必包含核心搜索关键词.
* **Google AdSense**：本站内置的隐私政策已符合 Google 最新数据安全条款.
* **联系方式**：记得在 `app/contact/page.tsx` 中修改您的邮箱地址.

## ⚖️ 许可说明

本项目采用 MIT 许可证. 您可以自由修改和分发.

---

⭐ 如果这个项目对你有帮助，欢迎点一个 Star！
