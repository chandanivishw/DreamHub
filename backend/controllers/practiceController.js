// backend/controllers/practiceController.js
const dailyVocab = [
  {
    word: "Confident",
    meaning: "Feeling sure of yourself",
    example: "I feel confident in my English today.",
  },
  {
    word: "Improve",
    meaning: "To become better",
    example: "I want to improve my speaking skills.",
  },
  {
    word: "Opportunity",
    meaning: "A chance to do something",
    example: "This job is a great opportunity for me.",
  },
  { word: "Confident", meaning: "Feeling sure about yourself", example: "She is confident in interviews." },
  { word: "Consistent", meaning: "Doing regularly", example: "Be consistent in practice." },
  { word: "Awkward", meaning: "Uncomfortable situation", example: "It was an awkward silence." },
  { word: "Polite", meaning: "Well-mannered", example: "Be polite while talking." },
  { word: "Confused", meaning: "Not clear", example: "I am confused about this question." },
  { word: "Brave", meaning: "Not afraid", example: "She is brave." },
];

const quizQuestions = [
  {
    question: "Choose the correct sentence:",
    options: [
      "I am looking for a job.",
      "I am look for a job.",
      "I am looking job.",
    ],
    answer: 0,
  },
  {
    question: "Fill in the blank: I want to ___ my English.",
    options: ["improve", "improving", "improved"],
    answer: 0,
  },
   {
    question: "What is the meaning of 'Awkward'?",
    options: ["Comfortable", "Uncomfortable", "Happy"],
    answer: 1,
  },
    {
    question: "Meaning of 'Polite'?",
    options: ["Rude", "Well-mannered", "Lazy"],
    answer: 1,
  },
];

// 👉 Random vocab
exports.getDailyVocab = (req, res) => {
  const random = dailyVocab[Math.floor(Math.random() * dailyVocab.length)];
  res.json(random);
};

// 👉 Random quiz
exports.getQuiz = (req, res) => {
  const random = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
  res.json(random);
};
