# UNI&CORE 网站设置指南 / Website Setup Guide

## 🌐 语言路由 / Language Routing

网站现在支持独立的语言URL：
- 英文: `http://localhost:3000/en`
- 中文: `http://localhost:3000/zh`

访问根路径会自动重定向到英文版本。

## 📧 邮件配置 / Email Configuration

联系表单会将信息发送到 `staff@unincore.us`。

### 设置步骤 / Setup Steps:

1. **复制环境变量文件 / Copy environment file:**
   ```bash
   cp .env.example .env.local
   ```

2. **配置SMTP服务 / Configure SMTP:**

   #### 选项 1: 使用 Gmail / Option 1: Gmail

   如果使用 Gmail，需要生成应用专用密码:
   1. 访问 Google Account 设置
   2. 启用两步验证
   3. 生成应用专用密码
   4. 在 `.env.local` 中配置：

   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-specific-password
   SMTP_FROM="UNI&CORE Franchise <your-email@gmail.com>"
   ```

   #### 选项 2: 使用 SendGrid / Option 2: SendGrid

   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=your-sendgrid-api-key
   SMTP_FROM="UNI&CORE Franchise <noreply@unincore.us>"
   ```

   #### 选项 3: 其他 SMTP 服务 / Option 3: Other SMTP

   配置相应的 SMTP 服务器设置。

3. **测试邮件配置 / Test Email Configuration:**

   在启动网站之前，先测试 SMTP 配置是否正确：

   ```bash
   npm run test-email
   ```

   这个命令会：
   - ✅ 检查 `.env.local` 配置
   - ✅ 显示详细的连接日志
   - ✅ 发送测试邮件到 `staff@unincore.us`
   - ✅ 显示成功或错误信息

   **直接运行脚本：**
   ```bash
   node test-email.js
   ```

4. **重启开发服务器 / Restart dev server:**
   ```bash
   npm run dev
   ```

## 🚀 开发 / Development

```bash
# 安装依赖 / Install dependencies
npm install

# 启动开发服务器 / Start dev server
npm run dev

# 构建生产版本 / Build for production
npm run build

# 启动生产服务器 / Start production server
npm start
```

## 📝 功能特性 / Features

✅ 中英文双语支持（独立URL）
✅ 响应式设计
✅ 联系表单（发送到 staff@unincore.us）
✅ 创始店计划倒计时
✅ 三种加盟套餐展示
✅ 利润模型分析
✅ SEO 优化

## 🔧 故障排查 / Troubleshooting

### 邮件发送失败 / Email sending fails

1. 检查 `.env.local` 文件是否正确配置
2. 确认 SMTP 凭据正确
3. 检查防火墙或网络设置
4. 查看浏览器控制台和服务器日志

### 语言切换不工作 / Language switching not working

1. 清除浏览器缓存
2. 重启开发服务器
3. 检查 middleware.ts 是否正确配置

## 📞 联系方式 / Contact

如有问题，请联系：
- Email: xianji.li@unincore.us
- Phone: (415) 351-6363
