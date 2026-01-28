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

  const { name, summary, projectTitle } = req.body;

  if (!name || name.trim().length < 2 || !summary || summary.trim().length < 10) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  const safeName = name.trim();
  const safeSummary = summary.trim();
  const safeProjectTitle = projectTitle?.trim() || 'Engage page';

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

    await transporter.sendMail({
      from: `"Tarunya Systems" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: process.env.EMAIL_USER,
      subject: `New inquiry: ${safeProjectTitle}`,
      text: `
Name: ${safeName}

Project:
${safeProjectTitle}

Message:
${safeSummary}
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email sending failed:', error);
    return res.status(500).json({ message: 'Email failed' });
  }
}