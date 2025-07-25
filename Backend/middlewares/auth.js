const jwt = require('jsonwebtoken');
const { sendError } = require('../utilities/helper');
const User = require('../models/user');

exports.isAuth = async (req, res, next) => {
  const token = req.headers?.authorization;

  if(!token)return sendError(res, 'Invalid token!');

  const jwtToken = token.split('Bearer ')[1];

  if (!jwtToken) return sendError(res, 'Invalid token!');
  const decode = jwt.verify(jwtToken, 'kjfsjgfkJYTDUKILOIKLYDRTSDKIUOKfdz' );
  const { userId } = decode;

  const user = await User.findById(userId);
  if (!user) return sendError(res, 'unauthorized access!');

  req.user = user;

  next();
};

exports.isAdmin = (req, res, next) => {

  const { user } = req;
  if (user.role !== 'admin') return sendError(res, 'unauthorized access!');

    next();

};
