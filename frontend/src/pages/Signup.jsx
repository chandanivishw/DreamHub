import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        { name, email, password },
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message); // show the backend message
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      toast.error("User already exists. Please login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
bg-gradient-to-br 
from-rose-100 via-purple-100 to-indigo-100 
dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
px-4 transition duration-300"
    >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeButton={false}
        pauseOnHover={true}
        draggable={true}
      />

      {/* Animated Card */}
      <div
        className="w-full max-w-sm 
    bg-white dark:bg-gray-800 
    p-6 sm:p-8 rounded-2xl shadow-xl
    border border-gray-200 dark:border-gray-700
    animate-fadeInUp"
      >
        <h2
          className="text-2xl font-bold text-center mb-6 
    text-gray-800 dark:text-white"
        >
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-4 py-2 border 
      border-gray-300 dark:border-gray-600
      bg-white dark:bg-gray-700 
      text-gray-900 dark:text-gray-100
      rounded-lg
      focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border 
      border-gray-300 dark:border-gray-600
      bg-white dark:bg-gray-700 
      text-gray-900 dark:text-gray-100
      rounded-lg
      focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-5 px-4 py-2 border 
      border-gray-300 dark:border-gray-600
      bg-white dark:bg-gray-700 
      text-gray-900 dark:text-gray-100
      rounded-lg
      focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full 
      bg-indigo-600 hover:bg-indigo-700 
      dark:bg-indigo-500 dark:hover:bg-indigo-600
      text-white py-2 rounded-lg
      transition duration-300 flex justify-center"
        >
          {loading ? (
            <span className="animate-pulse">Creating...</span>
          ) : (
            "Sign Up"
          )}
        </button>

        <p
          className="text-center mt-5 text-sm 
    text-gray-600 dark:text-gray-400"
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 dark:text-indigo-400 
        font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
