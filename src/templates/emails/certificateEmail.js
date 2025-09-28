module.exports = (name, courseTitle) => {
  return {
    subject: `Félicitations 🎓 - Certificat obtenu pour ${courseTitle}`,
    text: `Bonjour ${name}, félicitations ! Vous avez complété la formation "${courseTitle}" et obtenu votre certificat.`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Félicitations ${name} 🎓</h2>
        <p>Vous avez complété la formation <b>${courseTitle}</b> avec succès.</p>
        <p>Votre certificat est disponible en pièce jointe.</p>
        <br>
        <p>L'équipe YEFFA 🌱</p>
      </div>
    `
  };
};
