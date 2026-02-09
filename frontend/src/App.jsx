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

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
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
              <Vocab/>
            </ProtectedRoute>
          } />
     <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Quiz/>
            </ProtectedRoute>
          } />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
