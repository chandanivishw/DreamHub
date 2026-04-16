import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const statsRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [openFaq, setOpenFaq] = useState(null);

  const targets = [1000, 2500, 500, 4.8];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.4 },
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((c, i) =>
          c < targets[i] ? +(c + targets[i] / 40).toFixed(1) : targets[i],
        ),
      );
    }, 40);

    return () => clearInterval(interval);
  }, [started]);

  const handleSpeakNow = () => {
    const user = localStorage.getItem("dreamhubUser");
    navigate(user ? "/practice" : "/login");
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition duration-300">
      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white dark:text-gray-100 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-black">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Speak English Confidently with
            <span className="text-yellow-400"> DreamHub</span>
          </h1>
          <p className="text-lg mb-8 text-black-600 dark:text-gray-300">
            Practice English with AI. Voice to voice. No fear. No judgement.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={handleSpeakNow}
              className="bg-indigo-600 px-8 py-3 rounded-full font-semibold text-white
          hover:scale-105 hover:bg-indigo-500 transition-all duration-300 shadow-lg"
            >
              🎤 Speak Now
            </button>

            <button
              onClick={() => navigate("/vocab")}
              className="border border-white/40 px-8 py-3 rounded-full font-semibold
              hover:bg-white/10 hover:scale-105 transition-all duration-300"
            >
              📘 Learn Vocab
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section
        ref={statsRef}
        className="py-16 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center px-6">
          {[
            { label: "Active Users", val: `${Math.floor(counts[0])}+` },
            { label: "Quizzes Solved", val: `${Math.floor(counts[1])}+` },
            { label: "Daily Learners", val: `${Math.floor(counts[2])}+` },
            { label: "User Rating", val: `${counts[3].toFixed(1)}★` },
          ].map((s, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 shadow hover:shadow-xl transition"
            >
              <h3 className="text-3xl font-bold text-yellow-400">{s.val}</h3>
              <p className="text-gray-500 dark:text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-slate-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose DreamHub?
        </h2>

        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3 px-6">
          {[
            {
              title: "🎤 Voice Practice",
              desc: "Practice speaking with AI anytime.",
            },
            {
              title: "📘 Daily Vocabulary",
              desc: "Learn new English words daily.",
            },
            {
              title: "🎯 Smart Quiz",
              desc: "Test yourself with interactive quizzes.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow
          hover:shadow-2xl hover:-translate-y-2 transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-yellow-500">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Users Say ❤️
        </h2>

        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3 px-6">
          {[
            { name: "Rohit Sharma", review: "My confidence improved a lot!" },
            { name: "Pooja Verma", review: "Daily vocab + quiz is amazing." },
            { name: "Aman Khan", review: "Best platform for beginners." },
          ].map((u, i) => (
            <div
              key={i}
              className="bg-slate-50 dark:bg-gray-900 p-6 rounded-2xl shadow
          hover:shadow-2xl transition hover:-translate-y-2"
            >
              <p className="italic mb-4 text-gray-600 dark:text-gray-300">
                “{u.review}”
              </p>
              <h4 className="font-semibold text-yellow-500">— {u.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-100 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-10">FAQs</h2>

        <div className="max-w-4xl mx-auto space-y-4 px-6">
          {[
            {
              q: "Is DreamHub free?",
              a: "Yes, you can practice English for free.",
            },
            { q: "Do I need a mic?", a: "Yes, mic helps in voice practice." },
            { q: "For beginners?", a: "Yes, it’s beginner friendly." },
          ].map((f, i) => (
            <div
              key={i}
              className="border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left p-4 font-semibold flex justify-between items-center
            hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {f.q}
                <span className="text-xl">{openFaq === i ? "−" : "+"}</span>
              </button>

              {openFaq === i && (
                <div className="p-4 pt-0 text-gray-600 dark:text-gray-400">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <section
        className="py-16 sm:py-20 text-center 
 px-4 transition duration-300 bg-gradient-to-br from-purple-600 to-red-400 text-white dark:text-gray-100 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-black"
      >
        <h2
          className="text-2xl sm:text-3xl md:text-4xl 
  font-bold mb-4 leading-snug"
        >
          Ready to improve your English?
        </h2>

        <p
          className="mb-6 text-blue-100 dark:text-gray-300 
  text-sm sm:text-base max-w-xl mx-auto"
        >
          Start practicing today 🚀
        </p>

        <button
          onClick={handleSpeakNow}
          className="bg-white text-blue-600 
    px-6 sm:px-8 py-3 sm:py-4 
    rounded-full font-semibold sm:font-bold 
    text-sm sm:text-lg
    hover:scale-105 hover:bg-blue-100 
    transition-all duration-300 shadow-xl"
        >
          Get Started Free
        </button>
      </section>
    </div>
  );
};

export default Home;
