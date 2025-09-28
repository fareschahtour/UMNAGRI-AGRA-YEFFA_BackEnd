const express = require("express");
const router = express.Router();
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} = require("../controllers/courseController");

// ✅ Import correct
const { protect, adminOnly } = require("../middlewares/authMiddleware");

// Routes
router.post("/", protect, adminOnly, createCourse);
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.put("/:id", protect, adminOnly, updateCourse);
router.delete("/:id", protect, adminOnly, deleteCourse);

module.exports = router;
