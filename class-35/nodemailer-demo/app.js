import nodemailer from 'nodemailer'

// Ethereal transporter
/* const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
})*/

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

const opts ={
  from: 'Servidor Node',
  to: process.env.EMAIL_USER,
  subject: 'Hola Ernesto from Node',
  html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>',
  attachments: [
    {
      path: 'regards.gif'
    },
  ],
}

try {
  const result = await transporter.sendMail(opts)
  console.log('result', result)
} catch (error) {
  console.error('error', error)
}