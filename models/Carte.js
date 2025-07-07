const db = require('../config/database');

class Carte {
  static create(colonneId, titre, tag, date) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO cartes (colonne_id, titre, tag, date) VALUES (?, ?, ?, ?)';
      db.query(sql, [colonneId, titre, tag, date], (err, result) => {
        if (err) return reject(err);
        resolve({ id: result.insertId.toString(), titre, tag, date });
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM cartes WHERE id = ?', [id], (err) => {
        if (err) return reject(err);
        resolve({ success: true });
      });
    });
  }
}

module.exports = Carte; 