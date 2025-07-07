-- Création de la base de données
CREATE DATABASE IF NOT EXISTS kanban_db;
USE kanban_db;

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

-- Insertion de données de test
INSERT INTO colonnes (titre, couleur) VALUES 
('À faire', 'bg-gray-100 text-gray-700'),
('En cours', 'bg-blue-100 text-blue-700'),
('Terminé', 'bg-green-100 text-green-700');

-- Insertion de cartes de test
INSERT INTO cartes (colonne_id, titre, tag, date) VALUES 
(1, 'Créer la maquette', 'Design', '2024-01-15'),
(1, 'Configurer la base de données', 'Backend', '2024-01-16'),
(2, 'Développer l\'API REST', 'Backend', '2024-01-17'),
(2, 'Créer les composants React', 'Frontend', '2024-01-18'),
(3, 'Tests unitaires', 'Testing', '2024-01-19'); 