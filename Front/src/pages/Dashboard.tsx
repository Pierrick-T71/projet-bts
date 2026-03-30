// On ajoute 'role' dans l'interface pour que TS soit content
interface User {
  name: string;
  email: string;
  role: string; // Ajouté ici
}

export function Dashboard({ user, onLogout }: { user: User, onLogout: () => void }) {

  // On définit une couleur de badge selon le rôle pour le style
  const isProf = user.role === 'prof';

  return (
    <div className="flex flex-col items-center text-center">
      
      {/* Badge de rôle flottant au-dessus de l'avatar */}
      <span className={`mb-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
        isProf ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-blue-100 text-blue-700 border border-blue-200'
      }`}>
        {user.role}
      </span>

      {/* Avatar avec l'initiale */}
      <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-sm border ${
        isProf ? 'bg-purple-50 text-purple-600 border-purple-200' : 'bg-blue-100 text-blue-600 border-blue-200'
      }`}>
        {user.name.charAt(0).toUpperCase()}
      </div>

      <h2 className="text-2xl font-bold text-gray-900 leading-tight">Tableau de bord</h2>
      <p className="text-gray-600 mt-2 font-medium">
        Bienvenue, <span className="text-gray-900 font-bold">{user.name}</span>
      </p>

      {/* Zone d'infos enrichie avec le rôle */}
      <div className="w-full bg-gray-50 rounded-xl p-4 mt-8 text-left border border-gray-100 space-y-4">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</p>
          <p className="text-gray-700 font-semibold">{user.email}</p>
        </div>
        
        <div className="pt-3 border-t border-gray-200">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Statut</p>
          <p className={`font-bold mt-1 ${isProf ? 'text-purple-600' : 'text-blue-600'}`}>
             Utilisateur {user.role === 'prof' ? 'Enseignant' : 'Élève'}
          </p>
        </div>
      </div>

      {/* Actions adaptées au rôle */}
      <div className="grid grid-cols-1 gap-3 w-full mt-8">
        <button 
          className={`w-full text-white font-bold py-3 rounded-lg transition active:scale-95 shadow-md ${
            isProf ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-100' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'
          }`}
          onClick={() => alert(`Action spéciale pour ${user.role}`)}
        >
          {isProf ? "Gérer les cours" : "Accéder à mes devoirs"}
        </button>
        
        <button 
          onClick={onLogout}
          className="w-full bg-white text-gray-500 font-semibold py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 hover:text-gray-800 transition active:scale-95"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}