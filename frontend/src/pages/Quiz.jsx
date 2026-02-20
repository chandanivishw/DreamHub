import { useEffect, useState } from "react";
import axios from "axios";
import { incStat } from "../utils/stats";

export default function Quiz() {
  const [quiz, setQuiz] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [autoTimer, setAutoTimer] = useState(null);

  const fetchQuiz = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/practice/quiz`,
    );
    setQuiz(res.data);
    setSelected(null);
    setShowResult(false);
    if (autoTimer) clearTimeout(autoTimer);
  };

  useEffect(() => {
    fetchQuiz();
    return () => autoTimer && clearTimeout(autoTimer);
  }, []);

  const handleClick = (index) => {
    if (showResult) return;

    setSelected(index);
    setShowResult(true);
    incStat("quizAttempts");

    const timer = setTimeout(() => {
      fetchQuiz();
    }, 1500);

    setAutoTimer(timer);
  };

  const handleNext = () => {
    if (autoTimer) clearTimeout(autoTimer);
    fetchQuiz();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 px-4">
      <h2 className="text-2xl font-bold mb-4">🎯 English Quiz</h2>

      {quiz && (
        <div className="bg-white p-6 rounded-xl shadow max-w-md w-full animate-fadeIn">
          <p className="mb-4 font-medium text-lg">{quiz.question}</p>

          {quiz.options.map((opt, index) => {
            const isCorrect = index === quiz.answer;
            const isSelected = index === selected;

            let cls =
              "block w-full text-left px-4 py-2 border rounded mb-2 transition-all duration-300";

            if (showResult) {
              if (isCorrect) {
                cls +=
                  " bg-green-100 border-green-500 text-green-700 animate-bounce";
              } else if (isSelected && !isCorrect) {
                cls += " bg-red-100 border-red-500 text-red-700 animate-shake";
              } else {
                cls += " bg-gray-50";
              }
            } else {
              cls += " hover:bg-indigo-50";
            }

            return (
              <button
                key={index}
                onClick={() => handleClick(index)}
                disabled={showResult}
                className={cls}
              >
                <div className="flex items-center justify-between">
                  <span>{opt}</span>
                  {showResult && isCorrect && (
                    <span className="text-xl">✔️</span>
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <span className="text-xl">❌</span>
                  )}
                </div>
              </button>
            );
          })}

          {showResult && (
            <p className="mt-3 text-center font-semibold">
              {selected === quiz.answer
                ? "🎉 Correct! Keep going!"
                : "😅 Oops! Correct option highlighted."}
            </p>
          )}

          {/* 👇 Next button */}
          <button
            onClick={handleNext}
            className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Next Question ➡️
          </button>
        </div>
      )}
    </div>
  );
}
