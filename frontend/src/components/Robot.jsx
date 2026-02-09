// latest
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import botAnimation from "../assets/AI Robot.json";

export default function Robot({ message, listening }) {
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    if (!message) return;
    setThinking(true);
    const timer = setTimeout(() => setThinking(false), 600);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-60">
        <Lottie
          animationData={botAnimation}
          loop
          autoplay
        />
      </div>

      <div className="bg-white px-5 py-3 rounded-xl shadow max-w-md text-gray-800 text-lg">
        {listening
          ? "🎧 I'm listening to you..."
          : thinking
          ? "🤔 Let me think..."
          : message}
      </div>
    </div>
  );
}
