const express = require("express");
const router = express.Router();
const passport = require("passport");
const checkAuth = require("../../middleware/checkAuth");

const criminalRoute = require('./criminals')

router.use('/criminal', criminalRoute)

router.get("/fir", (req, res) => {
    
  res.render("records/fir", {
    title: "Report Fir",
    user: getUser(req),
    css: 'fir'
  });
});





router.get("/lost-vehicle", (req, res) => {
  res.render("records/lost-vehicle", {
    title: "Report Lost Vehicle"
  });
});

router.get("/complaint", (req, res) => {
  res.render("records/complaint", {
    title: "Complaint",
    user: getUser(req)
  });
});




router.post("/test", (req, res) => {
  const d = req.body.date;
  const date = new Date(d)
  res.send(date)
});




module.exports = router;
