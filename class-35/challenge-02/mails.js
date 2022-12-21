import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})


export default async function sendMail(subject, body, target, attachment) {
  const opts ={
    from: 'Servidor Node',
    to: target,
    subject,
    html: body,
  }

  if (attachment) {
    opts.attachments = [
      {
        path: attachment,
      },
    ]
  }
  
  try {
    const result = await transporter.sendMail(opts)
    console.log('result', result)
  } catch (error) {
    console.error('error', error)
  }
}
