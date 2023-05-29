const express = require('express');
const { isAdmin, isAuth } = require('../middlewares/auth');
const { uploadVideo, uploadImage } = require('../middlewares/multer');
const { uploadTrailer, createMovie, updateMovieWithoutPoster, updateMovieWithPoster, removeMovie } = require('../controller/movie');
const { validate, validateMovie } = require('../middlewares/validator');
const { parseData } = require('../utilities/helper');

const router = express.Router();

router.post(
    '/upload-trailer', isAuth, isAdmin, uploadVideo.single('video'), uploadTrailer
);

router.post(
    '/create', isAuth, isAdmin, uploadVideo.single('video'), createMovie
);

router.patch(
    '/update-movie-without-poster/:movieId',
    isAuth, isAdmin,
    // parseData,
    validateMovie, validate, updateMovieWithoutPoster
  );
  router.patch(
    '/update-movie-with-poster/:movieId',
    isAuth, isAdmin, uploadImage.single('poster'), parseData, validateMovie, validate,  updateMovieWithPoster
  );
  router.delete('/:movieId', isAuth, isAdmin, removeMovie);


module.exports = router; 