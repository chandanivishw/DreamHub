import { useEffect, useState } from "react";
import { getStat, getDailyStreak } from "../utils/stats";


const Dashboard = () => {
  const [stats, setStats] = useState({
    dailyStreak: 0,
    totalSessions: 0,
    vocabLearned: 0,
    quizAttempts: 0,
  });

useEffect(() => {
  const loadStats = () => {
    setStats({
      dailyStreak: getDailyStreak(),
      totalSessions: getStat("practiceCount"),
      vocabLearned: getStat("vocabLearned"),
      quizAttempts: getStat("quizAttempts"),
    });
  };

  loadStats();
  window.addEventListener("focus", loadStats);
  window.addEventListener("streakUpdated", loadStats); // 🔥 listen to practice updates

  return () => {
    window.removeEventListener("focus", loadStats);
    window.removeEventListener("streakUpdated", loadStats);
  };
}, []);


// useEffect(() => {
//   const loadStats = () => {
//     setStats({
//       dailyStreak: getDailyStreak(),
//       totalSessions: getStat("practiceCount"),
//       vocabLearned: getStat("vocabLearned"),
//       quizAttempts: getStat("quizAttempts"),
//     });
//   };

//   loadStats();
//   window.addEventListener("focus", loadStats);

//   return () => window.removeEventListener("focus", loadStats);
// }, []);

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition duration-300">
      

   
<div className="min-h-screen bg-gradient-to-br 
from-purple-600 to-red-400 
dark:from-gray-900 dark:to-gray-800 
p-6 text-white transition duration-300">      
<h1 className="text-3xl font-bold mb-6 text-center">Your Dashboard 🚀</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
        <div className="bg-white/10 backdrop-blur p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition">
          <p className="text-sm opacity-80">🔥 Daily Streak</p>
          <h2 className="text-4xl font-bold mt-2">{stats.dailyStreak}</h2>
        </div>

        <div className="bg-white/10 backdrop-blur p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition">
          <p className="text-sm opacity-80">🎤 Sessions</p>
          <h2 className="text-4xl font-bold mt-2">{stats.totalSessions}</h2>
        </div>

        <div className="bg-white/10 backdrop-blur p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition">
          <p className="text-sm opacity-80">📘 Vocab Learned</p>
          <h2 className="text-4xl font-bold mt-2">{stats.vocabLearned}</h2>
        </div>

        <div className="bg-white/10 backdrop-blur p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition">
          <p className="text-sm opacity-80">🎯 Quiz Attempts</p>
          <h2 className="text-4xl font-bold mt-2">{stats.quizAttempts}</h2>
        </div>
      </div>
    </div>
     </div>
  );
};

export default Dashboard;

