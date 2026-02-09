const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

(async () => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5-nano",
      messages: [
        { role: "user", content: "Correct this sentence: i am very confuse today" }
      ],
    });

    console.log(completion.choices[0].message.content);
  } catch (err) {
    console.error(err);
  }
})();
