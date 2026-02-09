// // function correctSentence(text) {
// //   if (text.includes("go market")) {
// //     return "I went to the market yesterday.";
// //   }
// //   return null;
// // }
// function correctSentence(text) {
//   if (text.includes("go market")) {
//     return "I went to the market yesterday.";
//   }
//   return null;
// }

// function generateReply(userText) {
//   const lower = userText.toLowerCase();

//   const correction = correctSentence(lower);

//   if (correction) {
//     return {
//       reply: `Good try 👍 
// Correct sentence is: "${correction}"
// Now say it again correctly.`,
//     };
//   }

//   if (lower.includes("job")) {
//     return {
//       reply: "Nice! What kind of job are you preparing for?",
//     };
//   }

//   if (lower.includes("english")) {
//     return {
//       reply: "Great! Tell me about your daily routine in English.",
//     };
//   }

//   return {
//     reply: "Good sentence! Can you explain more?",
//   };
// }

// // 🔥 THIS LINE IS MUST
// module.exports = { generateReply };
let stage = 0;

function generateReply(userText) {
  const text = userText.toLowerCase();

  // STAGE 0 → START
  if (stage === 0) {
    stage = 1;
    return {
      reply: "Nice! Why do you want to improve your English?",
    };
  }

  // STAGE 1 → WHY
  if (stage === 1) {
    stage = 2;
    return {
      reply: "Great 👍 Are you preparing for a job or studies?",
    };
  }

  // STAGE 2 → GOAL
  if (stage === 2) {
    stage = 3;
    return {
      reply: "Awesome! Tell me about your daily routine.",
    };
  }

  // STAGE 3 → PRACTICE
  if (stage === 3) {
    return {
      reply:
        "Good speaking 😊 Now try to say the same thing in a different way.",
    };
  }
}

module.exports = { generateReply };
