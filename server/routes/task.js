const express = require('express');
const { generateTask, getLast5Tasks } = require('../controllers/taskController');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.post('/generate', authenticate, generateTask);
router.get('/last5', authenticate, getLast5Tasks);

module.exports = router;