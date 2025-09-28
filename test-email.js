require("dotenv").config();
const sendEmail = require("./src/services/emailService.js");

sendEmail(
  "fareschahtour@gmail.com",
  "Test Nodemailer YEFFA",
  "Ceci est un test avec Gmail App Password",
  "<h1>Ça marche 🎉</h1><p>Email envoyé avec succès.</p>"
);
