import nodemailer from 'nodemailer';

export const config = {
  runtime: 'nodejs',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Basic payload size protection
  if (JSON.stringify(req.body).length > 10_000) {
    return res.status(413).json({ message: 'Payload too large' });
  }

  const { name, email, phone, summary, projectTitle } = req.body;

  // Validation
  if (
    !name || name.trim().length < 2 || 
    !email || !email.includes('@') || 
    !summary || summary.trim().length < 10
  ) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  const safeName = name.trim();
  const safeEmail = email.trim();
  const safePhone = phone ? phone.trim() : 'Not provided';
  const safeSummary = summary.trim();
  const safeProjectTitle = projectTitle?.trim() || 'Engage page';
  const timestamp = new Date().toLocaleString();

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Dark-themed, systems-aesthetic HTML email
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0d12; color: #f4f6fb; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #1f2330; border: 1px solid #2d3142; border-radius: 8px; overflow: hidden; }
        .header { background-color: #0b0d12; padding: 20px; border-bottom: 1px solid #c8ff00; }
        .title { color: #f4f6fb; font-size: 20px; font-weight: bold; margin: 0; }
        .accent { color: #c8ff00; }
        .content { padding: 30px; }
        .field { margin-bottom: 20px; }
        .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 5px; display: block; font-family: monospace; }
        .value { font-size: 16px; color: #fff; }
        .box { background-color: #0b0d12; border: 1px solid #333; padding: 15px; border-radius: 4px; color: #ddd; line-height: 1.6; white-space: pre-wrap; font-family: monospace; font-size: 14px; }
        .footer { padding: 20px; background-color: #0b0d12; text-align: center; color: #666; font-size: 12px; border-top: 1px solid #222; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="title">🚀 New Startup Inquiry</h1>
          <div style="font-family: monospace; font-size: 12px; margin-top: 5px; color: #c8ff00;">${safeProjectTitle}</div>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Client Identity</span>
            <div class="value"><strong>${safeName}</strong></div>
          </div>
          
          <div class="field">
            <span class="label">Contact Coordinates</span>
            <div class="value">
              <a href="mailto:${safeEmail}" style="color: #c8ff00; text-decoration: none;">${safeEmail}</a>
              <br>
              <span style="color: #bbb; font-size: 14px;">${safePhone}</span>
            </div>
          </div>

          <div class="field">
            <span class="label">Project Briefing</span>
            <div class="box">${safeSummary}</div>
          </div>
          
          <div class="field">
             <span class="label">Timestamp</span>
             <div style="font-family: monospace; color: #666; font-size: 12px;">${timestamp}</div>
          </div>
        </div>
        <div class="footer">
          Reply directly to this email to respond to the client.
        </div>
      </div>
    </body>
    </html>
    `;

    // Plain text fallback
    const textContent = `
New Inquiry: ${safeProjectTitle}
--------------------------------------------------
Client: ${safeName}
Email:  ${safeEmail}
Phone:  ${safePhone}

Briefing:
${safeSummary}

Timestamp: ${timestamp}
--------------------------------------------------
Reply to: ${safeEmail}
    `;

    await transporter.sendMail({
      from: `"Tarunya Systems" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: safeEmail, // Critical: replies go to client
      subject: `🚀 New Startup Inquiry — ${safeProjectTitle} | ${safeName}`,
      text: textContent,
      html: htmlContent,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email sending failed:', error);
    return res.status(500).json({ message: 'Email failed' });
  }
}