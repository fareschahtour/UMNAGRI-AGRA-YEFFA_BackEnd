const Course = require("../models/Course");

// 📌 Créer une formation
exports.createCourse = async (req, res) => {
  try {
    const { title, description, content, category, duration } = req.body;
    const course = await Course.create({
      title,
      description,
      content,
      category,
      duration,
      createdBy: req.user.id // 👈 récupéré via auth middleware
    });
    res.status(201).json({ message: "Formation créée ✅", course });
  } catch (err) {
    res.status(500).json({ message: "Erreur création formation ❌", error: err.message });
  }
};

// 📌 Lire toutes les formations
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("createdBy", "name email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Erreur récupération ❌", error: err.message });
  }
};

// 📌 Lire une formation par ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("createdBy", "name email");
    if (!course) return res.status(404).json({ message: "Formation introuvable ❌" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: "Erreur récupération ❌", error: err.message });
  }
};

// 📌 Modifier une formation
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!course) return res.status(404).json({ message: "Formation introuvable ❌" });
    res.json({ message: "Formation mise à jour ✅", course });
  } catch (err) {
    res.status(500).json({ message: "Erreur update ❌", error: err.message });
  }
};

// 📌 Supprimer une formation
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Formation introuvable ❌" });
    res.json({ message: "Formation supprimée ✅" });
  } catch (err) {
    res.status(500).json({ message: "Erreur suppression ❌", error: err.message });
  }
};
