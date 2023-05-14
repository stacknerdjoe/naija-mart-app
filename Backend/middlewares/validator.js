const {check, validationResult } = require ('express-validator');

exports.userValidator = [
    check('name').trim().not().isEmpty().withMessage('No name found!'),
    check('email').normalizeEmail().isEmail().withMessage('Invalid email address!'),
    check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('No password found!')
    .isLength({min: 6, max: 18})
    .withMessage('Password must have at least 6 characters!'),
];

exports.validatePassword = [ check('newPassword')
.trim()
.not()
.isEmpty()
.withMessage('No password found!')
.isLength({min: 6, max: 18})
.withMessage('Password must have at least 6 characters!')];

exports.signInValidator  = [
    check('email').normalizeEmail().isEmail().withMessage('Invalid email address!'),
    check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('No password found!'),
];

exports.actorInfoValidator = [
    check('name').trim().not().isEmpty().withMessage('Actor name is missing!'),
    check('about')
      .trim()
      .not()
      .isEmpty()
      .withMessage('About is a required field!'),
    check('gender')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Gender is a required field!'),
  ];

exports.validate = (req, res, next) => {
    const error = validationResult(req).array();
    if(error.length){
        return res.json({error: error[0].msg})
    }

    next();
};