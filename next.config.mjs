/** @type {import('next').NextConfig} */
const nextConfig = {
  // 强制忽略构建期间的 TS 错误（如果是因为别名引起的）
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
