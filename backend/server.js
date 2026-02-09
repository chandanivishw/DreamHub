require("dotenv").config(); // MUST be first

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();
// console.log("GEMINI KEY 👉", process.env.GEMINI_API_KEY);
app.use(cors());
// app.use(express.json());

// app.use("/api", require("./routes/chatRoutes"));
// app.use(express.json());
app.use(express.json({ limit: "10kb" }));
app.use("/api", require("./routes/chatRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
const practiceRoutes = require("./routes/practiceRoutes");
app.use("/api/practice", practiceRoutes);


app.listen(8000, () => {
  console.log("Server running on port 8000");
  // console.log("Key loaded:", !!process.env.OPENAI_API_KEY)

  // console.log("Gemini Key Loaded 👉", !!process.env.GEMINI_API_KEY);
});
