const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Change to ObjectId for proper reference
      ref: "User", // Link to User model
      required: true,
    },
    messages: [
      {
        role: {
          type: String,
          enum: ["user", "bot"],
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);



// const ConversationSchema = new mongoose.Schema({
//   userMessage: { type: String, required: true },
//   botReply: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model("Conversation", ConversationSchema);
