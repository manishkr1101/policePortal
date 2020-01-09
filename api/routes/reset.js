const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const mongoose = require("mongoose");
const mailer = require("../middleware/mailer");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  let token = req.query.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log(err);
        res.send("Invalid Url or link expired");
      } else {
        console.log("dec", decoded);
        res.render("resetform", {
          title: "reset",
          css: "reset",
          id: decoded.id
        });
      }
    });
  } else {
    res.render("reset", {
      title: "Reset Password",
      css: "reset"
    });
  }
});

router.post("/", (req, res) => {
  const username = req.body.username;

  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log({ error: err });
      res.send("Error! try again");
    } else {
      if (!user) {
        res.send("No Such User found");
      } else {
        let genearatedLink = "tcf.tech";
        let email = `${username}@gmail.com`;
        // console.log(user)

        const token = jwt.sign(
          {
            id: user._id
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: 10 * 60
          }
        );
        // console.log(token)
        genearatedLink = `${req.protocol}://${req.get(
          "host"
        )}/reset?token=${token}`;
        // console.log({
        //     pro: req.protocol,
        //     host: req.get('host'),
        //     path: req.originalUrl
        // })

        mailer
          .sendMail(
            email,
            "Changing Your Password",
            `You are recieving this message to reset your Password. To reset your password visit this link: <a href='${genearatedLink}'>${genearatedLink}</a>`,
            "html"
          )
          .then(info => {
            res.send("mail has been sent to " + email);
          })
          .catch(err => {
            console.log(err);
            res.send("Error Occured");
          });
      }
    }
  });
});

router.post("/:id", (req, res) => {
  const id = req.params.id;
  const password = req.body.password;
  console.log(password);

  User.findOne({ _id: id })
    .exec()
    .then(user => {
      user.setPassword(password, (err, response) => {
        if (err) {
          res.send("Error! try again in set password");
        } else {
          console.log(response);
          return user.save();
        }
      });
    })
    .then(user => {
      console.log("Password changed");
      res.redirect("/login");
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
