import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900 text-gray-300 pt-12 pb-6 mt-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-4">

        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-indigo-400 mb-3">
            DreamHub ✨
          </h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Practice English speaking confidently with AI.  
            Voice to voice. No fear. No judgement.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="https://github.com/" target="_blank" rel="noreferrer"
               className="text-gray-400 hover:text-white hover:scale-110 transition">
              <FaGithub size={22} />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer"
               className="text-gray-400 hover:text-blue-400 hover:scale-110 transition">
              <FaLinkedin size={22} />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer"
               className="text-gray-400 hover:text-pink-400 hover:scale-110 transition">
              <FaInstagram size={22} />
            </a>
          </div>
        </div>

        {/* Links */}

{/* <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</Link>
<Link to="/vocab" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Vocabulary</Link>
<Link to="/quiz" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Quiz</Link>
<Link to="/login" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Login</Link> 
*/}


        <div>
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-indigo-400 transition hover:translate-x-1 inline-block" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/practice" className="hover:text-indigo-400 transition hover:translate-x-1 inline-block" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Practice
              </Link>
            </li>
            <li>
              <Link to="/vocab" className="hover:text-indigo-400 transition hover:translate-x-1 inline-block" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Vocabulary
              </Link>
            </li>
            <li>
              <Link to="/quiz" className="hover:text-indigo-400 transition hover:translate-x-1 inline-block" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Quiz
              </Link>
            </li>
              {/* <li>
              <Link to="/dashboard" className="hover:text-indigo-400 transition hover:translate-x-1 inline-block" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Dashboard
              </Link>
            </li> */}
          </ul>
        </div>

        {/* Features */}
        <div>
          <h4 className="font-semibold text-white mb-3">Features</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>🎤 Voice to Voice Practice</li>
            <li>🧠 Smart Correction</li>
            <li>📘 Daily Vocabulary</li>
            <li>🎯 Fun Quizzes</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white mb-3">Contact</h4>
          <p className="text-sm text-gray-400">📧 support@dreamhub.ai</p>
          <p className="text-sm mt-1 text-gray-400">🇮🇳 Made in India</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center mt-10 text-xs text-gray-500 border-t border-white/10 pt-4">
        © 2026 DreamHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
