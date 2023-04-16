const nodemailer = require('nodemailer');
const User = require('../models/user');
const EmailVerificationToken = require('../models/emailVerificationTokens');
const { isValidObjectId } = require('mongoose');

exports.create = async (req, res) => {
    const {name, email, password} = req.body;

    const oldUser = await User.findOne({ email });
    if (oldUser) return res.status(401).json({ error: "This email has already been used!"});

    const newUser = new User({name, email, password});
    await newUser.save()

    //generate 6 digits otp
    let OTP = '';
    for(let i = 0; i <= 5; i++){
        const randomValue = Math.round(Math.random() * 9)
        OTP += randomValue;
    }


    //store otp inside database
    const newEmailVerificationToken = new EmailVerificationToken({
        owner: newUser._id,
        token: OTP,
    });

    await newEmailVerificationToken.save();

    //send same otp to the user

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "32c5f4d2a2445c",
          pass: "75c168cd11c251"
        }
      });

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
        message: 'Kindly verify your email address. OTP has been sent to your email account'});    
};


exports.verifyEmail = async(req, res) => {
    const {userId, OTP} = req.body;

    if(!isValidObjectId(userId)) return res.json({error: 'Invalid user!'});

    const user = await User.findById(userId);
    if(!user) return res.json({error: 'User not found!'});

    if(user.isVerified) return res.json({error: 'User is already verified!'});

    const token = await EmailVerificationToken.findOne({owner: userId})
    if(!token) return res.json({error: 'Token not found!'});

    const isMatched = await token.compareToken(OTP)
    if(!isMatched) return res.json({error: 'Kindly input a valid OTP!'});

    user.isVerified = true;
    await user.save();

    await EmailVerificationToken.findByIdAndDelete(token._id);

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "32c5f4d2a2445c",
          pass: "75c168cd11c251"
        }
      });

    transport.sendMail({
        from: 'verification@naijamart.com',
        to: user.email,
        subject: 'Welcome Email',
        html: '<h1>Welcome to Naijamart, Thank you for choosing us.</h1>',
    }); 

    res.json({
        message: 'Your email is verified'
    });
};

exports.resendEmailVerificationToken = async(req, res) => {
    const {userId} = req.body;

    const user = await User.findById(userId);
    if(!user) return res.json({error: 'User not found'});

    if(user.isVerified) return res.json({error: 'This email is already verified'});

    const aleadyHasToken = await EmailVerificationToken.findOne({
        owner: userId
    });
    if(aleadyHasToken) return res.json({error: 'Can only request another token after an hour!'})

     //generate 6 digits otp
     let OTP = '';
     for(let i = 0; i <= 5; i++){
         const randomValue = Math.round(Math.random() * 9)
         OTP += randomValue;
     }
 
 
     //store otp inside database
     const newEmailVerificationToken = new EmailVerificationToken({
         owner: newUser._id,
         token: OTP,
     });
 
     await newEmailVerificationToken.save();
 
     //send same otp to the user
 
     var transport = nodemailer.createTransport({
         host: "sandbox.smtp.mailtrap.io",
         port: 2525,
         auth: {
           user: "32c5f4d2a2445c",
           pass: "75c168cd11c251"
         }
       });
 
     transport.sendMail({
         from: 'verification@naijamart.com',
         to: user.email,
         subject: 'Email Verification',
         html: `
             <p> Your verification One Time Password </p>
             <h1> ${OTP}</h1>
         `,
     });  
}

