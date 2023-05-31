const jwt = require('jsonwebtoken');
const User = require('../models/user');
const EmailVerificationToken = require('../models/emailVerificationTokens');
const PasswordResetToken = require('../models/passwordResetToken');

const { isValidObjectId } = require('mongoose');
const { generateRandomByte, sendError } = require('../utilities/helper');
const { generateOTP, generateMailTransporter } = require('../utilities/mail');

exports.create = async (req, res) => {
    const { name, email, password } = req.body;

    const oldUser = await User.findOne({ email });
    if (oldUser) return sendError( res, 'This email has already been used!' );

    const newUser = new User({ name, email, password });
    await newUser.save()

    //generate 6 digits otp
    let OTP = generateOTP();


    //store otp inside database
    const newEmailVerificationToken = new EmailVerificationToken({
        owner: newUser._id,
        token: OTP,
    });

    await newEmailVerificationToken.save();

    //send same otp to the user

    var transport = generateMailTransporter();

    transport.sendMail({
        from: 'verification@naijamart.com',
        to: newUser.email,
        subject: 'Email Verification',
        html: `
            <p> Your verification One Time Password </p>
            <h1> ${OTP}</h1>
        `,
    });


    res.status(201).json({
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        },
    });
};


exports.verifyEmail = async (req, res) => {
    const { userId, OTP } = req.body;

    if (!isValidObjectId(userId)) return sendError(res, 'Invalid user!');

    const user = await User.findById(userId);
    if (!user) return sendError(res, 'User not found!', 404);

    if (user.isVerified) return sendError(res, 'User is already verified!');

    const token = await EmailVerificationToken.findOne({ owner: userId });
    if (!token) return sendError(res, 'Token not found!');

    const isMatched = await token.compareToken(OTP);
    if (!isMatched) return sendError(res, 'Kindly input a valid OTP!' );

    user.isVerified = true;
    await user.save();

    await EmailVerificationToken.findByIdAndDelete(token._id);

    var transport = generateMailTransporter();

    transport.sendMail({
        from: 'verification@naijamart.com',
        to: user.email,
        subject: 'Welcome Email',
        html: '<h1>Welcome to Naijamart, Thank you for choosing us.</h1>',
    });

    const jwtToken = jwt.sign({ userId: user._id }, 'kjfsjgfkJYTDUKILOIKLYDRTSDKIUOKfdz' );
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: jwtToken,
        isVerified: user.isVerified,
        role: user.role,
      },
      message: 'Your email is verified.',
    });
  };

exports.resendEmailVerificationToken = async (req, res) => {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return sendError(res, 'User not found!');

    if (user.isVerified) return sendError(res, 'This email id is already verified!');

    const aleadyHasToken = await EmailVerificationToken.findOne({
        owner: userId
    });
    if (aleadyHasToken) return sendError(res, 'Can only request another token after an hour!');

    //generate 6 digits otp
    let OTP = generateOTP();


    //store otp inside database
    const newEmailVerificationToken = new EmailVerificationToken({
        owner: user._id,
        token: OTP,
    });

    await newEmailVerificationToken.save();

    //send same otp to the user

    var transport = generateMailTransporter();

    transport.sendMail({
        from: 'verification@naijamart.com',
        to: user.email,
        subject: 'Email Verification',
        html: `
             <p> Your verification One Time Password </p>
             <h1> ${OTP}</h1>
         `,
    });

    res.json({
        message: 'New OTP has sent to your registered email'
    });
};

exports.forgetPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) return sendError(res, 'Email is missing!');

    const user = await User.findOne({ email });
    if (!user) return sendError(res, "User not found!", 404);

    const aleadyHasToken = await PasswordResetToken.findOne({ owner: user._id })
    if (aleadyHasToken) return sendError(res, 'Can only request another token after an hour!');

    const token = await generateRandomByte();
    const newPasswordResetToken = await PasswordResetToken({ owner: user._id, token });
    await newPasswordResetToken.save();

    const resetPasswordUrl = `http://127.0.0.1:3000/reset-password?token=${token}&id=${user._id}`;

    const transport = generateMailTransporter();

    transport.sendMail({
        from: 'security@naijamart.com',
        to: user.email,
        subject: 'Reset Password Link',
        html: `
        <p> Click here to reset Password </p>
        <a href = '${resetPasswordUrl}'>Change Password </a>
    `,
    });

    res.json({
        message: 'Link has been sent to your email!'
    });

};

exports.sendResetPasswordTokenStatus = (req, res) => {
    res.json({ valid: true });
};

exports.resetPassword = async (req, res) => {
    const { newPassword, userId } = req.body;

    const user = await User.findById(userId)
    const matched = await user.comparePassword(newPassword)
    if (matched) return sendError(res, 'The new password must not be the same with old password!');

    user.password = newPassword
    await user.save();

    //Before password reset, remove password reset token from database
    await PasswordResetToken.findByIdAndDelete(req.resetToken._id)

    const transport = generateMailTransporter();

    transport.sendMail({
        from: 'security@naijamart.com',
        to: user.email,
        subject: 'Password Reset was Successful',
        html: `
        <h1> Your Password Reset was Successful  </h1>
        <p> You can now login with new password. </p>
    `,
    });

    res.json({ message: 'password reset successfully, you can now login with new password' })

};

//signing in User

exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
    if (!user) return sendError(res, 'email or password is invalid!');

    const matched = await user.comparePassword(password);
    if (!matched) return sendError(res, 'email or password is invalid!');

    const { _id, name, role, isVerified } = user;

    const jwtToken = jwt.sign({ userId: _id }, 'kjfsjgfkJYTDUKILOIKLYDRTSDKIUOKfdz');

    res.json({ 
        user: { id: _id, name, email, role, token: jwtToken, isVerified }, });
};