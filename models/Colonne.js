const db = require('../config/database');

class Colonne {
  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT c.id AS colonneId, c.titre AS colonneTitre, c.couleur, 
                   ca.id AS carteId, ca.titre AS carteTitre, ca.tag, ca.date
                   FROM colonnes c LEFT JOIN cartes ca ON c.id = ca.colonne_id`;
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        
        // Regrouper les résultats par colonne
        const colonnes = {};
        results.forEach(row => {
          if (!colonnes[row.colonneId]) {
            colonnes[row.colonneId] = {
              id: row.colonneId,
              titre: row.colonneTitre,
              couleur: row.couleur,
              cartes: []
            };
          }
          if (row.carteId) {
            colonnes[row.colonneId].cartes.push({
              id: row.carteId,
              titre: row.carteTitre,
              tag: row.tag,
              date: row.date
            });
          }
        });
        resolve(Object.values(colonnes));
      });
    });
  }

  static create(titre, couleur) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO colonnes (titre, couleur) VALUES (?, ?)';
      db.query(sql, [titre, couleur], (err, result) => {
        if (err) return reject(err);
        resolve({ id: result.insertId.toString(), titre, couleur, cartes: [] });
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      // Supprimer d'abord les cartes de la colonne, puis la colonne
      db.query('DELETE FROM cartes WHERE colonne_id = ?', [id], (err) => {
        if (err) return reject(err);
        db.query('DELETE FROM colonnes WHERE id = ?', [id], (err2) => {
          if (err2) return reject(err2);
          resolve({ success: true });
        });
      });
    });
  }
}

module.exports = Colonne; 