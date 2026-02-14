import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import PublicProfile from "./pages/PublicProfile";


function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <div className="min-h-screen text-white">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/u/:userId" element={<PublicProfile />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <Profile />
              </>
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
