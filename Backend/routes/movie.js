const express = require('express');
const { isAdmin, isAuth } = require('../middlewares/auth');
const { uploadVideo } = require('../middlewares/multer');
const { uploadTrailer } = require('../controller/movie');

const router = express.Router();

router.post(
    '/upload-trailer', isAuth, isAdmin, uploadVideo.single("video"), uploadTrailer
);


module.exports = router; 