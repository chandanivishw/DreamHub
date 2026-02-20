import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
      { threshold: 0.4 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((c, i) =>
          c < targets[i]
            ? +(c + targets[i] / 40).toFixed(1)
            : targets[i]
        )
      );
    }, 40);

    return () => clearInterval(interval);
  }, [started]);


  const handleSpeakNow = () => {
    const user = localStorage.getItem("dreamhubUser");
    navigate(user ? "/practice" : "/login");
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl text-center animate-fadeInUp">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            Speak English Confidently with{" "}
            <span className="text-yellow-300">DreamHub</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8 text-white/90">
            Practice English with AI. Voice to voice. No fear. No judgement.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={handleSpeakNow}
              className="bg-white text-indigo-700 px-8 py-3 rounded-full font-semibold
              hover:scale-105 hover:bg-gray-100 transition-all duration-300 shadow-lg"
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
      {/* stats */}
      <section ref={statsRef} className="py-16 bg-white text-gray-800">
  <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center px-6">
    {[
      { label: "Active Users", val: `${Math.floor(counts[0])}+` },
      { label: "Quizzes Solved", val: `${Math.floor(counts[1])}+` },
      { label: "Daily Learners", val: `${Math.floor(counts[2])}+` },
      { label: "User Rating", val: `${counts[3].toFixed(1)}★` },
    ].map((s, i) => (
      <div key={i} className="p-6 rounded-2xl bg-gray-50 shadow hover:shadow-lg transition">
        <h3 className="text-3xl font-bold text-indigo-600">{s.val}</h3>
        <p className="text-gray-600">{s.label}</p>
      </div>
    ))}
  </div>
</section>

      {/* Features */}
      <section className="py-20 bg-white text-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose DreamHub?
        </h2>

        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3 px-6">
          {[
            { title: "🎤 Voice Practice", desc: "Practice speaking with AI anytime." },
            { title: "📘 Daily Vocabulary", desc: "Learn new English words daily." },
            { title: "🎯 Smart Quiz", desc: "Test yourself with interactive quizzes." },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-xl hover:-translate-y-2 transition"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-100 text-gray-800">
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
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition hover:-translate-y-2"
            >
              <p className="italic mb-4">“{u.review}”</p>
              <h4 className="font-semibold text-indigo-600">— {u.name}</h4>
            </div>
          ))}
        </div>
      </section>


{/* FAQ */}
      <section className="py-20 bg-white text-gray-800">
        <h2 className="text-3xl font-bold text-center mb-10">FAQs</h2>

        <div className="max-w-4xl mx-auto space-y-4 px-6">
          {[
            { q: "Is DreamHub free?", a: "Yes, you can practice English for free." },
            { q: "Do I need a mic?", a: "Yes, mic helps in voice practice." },
            { q: "For beginners?", a: "Yes, it’s beginner friendly." },
          ].map((f, i) => (
            <div key={i} className="border rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left p-4 font-semibold flex justify-between items-center hover:bg-gray-50"
              >
                {f.q}
                <span className="text-xl">{openFaq === i ? "−" : "+"}</span>
              </button>

              {openFaq === i && (
                <div className="p-4 pt-0 text-gray-600 animate-fadeInUp">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
       {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to improve your English?
        </h2>
        <p className="mb-6 text-white/90">Start practicing today 🚀</p>

        <button
          onClick={handleSpeakNow}
          className="bg-white text-indigo-700 px-10 py-4 rounded-full font-bold text-lg
          hover:scale-105 hover:bg-gray-100 transition-all duration-300 shadow-xl"
        >
          Get Started Free
        </button>
      </section>
    </div>
  );
};

export default Home;

