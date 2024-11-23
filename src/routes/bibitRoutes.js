const express = require('express');
const router = express.Router();
const bibitController = require('../controllers/bibitController');

router.get('/get', bibitController.getBibit);
router.post('/create', bibitController.create);
router.put('/:id', bibitController.update);
router.delete('/:id', bibitController.delete);



module.exports = router;