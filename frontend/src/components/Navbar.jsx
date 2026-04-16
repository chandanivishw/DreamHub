import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("dreamhubUser");
  const [open, setOpen] = useState(false);

  // Dark Mode
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("dreamhubUser");
    toast.success("Logged out successfully");
    setTimeout(() => navigate("/"), 1200);
  };

  const linkBase =
    "px-4 py-2 rounded-lg transition-all duration-200 font-medium";

  const linkStyle = ({ isActive }) =>
    isActive
      ? "bg-blue-500 text-white border border-blue-400"
      : "border border-indigo-600 text-gray-800 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:scale-105";

  return (
    <nav
      className="w-full 
    bg-white/80 dark:bg-gray-900/80 
    backdrop-blur-md shadow-md 
    px-4 md:px-8 py-4 
    flex items-center justify-between 
    sticky top-0 z-50 animate-fadeIn"
    >
      {/* Logo */}
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer hover:scale-105 transition"
      >
        DreamHub ✨
      </h1>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl text-gray-800 dark:text-white"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Links */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } md:flex flex-col md:flex-row gap-3 md:gap-4 items-center 
        absolute md:static top-16 left-0 w-full md:w-auto 
        bg-white dark:bg-gray-900 md:bg-transparent 
        p-4 md:p-0 shadow md:shadow-none 
        rounded-b-xl md:rounded-none`}
      >
        {!isLoggedIn ? (
          <>
            <NavLink
              to="/"
              className={(e) => linkBase + " " + linkStyle(e)}
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/login"
              className={(e) => linkBase + " " + linkStyle(e)}
              onClick={() => setOpen(false)}
            >
              Login
            </NavLink>

            <NavLink
              to="/signup"
              className={(e) => linkBase + " " + linkStyle(e)}
              onClick={() => setOpen(false)}
            >
              Signup
            </NavLink>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:scale-105 transition"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/"
              className={(e) => linkBase + " " + linkStyle(e)}
              onClick={() => setOpen(false)}
            >
              Home 🏠
            </NavLink>

            <NavLink
              to="/practice"
              className={(e) => linkBase + " " + linkStyle(e)}
              onClick={() => setOpen(false)}
            >
              Practice 🎤
            </NavLink>

            <NavLink
              to="/vocab"
              className={(e) => linkBase + " " + linkStyle(e)}
              onClick={() => setOpen(false)}
            >
              Vocab 📘
            </NavLink>

            <NavLink
              to="/quiz"
              className={(e) => linkBase + " " + linkStyle(e)}
              onClick={() => setOpen(false)}
            >
              Quiz 🎯
            </NavLink>

            <NavLink
              to="/dashboard"
              className={(e) => linkBase + " " + linkStyle(e)}
              onClick={() => setOpen(false)}
            >
              📊 Dashboard
            </NavLink>

            <NavLink
              to="/profile"
              className={(e) => linkBase + " " + linkStyle(e)}
              onClick={() => setOpen(false)}
            >
              Profile
            </NavLink>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:scale-105 transition"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition hover:scale-105"
            >
              Logout
            </button>

            <ToastContainer />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
