import nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"

interface EmailOptions {
  email: string
  subject: string
  message: string
}

export const sendEmail = async (options: EmailOptions) => {

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  } as SMTPTransport.Options)

  const mailOptions = {
    from: "Hieu Hoang <hello@hieuhoang.io>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  }

  await transporter.sendMail(mailOptions)
}
