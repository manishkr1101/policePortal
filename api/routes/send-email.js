var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ncra.cop@gmail.com",
    pass: "Sih@2020"
  }
});

var mailOptions = {
  from: "ncra.cop@gmail.com",
  to: "intelligentharsh007@gmail.com",
  subject: "Testing",
  text: ` I sent you mail from node js`
};

transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
