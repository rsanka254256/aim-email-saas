import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { from, to, subject, text } = req.body;

  if (!from || !to || !subject || !text) {
    return res.status(400).json({ message: "Chybí povinné pole" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from,
      to,
      subject,
      text,
    });

    return res.status(200).json({ message: "✅ E-mail úspěšně odeslán!" });
  } catch (error: any) {
    console.error("Chyba při odesílání:", error);
    return res.status(500).json({ message: "❌ Nepodařilo se odeslat e-mail" });
  }
}
