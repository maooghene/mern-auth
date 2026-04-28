import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2b262b02a86a71",
    pass: "1007a84b340a87"
  }
});

export default transporter