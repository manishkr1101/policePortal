const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const checkAuth = require("../middleware/checkAuth");

let otps = {}

router.get("/fir", (req, res) => {
  req.body.otp = otps[req.body.phone]
  res.render("forms/fir", {
    title: "Report Fir"
  });
});

router.post("/fir", (req, res) => {
  console.log(req.body)
  const date = new Date(req.body.dob)
  res.send(req.body)
});

router.get("/missing-person", (req, res) => {
  res.render("forms/missing-person", {
    title: "Report Missing Person"
  });
});

router.get("/lost-vehicle", (req, res) => {
  res.render("forms/lost-vehicle", {
    title: "Report Lost Vehicle"
  });
});

router.get("/complaint", (req, res) => {
  res.render("forms/complaint", {
    title: "Report Complain"
  });
});




router.post("/sendotp", (req, res) => {
   let phone = req.body.phone
   otps[phone] = Math.round((Math.random()*10000))
   console.log(otps)
   res.status(200).json({
     message: 'success'
   })
});
module.exports = router;
