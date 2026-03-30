import { useEffect, useState } from "react";
import { apiService } from "../api/axios";

export function Dashboard({ user, onLogout }: { user: any, onLogout: () => void }) {
  const [exercices, setExercices] = useState<any[]>([]);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadExercices();
  }, []);

  const loadExercices = async () => {
    const data = await apiService.getExercices();
    setExercices(data);
  };

  const handleAddExercice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.createExercice({ nom, description });
      setNom(""); 
      setDescription("");
      await loadExercices(); 
    } catch (err) {
      console.error("Erreur lors de l'ajout :", err);
      alert("Erreur lors de l'ajout. Vérifie la console.");
    }
  };

  const handleDelete = async (id: number) => {
    if(confirm("Êtes-vous sûr de vouloir supprimer cet exercice ?")) {
        await apiService.deleteExercice(id);
        loadExercices();
    }
  };

  return (
    <div className="fixed inset-0 z-10 bg-gray-50 overflow-y-auto w-full h-full text-left">
      
      {/* 1. LA BARRE DE NAVIGATION EN HAUT (NAVBAR) */}
      <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-inner">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-lg leading-tight">
              Espace {user.role === 'prof' ? 'Enseignant' : 'Élève'}
            </h1>
            <p className="text-sm text-gray-500 font-medium">Connecté en tant que {user.name}</p>
          </div>
        </div>
        <button 
          onClick={onLogout} 
          className="px-4 py-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition active:scale-95"
        >
          Déconnexion
        </button>
      </nav>

      {/* 2. LA ZONE PRINCIPALE */}
      <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">

        {/* COLONNE GAUCHE : Formulaire (Si prof uniquement) */}
        {user.role === 'prof' && (
          <div className="w-full md:w-1/3">
            {/* Le formulaire reste "collé" en haut quand on scroll (sticky) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 sticky top-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="text-blue-600 text-2xl">+</span> Créer un exercice
              </h2>
              
              <form onSubmit={handleAddExercice} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Titre de l'exercice</label>
                  <input 
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition" 
                    placeholder="Ex: Mathématiques - Algèbre" 
                    value={nom} 
                    onChange={e => setNom(e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Consignes / Description</label>
                  <textarea 
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition min-h-[140px] resize-y" 
                    placeholder="Détaillez le travail à faire..." 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    required 
                  />
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 active:scale-95 transition shadow-md shadow-blue-200 mt-2">
                  Publier l'exercice
                </button>
              </form>
            </div>
          </div>
        )}

        {/* COLONNE DROITE : Liste des exercices */}
        <div className={`w-full ${user.role === 'prof' ? 'md:w-2/3' : 'max-w-4xl mx-auto'}`}>
          
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Tableau des exercices</h2>
            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
              {exercices.length} exo{exercices.length > 1 ? 's' : ''}
            </span>
          </div>

          {/* S'il n'y a pas d'exercices */}
          {exercices.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border-2 border-dashed border-gray-300 text-center flex flex-col items-center justify-center text-gray-500">
              <span className="text-4xl mb-3">📚</span>
              <p className="text-lg font-bold text-gray-700">Aucun exercice disponible.</p>
              {user.role === 'prof' && <p className="text-sm mt-1">Commencez par en créer un via le formulaire à gauche.</p>}
            </div>
          ) : (
            
            /* Grille d'affichage des exercices */
            <div className="grid grid-cols-1 gap-5">
              {exercices.map((ex) => (
                <div key={ex.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between gap-6 hover:shadow-md transition">
                  <div className="flex-1">
                    <h3 className="font-extrabold text-xl text-blue-900 mb-2">{ex.nom}</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{ex.description}</p>
                  </div>
                  
                  {/* Bouton supprimer (Si prof uniquement) */}
                  {user.role === 'prof' && (
                    <div className="sm:border-l sm:border-gray-100 sm:pl-6 flex items-center shrink-0">
                      <button 
                        onClick={() => handleDelete(ex.id)} 
                        className="w-full sm:w-auto text-sm font-bold text-red-500 bg-red-50 border border-red-100 px-5 py-2.5 rounded-lg hover:bg-red-500 hover:text-white transition"
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>

      </main>
    </div>
  );
}