import { useState, useEffect } from "react";
import { apiService } from "./api/axios";
import { RegisterForm } from "./pages/Register";
import { LoginForm } from "./pages/Login";

export default function App() {
  const [user, setUser] = useState<any>(null); 
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(true); 

  const checkUser = async () => {
    // setLoading(true); // Optionnel, pour réafficher le chargement lors de la vérification
    const userData = await apiService.getUser();
    setUser(userData);
    setLoading(false);
  };

  useEffect(() => {
    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      await apiService.logout();
      setUser(null);
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  // 1. Écran de chargement centré et stylisé
  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 text-gray-600">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        Vérification de la connexion...
      </div>
    );
  }

  // 2. Conteneur principal qui centre tout verticalement et horizontalement
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-4">
      
      {/* 3. La CARTE CENTRÉE
        max-w-md : empêche la carte de prendre toute la largeur
        shadow-xl : ajoute une ombre portée élégante
        rounded-2xl : fait de beaux coins arrondis
      */}
      <div className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-100 w-full max-w-md border border-gray-100">
        
        {/* SI CONNECTÉ : Espace Privé */}
        {user ? (
          <div className="flex flex-col items-center text-center">
            {/* Un petit cercle avec l'initiale */}
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-5">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Espace Connecté</h2>
            <p className="text-gray-600">Bienvenue, <strong className="text-gray-800">{user.name}</strong>.</p>
            
            <div className="w-full bg-gray-50 rounded-lg p-4 mt-6 text-sm text-left border border-gray-100">
              <p className="text-gray-500">Informations de session :</p>
              <p className="text-gray-800 font-mono mt-1">{user.email}</p>
            </div>

            <button 
              onClick={handleLogout} 
              className="mt-8 w-full bg-white text-gray-700 font-semibold py-2.5 px-5 rounded-lg border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition active:scale-95 shadow-sm"
            >
              Se déconnecter
            </button>
          </div>
        
        ) : (
          
          /* SI NON CONNECTÉ : Espace Visiteur (Login / Register) */
          <div className="flex flex-col items-center">
            {/* Le sélecteur moderne */}
            <div className="flex w-full items-center bg-gray-100 border border-gray-200 rounded-lg p-1 mb-8">
              <button 
                onClick={() => setShowLogin(true)} 
                className={`flex-1 px-5 py-2.5 rounded-md text-sm font-semibold transition ${showLogin ? 'bg-white text-blue-700 shadow' : 'text-gray-600 hover:text-gray-800'}`}
              >
                Se connecter
              </button>
              <button 
                onClick={() => setShowLogin(false)} 
                className={`flex-1 px-5 py-2.5 rounded-md text-sm font-semibold transition ${!showLogin ? 'bg-white text-blue-700 shadow' : 'text-gray-600 hover:text-gray-800'}`}
              >
                Créer un compte
              </button>
            </div>
            
            {/* L'affichage du formulaire choisi (qui a maintenant sa prop onLoginSuccess) */}
            {showLogin ? <LoginForm onLoginSuccess={checkUser} /> : <RegisterForm />}
          </div>
        )}

      </div>
      
    </div>
  );
}