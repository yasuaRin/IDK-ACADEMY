const express = require('express');
const router = express.Router();
const scoreCtrl = require('../controllers/scoreController');
const auth = require('../middleware/auth');

// Semua route skor harus pakai auth
router.post('/', auth, scoreCtrl.createScore);
router.get('/', auth, scoreCtrl.getScores);
router.put('/:id', auth, scoreCtrl.updateScore);
router.delete('/:id', auth, scoreCtrl.deleteScore);
router.put('/:id', auth, scoreCtrl.updateScore);

module.exports = router;
