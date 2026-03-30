import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { apiService } from "./api/axios";
import { RegisterForm } from "./pages/Register";
import { LoginForm } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkUser = async () => {
    const userData = await apiService.getUser();
    setUser(userData);
    setLoading(false);
  };

  useEffect(() => {
    checkUser();
  }, []);

  const handleLoginSuccess = async () => {
    await checkUser(); // On récupère l'user
    navigate("/dashboard"); // On redirige vers le dashboard
  };

  const handleLogout = async () => {
    await apiService.logout();
    setUser(null);
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600">
        <div className="w-10 h-10 border-4 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <Routes>
          {/* 1. Accueil : Redirection automatique */}
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />

          {/* 2. Page Login */}
          <Route 
            path="/login" 
            element={!user ? <LoginForm onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/dashboard" />} 
          />

          {/* 3. Page Register */}
          <Route 
            path="/register" 
            element={!user ? <RegisterForm /> : <Navigate to="/dashboard" />} 
          />

          {/* 4. Page Dashboard (PROPRE) */}
          <Route 
            path="/dashboard" 
            element={
              user ? (
                <Dashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
        </Routes>
      </div>
    </div>
  );
}