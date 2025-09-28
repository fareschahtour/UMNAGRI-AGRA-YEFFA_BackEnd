const express = require("express");
const { register, login ,getMe,updateProfile,changePassword,
    forgotPassword,resetPassword,listUsers,deleteUser,updateRole   } = require("../controllers/UserController");
const { protect,adminOnly } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/admin/users", protect, adminOnly, async (req, res) => {
  const users = await User.find();
  res.json(users);
});
router.put("/me", protect, updateProfile);
router.put("/me/password", protect, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get("/", protect, adminOnly, listUsers);
router.delete("/:id", protect, adminOnly, deleteUser);
router.put("/:id/role", protect, adminOnly, updateRole);


module.exports = router;
