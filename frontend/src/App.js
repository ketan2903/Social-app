import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Feed from "./Pages/feed";
import CreatePost from "./Pages/CreatePost";
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";
import { isLoggedIn } from "./Services/auth";

function App() {
  return (
     <BrowserRouter>

      {isLoggedIn() && <Navbar />}

      <Routes>
        {/* Default Route */}
        <Route
          path="/"
          element={
            isLoggedIn() ? <Navigate to="/feed" /> : <Navigate to="/login" />
          }
        />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
       
  );
}

export default App;
