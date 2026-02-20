// utils/stats.js (FINAL - CLEAN & USER-WISE)
export const getCurrentUser = () => {
  const u = JSON.parse(localStorage.getItem("dreamhubUser"));
  // console.log("Current user:", u); // 👈 temporary
  return u;
};


// 🔹 Get stat
export const getStat = (key) => {
  const user = getCurrentUser();
  if (!user?.email) return 0;

  return Number(localStorage.getItem(`${key}_${user.email}`)) || 0;
};


// 🔹 Set stat
export const setStat = (key, value) => {
  const user = getCurrentUser();
  if (!user?.email) return;

  localStorage.setItem(`${key}_${user.email}`, value);
};

// 🔹 Increment stat
export let incStat = (key, by = 1) => {
  let current = getStat(key);
  let updated = current + by;
  setStat(key, updated);
  return updated;
};

// 🔥 Daily streak (user-wise + date based)
export const getDailyStreak = () => {
  const user = getCurrentUser();
  if (!user?.email) return 0;

  return Number(
    localStorage.getItem(`dailyStreak_${user.email}`)
  ) || 0;
};


export const updateDailyStreak = () => {
  const user = getCurrentUser();
  if (!user?.email) return 0;

  const today = new Date().toDateString();
  const lastDateKey = `lastPracticeDate_${user.email}`;
  const streakKey = `dailyStreak_${user.email}`;

  const lastDate = localStorage.getItem(lastDateKey);
  let streak = Number(localStorage.getItem(streakKey)) || 0;

  if (lastDate !== today) {
    streak += 1;
    localStorage.setItem(streakKey, streak);
    localStorage.setItem(lastDateKey, today);
  }

  return streak;
};
