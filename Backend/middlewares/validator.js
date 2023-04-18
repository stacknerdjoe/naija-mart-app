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

exports.validate = (req, res, next) => {
    const error = validationResult(req).array();
    if(error.length){
        return res.json({error: error[0].msg})
    }

    next();
};