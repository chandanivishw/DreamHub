const express = require("express");
const router = express.Router();
const {
  getDailyVocab,
  getQuiz,saveScore,getProgress
} = require("../controllers/practiceController");

router.get("/vocab", getDailyVocab);
router.get("/quiz", getQuiz);
//Added Feature 
router.post("/save-score",saveScore);
router.get("/progress/:userId",getProgress);
module.exports = router;
