module.exports = (name) => {
  return {
    subject: "Bienvenue sur YEFFA 🎉",
    text: `Bonjour ${name}, bienvenue sur YEFFA North Africa ! 
Vous faites maintenant partie d'une communauté de jeunes et femmes agriculteurs engagés pour un avenir durable.`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #2e7d32;">Bienvenue ${name} 👩‍🌾</h2>
        <p>Merci de vous être inscrit sur <b>YEFFA North Africa</b>.</p>
        <p>Vous avez maintenant accès à nos formations et à la communauté des jeunes agriculteurs en Afrique du Nord.</p>
        <a href="http://localhost:4200/login" 
           style="display:inline-block;margin-top:10px;padding:10px 20px;background:#2e7d32;color:white;text-decoration:none;border-radius:5px;">
           Se connecter
        </a>
        <br><br>
        <p>L'équipe YEFFA 🌱</p>
      </div>
    `
  };
};
