import { useEffect, useState } from "react";
import { apiService } from "../api/axios";

export function Dashboard({ user, onLogout }: { user: any, onLogout: () => void }) {
  const [exercices, setExercices] = useState<any[]>([]);
  const [programmes, setProgrammes] = useState<any[]>([]);
  
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProgrammes, setSelectedProgrammes] = useState<number[]>([]); // Tableau d'IDs
  
  // Gestion des notifications (Toasts)
  const [notification, setNotification] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Charge les exos ET les programmes en même temps
  const loadData = async () => {
    try {
      const [exosData, progsData] = await Promise.all([
        apiService.getExercices(),
        apiService.getProgrammes()
      ]);
      setExercices(exosData);
      setProgrammes(progsData);
    } catch (error) {
      console.error("Erreur de chargement des données", error);
    }
  };

  // Fonction pour cocher/décocher un programme
  const toggleProgramme = (id: number) => {
    setSelectedProgrammes(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const handleAddExercice = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sécurité : obliger le prof à choisir au moins une matière
    if (selectedProgrammes.length === 0) {
      showNotification("Veuillez sélectionner au moins une matière.", "error");
      return;
    }

    try {
      await apiService.createExercice({ 
        nom, 
        description, 
        programmes: selectedProgrammes // On envoie le tableau d'IDs à Laravel
      });
      
      // On vide le formulaire
      setNom(""); 
      setDescription("");
      setSelectedProgrammes([]); 
      
      await loadData(); 
      showNotification("Exercice publié avec succès !"); 
    } catch (err) {
      console.error("Erreur lors de l'ajout :", err);
      showNotification("Erreur lors de la publication.", "error");
    }
  };

  const handleDelete = async (id: number) => {
    if(window.confirm("Êtes-vous sûr de vouloir supprimer cet exercice ?")) {
        try {
            await apiService.deleteExercice(id);
            await loadData();
            showNotification("Exercice supprimé !");
        } catch (err) {
            showNotification("Erreur lors de la suppression.", "error");
        }
    }
  };

  return (
    <div className="fixed inset-0 z-10 bg-gray-50 overflow-y-auto w-full h-full text-left">
      
      {/* Notif succès de création exos) */}
      {notification && (
        <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-xl z-50 text-white font-bold transition-all animate-bounce ${
          notification.type === 'success' ? 'bg-green-500 shadow-green-200' : 'bg-red-500 shadow-red-200'
        }`}>
          {notification.text}
        </div>
      )}

      {/* 1. Navbar */}
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

      {/* 2. Page principale */}
      <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">

        {/*  Formulaire (Si prof uniquement) */}
        {user.role === 'prof' && (
          <div className="w-full md:w-1/3">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 sticky top-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="text-blue-600 text-2xl">+</span> Créer un exercice
              </h2>
              
              <form onSubmit={handleAddExercice} className="flex flex-col gap-4">
                
                {/* Case à cocher pour les 4 programmes */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Matières (Plusieurs choix possibles)</label>
                  <div className="flex flex-wrap gap-3">
                    {programmes.map(prog => (
                      <label key={prog.id} className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          checked={selectedProgrammes.includes(prog.id)}
                          onChange={() => toggleProgramme(prog.id)}
                        />
                        <span className="text-sm font-medium text-gray-700">{prog.nom}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Titre de l'exercice</label>
                  <input 
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition" 
                    placeholder="Ex: Pompes, Squats, etc." 
                    value={nom} 
                    onChange={e => setNom(e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Consignes / Description</label>
                  <textarea 
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition min-h-[140px] resize-y" 
                    placeholder="Détaillez l'exercice' à faire..." 
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

        {/* Liste des exercices */}
        <div className={`w-full ${user.role === 'prof' ? 'md:w-2/3' : 'max-w-4xl mx-auto'}`}>
          
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Tableau des exercices</h2>
            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
              {exercices.length} exo{exercices.length > 1 ? 's' : ''}
            </span>
          </div>

          {exercices.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border-2 border-dashed border-gray-300 text-center flex flex-col items-center justify-center text-gray-500">
              <span className="text-4xl mb-3">📚</span>
              <p className="text-lg font-bold text-gray-700">Aucun exercice disponible.</p>
              {user.role === 'prof' && <p className="text-sm mt-1">Commencez par en créer un via le formulaire à gauche.</p>}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5">
              {exercices.map((ex) => (
                <div key={ex.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between gap-6 hover:shadow-md transition">
                  <div className="flex-1">
                    
                    {/* Affichage des badges dynamiques */}
                    <div className="mb-3 flex flex-wrap gap-2">
                      {ex.programmes && ex.programmes.length > 0 ? (
                        ex.programmes.map((p: any) => (
                          <span key={p.id} className="inline-block bg-indigo-100 text-indigo-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider border border-indigo-200">
                            {p.nom}
                          </span>
                        ))
                      ) : (
                        <span className="inline-block bg-gray-100 text-gray-600 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider border border-gray-200">
                          Non classé
                        </span>
                      )}
                    </div>

                    <h3 className="font-extrabold text-xl text-blue-900 mb-2">{ex.nom}</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{ex.description}</p>
                  </div>
                  
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
