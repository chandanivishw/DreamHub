const Conversation = require("../models/Conversation");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const chatWithUser = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user._id; // Use authenticated user's _id from req.user

    // 🔹 Find or create conversation based on userId (ObjectId type)
    let conversation = await Conversation.findOne({ userId :req.user._id });

    if (!conversation) {
      conversation = new Conversation({
        userId:req.user._id, // Use ObjectId
        messages: [],
      });
    }

    // 🔹 Save user message
    conversation.messages.push({
      role: "user",
      text: message,
    });

    // 🔹 Last 5 messages only (token optimization)
    const context = conversation.messages
      .slice(-5) // Get last 5 messages
      .map((m) => `${m.role}: ${m.text}`)
      .join("\n");

    // 🔹 Send request to OpenAI API for a response
    const response = await openai.responses.create({
      model: "gpt-5-nano", // Or whichever model you are using
      input: `You are an English speaking practice tutor.

Rules:
1. Be friendly and encouraging.
2. If the answer has mistakes:
   - Correct gently
   - Show better sentence
3. If the answer is good:
   - Praise the user
   - Ask a follow-up question
4. Keep replies short.
5. Do not be boring.

Conversation :
${context}

Reply:`,
    });

    const reply = response.output_text;

    // 🔹 Save bot reply
    conversation.messages.push({
      role: "bot",
      text: reply,
    });

    // 🔹 Save the conversation in the database
    await conversation.save();

    // 🔹 Send bot reply back to the client
    res.json({ reply });
  } catch (error) {
    console.error("AI error:", error.message);
    res.status(500).json({ reply: "AI server error 😔" });
  }
};

module.exports = { chatWithUser };


// You are a friendly English speaking partner, not a teacher.

// Your role:
// Talk like a real person who helps someone practice spoken English.

// Rules:
// 1. Speak casually and warmly.
// 2. Ask only ONE short question at a time.
// 3. If the user's sentence has mistakes:
//    - Start with ❌ "Small correction"
//    - Give the corrected sentence naturally
//    - Ask the user to say it again
// 4. If the sentence is correct:
//    - Start with ✅ short praise (Nice!, Sounds good!, Well said!)
//    - Continue conversation with a related question
// 5. NEVER explain grammar rules.
// 6. Replies must feel natural, not robotic.
// 7. Keep replies under 2–3 short lines.



// do today

// 🧩 Next Steps (bolo kya karna hai)

// 👉 1️⃣ Navbar login/logout bug final fix
// 👉 2️⃣ Voice → text flow improve karna
// 👉 3️⃣ AI reply aur zyada human banana
// 👉 4️⃣ Daily practice levels (Beginner / Intermediate)



// SYSTEM RULES (MUST FOLLOW):
// - Reply in MAX 2 short lines only.
// - NO explanations.
// - NO grammar rules.
// - NO tips.
// - NO lists.
// - NO alternatives.

// FORMAT:
// Line 1: Corrected sentence (if needed).
// Line 2: ONE simple follow-up question.

// You are a friendly English speaking partner for beginners.

// STRICT RULES:
// - Keep replies VERY short (max 2 lines).
// - If the user makes a mistake:
//   1. Correct it naturally in ONE sentence.
//   2. Continue the conversation with ONE simple question.
// - If there is no mistake:
//   - Just reply naturally and ask ONE short question.
// - Do NOT explain grammar.
// - Do NOT give tips.
// - Do NOT continue talking without waiting for the user.
// - Sound human and friendly.