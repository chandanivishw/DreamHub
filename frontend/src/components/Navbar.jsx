import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("dreamhubUser");
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("dreamhubUser");
    navigate("/");
  };

  const linkBase =
    "px-4 py-2 rounded-lg transition-all duration-200 font-medium";
  const linkStyle = ({ isActive }) =>
    isActive
      ? "bg-blue-500 text-white border border-blue-400"
      : "border border-indigo-600 text-black hover:bg-indigo-50 hover:scale-105";

  return (
    <nav className="w-full bg-white/80 backdrop-blur shadow-md px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-50 animate-fadeIn">
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-indigo-600 cursor-pointer hover:scale-105 transition"
      >
        DreamHub ✨
      </h1>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {/* Links */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } md:flex flex-col md:flex-row gap-3 md:gap-4 items-center absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 shadow md:shadow-none rounded-b-xl md:rounded-none`}
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
          </>
        ) : (
          <>
            {/* <NavLink to="/practice" className={linkStyle + " " + linkBase} onClick={() => setOpen(false)}>
              Practice 🎤
            </NavLink>
            <NavLink to="/vocab" className={linkStyle + " " + linkBase} onClick={() => setOpen(false)}>
              Vocab 📘
            </NavLink>
            <NavLink to="/quiz" className={linkStyle + " " + linkBase} onClick={() => setOpen(false)}>
              Quiz 🎯
            </NavLink> */}
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

            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition hover:scale-105"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
