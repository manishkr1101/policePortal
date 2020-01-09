var nodemailer = require("nodemailer");

const MAIL_FROM = "ncra.cop@gmail.com";
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MAIL_FROM,
    pass: process.env.EMAIL_PASSWORD
  }
});





module.exports = {
    sendMail: function(email, subject, body, type='text'){
      

      var mailOptions = {
        from: MAIL_FROM,
        to: email,
        subject: subject
      };
      mailOptions[type] = body;

      console.log({option: mailOptions})

      return transporter.sendMail(mailOptions);

    }
}