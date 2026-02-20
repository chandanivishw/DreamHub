import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Practice from "./pages/Practice";
import ProtectedRoute from "./components/ProtectedRoute";
import Vocab from "./pages/Vocab";
import Quiz from "./pages/Quiz";
import ScrollToTop from "./components/ScrollToTop";

// import 'animate.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/profile";
function App() {
  return (
    <BrowserRouter>
     <ToastContainer
        position="top-center" // Ensure it’s not hidden behind other UI elements
        autoClose={3000}       // Auto close after 3 seconds
        hideProgressBar={false}
        newestOnTop={true}
        closeButton={false}
        pauseOnHover={true}
        draggable={true}
      />
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/practice"
          element={
            <ProtectedRoute>
              <Practice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vocab"
          element={
            <ProtectedRoute>
              <Vocab />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />
  <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
           <Dashboard />
            </ProtectedRoute>
          }
        />

{/* <Route path="/dashboard" element={<Dashboard />} /> */}
<Route path="/profile" element={<Profile />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
