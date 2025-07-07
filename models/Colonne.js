const db = require('../config/database');

class Colonne {
  static async getAll() {
    try {
      const sql = `SELECT c.id AS colonneId, c.titre AS colonneTitre, c.couleur, 
                   ca.id AS carteId, ca.titre AS carteTitre, ca.tag, ca.date
                   FROM colonnes c LEFT JOIN cartes ca ON c.id = ca.colonne_id`;
      const results = await db.query(sql);
      
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
      return Object.values(colonnes);
    } catch (error) {
      throw error;
    }
  }

  static async create(titre, couleur) {
    try {
      const sql = 'INSERT INTO colonnes (titre, couleur) VALUES (?, ?)';
      const result = await db.query(sql, [titre, couleur]);
      return { id: result.insertId.toString(), titre, couleur, cartes: [] };
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      // Supprimer d'abord les cartes de la colonne, puis la colonne
      await db.query('DELETE FROM cartes WHERE colonne_id = ?', [id]);
      await db.query('DELETE FROM colonnes WHERE id = ?', [id]);
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Colonne; 