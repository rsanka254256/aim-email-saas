import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Pouze metoda POST je povolena' })
  }

  const { subject, body } = req.body

  const transporter = nodemailer.createTransport({
    host: 'smtp.sendinblue.com', // nebo smtp.gmail.com, smtp.seznam.cz, atd.
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  try {
    await transporter.sendMail({
      from: '"AIM SaaS" <no-reply@aim.com>',
      to: process.env.TEST_EMAIL || 'test@yourdomain.com',
      subject,
      html: `<div>${body}</div>`
    })

    res.status(200).json({ message: '✅ E-mail byl odeslán!' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: '❌ Nepodařilo se odeslat e-mail' })
  }
}
