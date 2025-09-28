const certificateEmail = require("../templates/emails/certificateEmail");
const sendEmail = require("../services/emailService");
const generateCertificate = require("../utils/certificateGenerator");

exports.sendCertificate = async (req, res) => {
  try {
    const { email, name, courseTitle } = req.body;

    // 1. Générer le PDF
    const pdfPath = await generateCertificate(name, courseTitle);

    // 2. Préparer email
    const mail = certificateEmail(name, courseTitle);

    // 3. Envoyer email avec attachement
    await sendEmail(
      email,
      mail.subject,
      mail.text,
      mail.html,
      [
        { filename: `${courseTitle}-certificat.pdf`, path: pdfPath }
      ]
    );

    res.json({ message: "Certificat généré et envoyé ✅" });
  } catch (error) {
    res.status(500).json({ message: "Erreur certificat ❌", error: error.message });
  }
};
