const express = require('express');
const router = express.Router();
const { handleUserSignUp } = require('../controllers/user.js');

router.post('/', handleUserSignUp);

module.exports = router;