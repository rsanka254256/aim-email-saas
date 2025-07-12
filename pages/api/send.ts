import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: 'Missing required fields: to, subject, text' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: 'richardsanka16@gmail.com',
        pass: 'xsmtpsib-3d389306139eeae178cae6e0cf11ae71775ef6620d0bd2483b13afe9db340251-Ar2RU16FTv9MEzKV'
      }
    });

    const info = await transporter.sendMail({
      from: '"AIM Email SaaS" <richardsanka16@gmail.com>',
      to,
      subject,
      text
    });

    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
}
