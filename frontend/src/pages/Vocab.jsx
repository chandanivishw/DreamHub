import { useEffect, useState } from "react";
import axios from "axios";
import { incStat } from "../utils/stats";

export default function Vocab() {
  const [vocab, setVocab] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVocab = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/practice/vocab`,
      );
      setVocab(res.data);
    } catch (err) {
      console.error("Vocab API error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVocab();
  }, []);

  const speakWord = () => {
    if (!vocab) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(vocab.word);
    utterance.lang = "en-IN";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (

<div className="min-h-screen 
bg-gray-50 dark:bg-gray-900 
text-gray-900 dark:text-gray-100 
transition duration-300
flex flex-col items-center 
justify-start pt-2 sm:justify-center sm:pt-0
px-4 py-6 sm:p-6">

  <h2 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-6 
  text-indigo-700 dark:text-indigo-400 text-center leading-snug">
    📘 Daily Vocabulary
  </h2>

  <div className="bg-white dark:bg-gray-800 
  p-4 sm:p-6 rounded-2xl shadow-xl 
  max-w-md w-full text-center animate-fadeIn">

    {loading && (
      <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
        Loading new word...
      </p>
    )}

    {vocab && !loading && (
      <>
        <h3 className="text-xl sm:text-2xl font-bold 
        text-indigo-600 dark:text-indigo-400 animate-pop break-words">
          {vocab.word}
        </h3>

        <p className="mt-2 text-sm sm:text-base 
        text-gray-800 dark:text-gray-300 leading-relaxed">
          <b className="text-gray-900 dark:text-white">Meaning:</b>{" "}
          {vocab.meaning}
        </p>

        <p className="mt-2 italic text-sm sm:text-base 
        text-gray-600 dark:text-gray-400 leading-relaxed">
          <b className="text-gray-900 dark:text-white">Example:</b>{" "}
          {vocab.example}
        </p>

        {/* Buttons */}
        <div className="flex flex-row sm:flex-row 
        gap-3 justify-center mt-5">

          {/* Hear */}
          <button
            onClick={speakWord}
            title="Hear"
            className="flex-1 sm:flex-none px-3 py-2 
            bg-green-500 hover:bg-green-600 
            dark:bg-green-600 dark:hover:bg-green-700 
            text-white rounded-lg transition flex items-center justify-center gap-2"
          >
            <span>🔊</span>
            <span className="hidden sm:inline">Hear</span>
          </button>

          {/* New */}
          <button
            onClick={fetchVocab}
            title="New"
            className="flex-1 sm:flex-none px-3 py-2 
            bg-indigo-600 hover:bg-indigo-700 
            dark:bg-indigo-500 dark:hover:bg-indigo-600 
            text-white rounded-lg transition flex items-center justify-center gap-2"
          >
            <span>🔄</span>
            <span className="hidden sm:inline">New</span>
          </button>

          {/* Learned */}
          <button
            onClick={() => incStat("vocabLearned")}
            title="Learned"
            className="flex-1 sm:flex-none px-3 py-2 
            bg-emerald-600 hover:bg-emerald-700 
            dark:bg-emerald-500 dark:hover:bg-emerald-600 
            text-white rounded-lg flex items-center justify-center gap-2"
          >
            <span>✅</span>
            <span className="hidden sm:inline">Learned</span>
          </button>

        </div>
      </>
    )}
  </div>
</div>
  );
}
