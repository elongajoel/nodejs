const mysql = require('mysql2');

// Configuration initiale sans base de données
const initialConfig = {
  host: 'localhost',
  user: 'root', // à adapter selon votre config
  password: '', // à adapter selon votre config
};

// Configuration avec base de données
const dbConfig = {
  ...initialConfig,
  database: 'kanban_db'
};

let db;

// Fonction pour créer la base de données et les tables
async function initializeDatabase() {
  try {
    // Connexion initiale sans base de données
    const initialConnection = mysql.createConnection(initialConfig);
    
    // Créer la base de données si elle n'existe pas
    await new Promise((resolve, reject) => {
      initialConnection.query('CREATE DATABASE IF NOT EXISTS kanban_db', (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    
    console.log('Base de données kanban_db créée ou déjà existante');
    
    // Fermer la connexion initiale
    initialConnection.end();
    
    // Créer la connexion avec la base de données
    db = mysql.createConnection(dbConfig);
    
    // Créer les tables
    await createTables();
    
    console.log('Connecté à MySQL et tables créées');
    
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    process.exit(1);
  }
}

// Fonction pour créer les tables
async function createTables() {
  const createTablesSQL = `
    -- Table des colonnes
    CREATE TABLE IF NOT EXISTS colonnes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titre VARCHAR(255) NOT NULL,
        couleur VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    -- Table des cartes
    CREATE TABLE IF NOT EXISTS cartes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        colonne_id INT NOT NULL,
        titre VARCHAR(255) NOT NULL,
        tag VARCHAR(100),
        date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (colonne_id) REFERENCES colonnes(id) ON DELETE CASCADE
    );
  `;
  
  const insertDataSQL = `
    -- Insertion de données de test seulement si les tables sont vides
    INSERT IGNORE INTO colonnes (titre, couleur) VALUES 
    ('À faire', 'bg-gray-100 text-gray-700'),
    ('En cours', 'bg-blue-100 text-blue-700'),
    ('Terminé', 'bg-green-100 text-green-700');

    INSERT IGNORE INTO cartes (colonne_id, titre, tag, date) VALUES 
    (1, 'Créer la maquette', 'Design', '2024-01-15'),
    (1, 'Configurer la base de données', 'Backend', '2024-01-16'),
    (2, 'Développer l\'API REST', 'Backend', '2024-01-17'),
    (2, 'Créer les composants React', 'Frontend', '2024-01-18'),
    (3, 'Tests unitaires', 'Testing', '2024-01-19');
  `;
  
  return new Promise((resolve, reject) => {
    db.query(createTablesSQL, (err) => {
      if (err) {
        reject(err);
        return;
      }
      
      console.log('Tables créées avec succès');
      
      // Insérer les données de test
      db.query(insertDataSQL, (err2) => {
        if (err2) {
          console.warn('Erreur lors de l\'insertion des données de test:', err2);
        } else {
          console.log('Données de test insérées');
        }
        resolve();
      });
    });
  });
}

// Initialiser la base de données au démarrage
initializeDatabase();

module.exports = {
  getConnection: () => db,
  query: (sql, params) => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error('Base de données non initialisée'));
        return;
      }
      db.query(sql, params, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }
}; 