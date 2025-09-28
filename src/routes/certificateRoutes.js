const express = require("express");
const router = express.Router();
const { sendCertificate } = require("../controllers/certificateController");

// POST /api/certificates/send
router.post("/send", sendCertificate);

module.exports = router;
