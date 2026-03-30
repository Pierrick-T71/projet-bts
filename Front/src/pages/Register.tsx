import { useState } from "react";
import { apiService } from "../api/axios"; 
import { Link } from "react-router-dom";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    setLoading(true);

    try {
      const data = await apiService.register({ 
          name: name,
          email: email, 
          password: password,
          password_confirmation: confirmPassword 
      });
      
      console.log("Utilisateur inscrit :", data);
      setSuccess("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full px-4 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-gray-900">Inscription</h2>
        <p className="text-sm text-gray-500 mt-1">Créez votre compte en quelques secondes</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Nom complet</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Jean Dupont"
          className={inputStyle}
        />
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

      <div>
        <label className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
      
      {success && (
        <div className="p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg">
          {success}
        </div>
      )}

      <button 
        type="submit" 
        disabled={loading}
        className="w-full py-2.5 mt-2 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50"
      >
        {loading ? "Création du compte..." : "S'inscrire"}
      </button>
      <p className="text-center text-sm text-gray-600 mt-4">
        Déjà inscrit ?{" "}
        <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Se connecter
        </Link>
      </p>
    </form>
  );
}