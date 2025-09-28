const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../services/emailService"); // 👈 importer le service email
const welcomeEmail = require("../templates/emails/welcomeEmail");
const otpEmail = require("../templates/emails/otpEmail");


/*exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, country, region, farmingType, experienceLevel, farmSize } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Utilisateur déjà existant" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name, email, password: hashed, phone, country, region, farmingType, experienceLevel, farmSize
    });

    res.status(201).json({ message: "Inscription réussie ✅", user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};*/


exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, country, region, farmingType, experienceLevel, farmSize } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Utilisateur déjà existant ❌" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      phone,
      country,
      region,
      farmingType,
      experienceLevel,
      farmSize
    });

    // ✅ Envoi email de bienvenue
    const mail = welcomeEmail(user.name);
    await sendEmail(user.email, mail.subject, mail.text, mail.html);

    res.status(201).json({
      message: "Inscription réussie ✅, email de bienvenue envoyé",
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ message: "Connexion réussie 🎉", token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
exports.getMe = async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;

    // Interdit de changer le mot de passe ici
    if (updates.password) delete updates.password;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    ).select("-password");

    res.json({ message: "Profil mis à jour ✅", user });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).json({ message: "Ancien mot de passe incorrect ❌" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Mot de passe changé ✅" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};


const crypto = require("crypto");

let resetTokens = {}; // en mémoire (à remplacer par Redis en prod)

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "Email introuvable ❌" });

  const token = crypto.randomInt(100000, 999999).toString(); // OTP 6 chiffres
  resetTokens[email] = { token, expires: Date.now() + 15 * 60 * 1000 };

  // Envoi par email
   const mail = otpEmail(user.name, token);
  await sendEmail(user.email, mail.subject, mail.text, mail.html);

  res.json({ message: "OTP envoyé par email ✅" });
};


exports.resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;
  const data = resetTokens[email];
  if (!data || data.token !== token || Date.now() > data.expires) {
    return res.status(400).json({ message: "OTP invalide ou expiré ❌" });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "Utilisateur introuvable ❌" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  delete resetTokens[email];

  res.json({ message: "Mot de passe réinitialisé ✅" });
};




exports.listUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Utilisateur supprimé ✅" });
};

exports.updateRole = async (req, res) => {
  const { role } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
  res.json({ message: "Rôle mis à jour ✅", user });
};
