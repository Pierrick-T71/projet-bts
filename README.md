# Plateforme de Gestion Pédagogique (Exercices & Programmes)

Bienvenue sur le dépôt de mon projet de BTS SIO (Option SLAM). 
Il s'agit d'une application "Full-Stack" développée pour permettre aux enseignants de gérer des exercices et de les classer dans différents programmes d'entraînement.

## Architecture du Projet

Ce projet est séparé en deux parties distinctes :
1. **Backend (API RESTful) :** Développé en PHP avec le framework Laravel.
2. **Frontend (SPA) :** Développé en React et TypeScript avec Tailwind CSS.

---

## Guide de Démarrage

### 1. Préparer la Base de Données
Avant de lancer l'application, assurez-vous que votre serveur de base de données (MySQL via XAMPP, Laragon, etc.) est bien allumé et que votre base de données est configurée dans le fichier `.env` du projet Laravel.

### 2. Démarrer le Backend (Laravel)
Ouvrez un premier terminal, naviguez dans le dossier du backend et exécutez les commandes suivantes pour créer les tables de la base de données (migrations) et lancer le serveur :

```bash
# 1. Se placer dans le dossier backend
cd Back

# 2. Créer les tables et injecter les données de test
php artisan migrate:fresh --seed

# 3. Lancer le serveur de l'API
php artisan serve

```

### 3. Démarrer le Frontend (React)

```bash
# 1. Se placer dans le dossier frontend
cd Front

# 2. Lancer le serveur de développement
npm run dev

```

### 4. Test
Compte prof : prof@test.com
Comptes élève : eleve@test.com

Mot de passe : Azerty@123