// lastest
import { useEffect, useState } from "react";
import axios from "axios";

export default function Vocab() {
  const [vocab, setVocab] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVocab = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/practice/vocab");
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100 px-4">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">
        📘 Daily Vocabulary
      </h2>

      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full text-center animate-fadeIn">
        {loading && <p className="text-gray-500">Loading new word...</p>}

        {vocab && !loading && (
          <>
            <h3 className="text-2xl font-bold text-indigo-600 animate-pop">
              {vocab.word}
            </h3>

            <p className="mt-2 text-gray-800">
              <b>Meaning:</b> {vocab.meaning}
            </p>

            <p className="mt-2 italic text-gray-600">
              <b>Example:</b> {vocab.example}
            </p>

            <div className="flex gap-3 justify-center mt-5">
              <button
                onClick={speakWord}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                🔊 Hear Pronunciation
              </button>

              <button
                onClick={fetchVocab}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                🔄 New Word
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
