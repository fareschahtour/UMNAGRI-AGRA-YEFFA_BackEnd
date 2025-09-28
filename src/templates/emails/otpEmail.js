module.exports = (name, token) => {
  return {
    subject: "Votre code OTP - YEFFA",
    text: `Bonjour ${name}, votre code OTP est : ${token} (valide 15 minutes).`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Bonjour ${name},</p>
        <p>Votre code OTP est :</p>
        <h2 style="color:#d32f2f;">${token}</h2>
        <p>⚠️ Ce code est valide 15 minutes uniquement.</p>
        <p>L'équipe YEFFA 🌱</p>
      </div>
    `
  };
};
