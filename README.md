# Backend Kanban avec Express et MySQL

Un backend REST API pour un système Kanban avec persistance MySQL et architecture modulaire.

## Structure du projet

```
nodejs/
├── config/
│   └── database.js      # Configuration MySQL et création automatique
├── controllers/
│   └── kanbanController.js  # Logique métier
├── models/
│   ├── Colonne.js       # Modèle des colonnes
│   └── Carte.js         # Modèle des cartes
├── routes/
│   ├── index.js         # Routes principales
│   └── kanban.js        # Routes Kanban
├── services/            # Services métier (futur)
├── app.js              # Point d'entrée principal
└── package.json
```

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Configurer MySQL :
   - Modifier les paramètres de connexion dans `config/database.js` si nécessaire
   - La base de données et les tables sont créées automatiquement au démarrage

3. Lancer le serveur :
```bash
node app.js
# ou avec nodemon
npx nodemon app.js
```

## Fonctionnalités automatiques

- ✅ **Création automatique de la base de données** `kanban_db`
- ✅ **Création automatique des tables** `colonnes` et `cartes`
- ✅ **Insertion automatique des données de test**
- ✅ **Gestion des erreurs de connexion**

## API Endpoints

- `GET /kanban` - Récupérer toutes les colonnes et cartes
- `POST /kanban/columns` - Créer une nouvelle colonne
- `DELETE /kanban/columns/:id` - Supprimer une colonne
- `POST /kanban/cards` - Créer une nouvelle carte
- `DELETE /kanban/cards/:id` - Supprimer une carte

## Architecture

- **Models** : Gestion des données et requêtes SQL
- **Controllers** : Logique métier et gestion des requêtes HTTP
- **Routes** : Définition des endpoints API
- **Config** : Configuration de la base de données avec initialisation automatique
- **Services** : Services métier (pour extensions futures)
