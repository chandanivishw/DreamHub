const express = require("express");
const router = express.Router();
const { chatWithUser } = require("../controllers/chatController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/chat",authMiddleware,chatWithUser);

module.exports = router;
