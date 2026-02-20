// fnal with animation and responsive
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password },
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("dreamhubUser", JSON.stringify(data.user));
      // localStorage.setItem(
      //   "dreamhubUser",
      //   JSON.stringify({
      //     name: data.name || "chandani",
      //     email: data.email || "chandanivishwakarma581@gmail.com",
      //     photo: data.photo || "",
      //   }),
      // );
//       localStorage.setItem(
//   "dreamhubUser",
//   JSON.stringify({
//     name: data.user?.name || "",
//     email: data.user?.email || "",
//     photo: data.user?.photo || "",
//   }),
// );
// localStorage.setItem("dreamhubUser", JSON.stringify(data.user));


      toast.success(data.message); // show the backend message
      // toast.success("Login successful 🚀");
      toast.info("Redirecting to practice page...");
      setTimeout(() => navigate("/practice"), 1500);
      //
      navigate("/practice", { replace: true });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed");
      } else {
        toast.error("Server error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-purple-100 to-indigo-100 px-4">
      <ToastContainer />

      {/* Animated Card */}
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-2xl shadow-xl
                   animate-fadeInUp"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login to DreamHub
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none
                     focus:ring-2 focus:ring-indigo-500"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-5 px-4 py-2 border rounded-lg focus:outline-none
                     focus:ring-2 focus:ring-indigo-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg
                     hover:bg-indigo-700 transition duration-300
                     flex items-center justify-center"
        >
          {loading ? (
            <span className="animate-pulse">Logging in...</span>
          ) : (
            "Login"
          )}
        </button>

        <p className="text-center mt-5 text-sm text-gray-600">
          New here?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-medium hover:underline"
          >
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
