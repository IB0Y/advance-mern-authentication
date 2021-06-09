const nodemailer = require('nodemailer');

const sendEmail = (options) => {
  const transaporter = nodemailer.createTransport({
    service: process.env.EMSIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text
  };

  transaporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};


module.exports = sendEmail;
