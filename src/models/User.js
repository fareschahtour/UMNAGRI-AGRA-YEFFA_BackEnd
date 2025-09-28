const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  country: { type: String, required: true },
  region: { type: String, required: true },
  farmingType: { type: String, required: true },
  experienceLevel: { type: String, enum: ["Débutant", "Intermédiaire", "Expert"], required: true },
  farmSize: { type: String, enum: ["<5ha", "5-20ha", ">20ha"] },
  role: { type: String, enum: ["user", "admin"], default: "user" }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
