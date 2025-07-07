const Colonne = require('../models/Colonne');
const Carte = require('../models/Carte');

class KanbanController {
  // GET /kanban : retourne toutes les colonnes et cartes
  static async getAllKanban(req, res) {
    try {
      const kanban = await Colonne.getAll();
      res.json(kanban);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération du kanban' });
    }
  }

  // POST /kanban/columns : ajoute une colonne
  static async createColumn(req, res) {
    try {
      const { titre, couleur } = req.body;
      if (!titre || !couleur) {
        return res.status(400).json({ error: 'Titre et couleur requis' });
      }
      const newColumn = await Colonne.create(titre, couleur);
      res.json(newColumn);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de la colonne' });
    }
  }

  // DELETE /kanban/columns/:id : supprime une colonne
  static async deleteColumn(req, res) {
    try {
      const { id } = req.params;
      await Colonne.delete(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la suppression de la colonne' });
    }
  }

  // POST /kanban/cards : ajoute une carte à une colonne
  static async createCard(req, res) {
    try {
      const { colonneId, titre, tag, date } = req.body;
      if (!colonneId || !titre) {
        return res.status(400).json({ error: 'ColonneId et titre requis' });
      }
      const newCard = await Carte.create(colonneId, titre, tag, date);
      res.json(newCard);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de la carte' });
    }
  }

  // DELETE /kanban/cards/:id : supprime une carte
  static async deleteCard(req, res) {
    try {
      const { id } = req.params;
      await Carte.delete(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la suppression de la carte' });
    }
  }
}

module.exports = KanbanController; 