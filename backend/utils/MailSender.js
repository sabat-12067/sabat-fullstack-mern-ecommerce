const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
  try {
    // Create a Transporter to send emails
    // console.log("Email : ", process.env.MAIL_HOST)
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465, // or 465 for secure SMTP
      secure: true, // true for port 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: `"E-Store" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = mailSender;