// final with responsive design and animations
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
        "http://localhost:8000/api/auth/register",
        { name, email, password }
      );

      if (response.status === 200) {
        toast.success("Account created successfully 🎉");
        navigate("/login");
      }
    } catch (err) {
      toast.error("User already exists. Please login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-rose-100 via-purple-100 to-indigo-100 px-4">
      <ToastContainer />

      {/* Animated Card */}
      <div
        className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-2xl shadow-xl
                   animate-fadeInUp"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-5 px-4 py-2 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg
                     hover:bg-indigo-700 transition duration-300
                     flex justify-center"
        >
          {loading ? (
            <span className="animate-pulse">Creating...</span>
          ) : (
            "Sign Up"
          )}
        </button>

        <p className="text-center mt-5 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
