const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String }, // texte, PDF, vidéo, etc.
  category: { type: String },
  duration: { type: String }, // ex: "3h", "2 semaines"
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // formateur/admin
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Course", courseSchema);
