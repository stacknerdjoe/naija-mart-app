const express = require ('express');
const { createActor } = require('../controller/actor');
const router = express.Router();

router.post('/create', uploadImage.single("avatar"), createActor)

module.exports = router; 