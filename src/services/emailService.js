const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true si port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text, html, attachments = []) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html,
      attachments, // 📎 Ajouté ici
    });
    console.log(`📧 Email envoyé à ${to}`);
  } catch (error) {
    console.error("❌ Erreur envoi email:", error.message);
  }
};

module.exports = sendEmail;
