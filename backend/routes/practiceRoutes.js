const express = require("express");
const router = express.Router();
const {
  getDailyVocab,
  getQuiz,
} = require("../controllers/practiceController");

router.get("/vocab", getDailyVocab);
router.get("/quiz", getQuiz);

module.exports = router;
