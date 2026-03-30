import { useState } from "react";
import { apiService } from "../api/axios";
import { Link } from "react-router-dom";

export function LoginForm({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await apiService.login({ email, password });
      onLoginSuccess(); 
    } catch (err: any) {
      if (err.response?.status === 422 || err.response?.status === 401) {
         setError("Identifiants incorrects. Veuillez réessayer.");
      } else {
         setError("Erreur réseau. Vérifiez la console.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Une variable pour ne pas répéter les mêmes classes CSS sur chaque input
  const inputStyle = "w-full px-4 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-gray-900">Connexion</h2>
        <p className="text-sm text-gray-500 mt-1">Accédez à votre espace sécurisé</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="jean.dupont@email.com"
          className={inputStyle}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          className={inputStyle}
        />
      </div>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
          {error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={loading}
        className="w-full py-2.5 mt-2 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50"
      >
        {loading ? "Connexion en cours..." : "Se connecter"}
      </button>
      <p className="text-center text-sm text-gray-600 mt-4">
        Pas encore de compte ?{" "}
        <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Créer un compte
        </Link>
      </p>
    </form>
  );
}