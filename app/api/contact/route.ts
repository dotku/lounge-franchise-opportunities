import { NextResponse } from "next/server";
import * as nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, language } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create email transporter
    // Note: In production, you should use environment variables for credentials
    // For now, this is a placeholder configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Prepare email content
    const subject = language === "zh"
      ? `新的加盟咨询 - ${name}`
      : `New Franchise Inquiry - ${name}`;

    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #667eea; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>${language === "zh" ? "新的加盟咨询" : "New Franchise Inquiry"}</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">${language === "zh" ? "姓名：" : "Name:"}</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">${language === "zh" ? "邮箱：" : "Email:"}</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">${language === "zh" ? "电话：" : "Phone:"}</div>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              ${message ? `
                <div class="field">
                  <div class="label">${language === "zh" ? "留言：" : "Message:"}</div>
                  <div class="value">${message.replace(/\n/g, "<br>")}</div>
                </div>
              ` : ""}
              <div class="field">
                <div class="label">${language === "zh" ? "提交时间：" : "Submitted:"}</div>
                <div class="value">${new Date().toLocaleString(language === "zh" ? "zh-CN" : "en-US")}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"UNI&CORE Franchise" <noreply@unincore.us>`,
      to: "staff@unincore.us",
      subject: subject,
      html: htmlContent,
      replyTo: email,
    });

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
