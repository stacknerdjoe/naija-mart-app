const express = require ('express');
const { createActor } = require('../controller/actor');
const router = express.Router();

router.post('/create', createActor)

module.exports = router; 