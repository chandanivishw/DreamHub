//latest
import { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Robot from "../components/Robot";
// import { incStat } from "../utils/stats";
import { incStat, updateDailyStreak } from "../utils/stats";

export default function Practice() {
  const token = localStorage.getItem("token");

  const [listening, setListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [robotReply, setRobotReply] = useState(
    "Tap the mic and speak English 😊",
  );
  const [cooldown, setCooldown] = useState(false); // 🔥 NEW

  const recognitionRef = useRef(null);

  if (!token) {
    return <Navigate to="/login" />;
  }

  // 🔊 Robot speaks
  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  // 🎤 Start microphone
  const startListening = () => {
    if (cooldown) {
      setRobotReply("⏳ Please wait 20 seconds before next practice 🙂");
      speak("Please wait 20 seconds before next practice");
      return;
    }

    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser");
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "en-IN";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setListening(true);
        setSpokenText("");
      };

      recognition.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        setSpokenText(transcript);

        try {
          setCooldown(true); // 🔥 start cooldown

          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/chat`,
            { message: transcript },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (!res.data?.reply) {
            setRobotReply("AI replied but no message 😕");
            return;
          }

          setRobotReply(res.data.reply);
          // incStat("practiceCount", 1); // 👈 practice session count
          incStat("practiceCount");
          // updateDailyStreak();
          updateDailyStreak(); // 👈 daily streak update
          const newStreak = updateDailyStreak();
          window.dispatchEvent(
            new CustomEvent("streakUpdated", { detail: newStreak }),
          );

          speak(res.data.reply);

          // 🔥 20 seconds cooldown
          setTimeout(() => {
            setCooldown(false);
          }, 20000);
        } catch (err) {
          console.error("API Error:", err.response || err.message);

          if (err.response?.status === 429) {
            setRobotReply("⏳ Too many requests. Please wait 20 seconds 🙂");
            speak("Too many requests. Please wait 20 seconds");
          } else {
            setRobotReply("Sorry, something went wrong 😔");
          }

          setTimeout(() => {
            setCooldown(false);
          }, 20000);
        }
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognitionRef.current = recognition;
    }

    recognitionRef.current.start();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center px-4 text-center">
      <Robot message={robotReply} />

      {spokenText && (
        <p className="mt-4 text-gray-700">
          🗣 You said: <b>{spokenText}</b>
        </p>
      )}

      <button
        onClick={startListening}
        disabled={cooldown} // 🔥 disable during cooldown
        className={`mt-8 w-20 h-20 rounded-full text-white text-3xl shadow-lg ${
          listening ? "bg-green-500" : "bg-red-500"
        } ${cooldown ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        🎤
      </button>

      <p className="mt-4 text-gray-600">
        {listening
          ? "Listening..."
          : cooldown
            ? "⏳ Please wait 20 seconds..."
            : "Tap mic to speak"}
      </p>
    </div>
  );
}
