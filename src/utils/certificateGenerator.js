const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function generateCertificate(name, courseTitle) {
  return new Promise((resolve, reject) => {
    const certDir = path.join(__dirname, "../certificates");

    // ✅ Crée le dossier si inexistant
    if (!fs.existsSync(certDir)) {
      fs.mkdirSync(certDir, { recursive: true });
    }

    const safeCourse = courseTitle.replace(/[^a-z0-9]/gi, "_"); // éviter caractères spéciaux
    const safeName = name.replace(/[^a-z0-9]/gi, "_");
    const filePath = path.join(certDir, `${safeName}-${safeCourse}.pdf`);

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    // 🎨 Design basique du certificat
    doc.fontSize(24).text("🎓 YEFFA Certificate of Completion", { align: "center" });
    doc.moveDown();
    doc.fontSize(18).text(`This certifies that`, { align: "center" });
    doc.fontSize(22).text(`${name}`, { align: "center", underline: true });
    doc.moveDown();
    doc.fontSize(16).text(`has successfully completed the course:`, { align: "center" });
    doc.fontSize(20).text(courseTitle, { align: "center", underline: true });
    doc.moveDown();
    doc.fontSize(14).text(`Date: ${new Date().toLocaleDateString()}`, { align: "center" });

    doc.end();

    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
}

module.exports = generateCertificate;
// 📄 Génère un certificat PDF simple avec le nom et le titre du cours