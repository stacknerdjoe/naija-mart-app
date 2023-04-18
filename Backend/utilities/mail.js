const nodemailer = require('nodemailer');

exports.generateOTP = (otp_lenght = 6) => {
 let OTP = '';
 for(let i = 1; i <= otp_lenght; i++){
     const randomValue = Math.round(Math.random() * 9)
     OTP += randomValue;
 }

 return OTP;
};

exports.generateMailTransporter = () => 
    nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "32c5f4d2a2445c",
      pass: "75c168cd11c251"
    }
  });