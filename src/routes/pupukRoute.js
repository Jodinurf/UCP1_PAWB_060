const express = require('express');
const router = express.Router();
const pupukController = require('../controllers/pupukController');

router.get('/get', pupukController.getPupuk);
router.post('/create', pupukController.create);
router.put('/:id', pupukController.update);
router.delete('/:id', pupukController.delete);

module.exports = router;