const db = require('../config/database');

class Carte {
  static async create(colonneId, titre, tag, date) {
    try {
      const sql = 'INSERT INTO cartes (colonne_id, titre, tag, date) VALUES (?, ?, ?, ?)';
      const result = await db.query(sql, [colonneId, titre, tag, date]);
      return { id: result.insertId.toString(), titre, tag, date };
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      await db.query('DELETE FROM cartes WHERE id = ?', [id]);
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Carte; 