#!/usr/bin/env node

/**
 * Test Email Script
 * 测试邮件发送脚本
 *
 * Usage: node test-email.js
 *
 * Make sure to configure your .env.local file with SMTP settings first.
 */

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      const value = valueParts.join('=').trim();
      if (key && value) {
        process.env[key.trim()] = value;
      }
    }
  });
  console.log('✓ Loaded .env.local');
} else {
  console.error('❌ .env.local not found. Please create it from .env.example');
  process.exit(1);
}

// Check required environment variables
const requiredVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
const missing = requiredVars.filter(v => !process.env[v]);
if (missing.length > 0) {
  console.error(`❌ Missing required environment variables: ${missing.join(', ')}`);
  console.error('Please configure them in .env.local');
  process.exit(1);
}

console.log('\n📧 SMTP Configuration:');
console.log(`  Host: ${process.env.SMTP_HOST}`);
console.log(`  Port: ${process.env.SMTP_PORT}`);
console.log(`  User: ${process.env.SMTP_USER}`);
console.log(`  From: ${process.env.SMTP_FROM || 'UNI&CORE Franchise <noreply@unincore.us>'}`);
console.log('');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  debug: true, // Enable debug output
  logger: true, // Log to console
});

// Test email content
const testEmail = {
  from: process.env.SMTP_FROM || '"UNI&CORE Franchise" <noreply@unincore.us>',
  to: 'staff@unincore.us',
  subject: '🧪 Test Email - UNI&CORE Contact Form',
  html: `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .badge { display: inline-block; background: #fbbf24; color: #000; padding: 4px 12px; border-radius: 12px; font-weight: bold; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #667eea; }
          .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🧪 Test Email / 测试邮件</h2>
            <p><span class="badge">TEST MODE</span></p>
          </div>
          <div class="content">
            <p><strong>This is a test email from the UNI&CORE contact form system.</strong></p>
            <p><strong>这是来自 UNI&CORE 联系表单系统的测试邮件。</strong></p>

            <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">

            <div class="field">
              <div class="label">姓名 / Name:</div>
              <div class="value">Test User 测试用户</div>
            </div>
            <div class="field">
              <div class="label">邮箱 / Email:</div>
              <div class="value"><a href="mailto:test@example.com">test@example.com</a></div>
            </div>
            <div class="field">
              <div class="label">电话 / Phone:</div>
              <div class="value"><a href="tel:+14151234567">(415) 123-4567</a></div>
            </div>
            <div class="field">
              <div class="label">留言 / Message:</div>
              <div class="value">
                This is a test message to verify the SMTP configuration is working correctly.
                <br><br>
                这是一条测试消息，用于验证 SMTP 配置是否正常工作。
              </div>
            </div>
            <div class="field">
              <div class="label">发送时间 / Sent:</div>
              <div class="value">${new Date().toLocaleString('en-US')} / ${new Date().toLocaleString('zh-CN')}</div>
            </div>

            <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">

            <p style="color: #666; font-size: 14px;">
              ✅ If you received this email, your SMTP configuration is working correctly!
              <br>
              ✅ 如果您收到此邮件，说明您的 SMTP 配置正常！
            </p>
          </div>
        </div>
      </body>
    </html>
  `,
  text: `
🧪 Test Email - UNI&CORE Contact Form

This is a test email from the UNI&CORE contact form system.
这是来自 UNI&CORE 联系表单系统的测试邮件。

Name / 姓名: Test User 测试用户
Email / 邮箱: test@example.com
Phone / 电话: (415) 123-4567
Message / 留言: This is a test message to verify the SMTP configuration is working correctly.

Sent / 发送时间: ${new Date().toLocaleString()}

✅ If you received this email, your SMTP configuration is working correctly!
✅ 如果您收到此邮件，说明您的 SMTP 配置正常！
  `.trim(),
};

// Send test email
console.log('📤 Sending test email...\n');
console.log('─'.repeat(60));

transporter.sendMail(testEmail)
  .then(info => {
    console.log('─'.repeat(60));
    console.log('\n✅ Email sent successfully!\n');
    console.log('Message Info:');
    console.log(`  Message ID: ${info.messageId}`);
    console.log(`  Response: ${info.response}`);
    if (info.accepted && info.accepted.length > 0) {
      console.log(`  Accepted: ${info.accepted.join(', ')}`);
    }
    if (info.rejected && info.rejected.length > 0) {
      console.log(`  Rejected: ${info.rejected.join(', ')}`);
    }
    console.log('\n✓ Check your inbox at staff@unincore.us\n');
    process.exit(0);
  })
  .catch(error => {
    console.log('─'.repeat(60));
    console.error('\n❌ Failed to send email!\n');
    console.error('Error Details:');
    console.error(`  Type: ${error.name || 'Unknown'}`);
    console.error(`  Message: ${error.message}`);
    if (error.code) {
      console.error(`  Code: ${error.code}`);
    }
    if (error.command) {
      console.error(`  Command: ${error.command}`);
    }
    console.error('\nFull Error:');
    console.error(error);
    console.error('\n📝 Troubleshooting Tips:');
    console.error('  1. Check your SMTP credentials in .env.local');
    console.error('  2. Make sure SMTP_HOST and SMTP_PORT are correct');
    console.error('  3. For Gmail, use an App Password (not your regular password)');
    console.error('  4. Check if your firewall allows outbound connections on the SMTP port');
    console.error('  5. Some email providers require "Less secure app access" to be enabled\n');
    process.exit(1);
  });
