const express = require('express');
const router = express.Router();
const KanbanController = require('../controllers/kanbanController');

// Routes Kanban
router.get('/', KanbanController.getAllKanban);
router.post('/columns', KanbanController.createColumn);
router.delete('/columns/:id', KanbanController.deleteColumn);
router.post('/cards', KanbanController.createCard);
router.delete('/cards/:id', KanbanController.deleteCard);

module.exports = router; 