const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dmszouolz',
    api_key: '187299652359591',
    api_secret: 'jhDNrveQGpZqsPsZAb_XXGgqQ1k',
    secure: true,
});

module.exports = cloudinary;
