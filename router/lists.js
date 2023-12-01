const express = require('express');
const router = express.Router();
const controller = require('../app/controller')

router.get('/api/lists', controller.lists.get)
router.get('/api/lists/:listId', controller.lists.getById)
router.post('/api/lists', controller.lists.create)
router.put('/api/lists/:listId', controller.lists.update)
router.delete('/api/lists/:listId', controller.lists.destroy)

module.exports = router;