const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const checkAuth = require("../middleware/checkAuth");



router.get("/fir", (req, res) => {
    
  res.render("records/fir", {
    title: "Report Fir",
    user: getUser(req)
  });
});



router.get("/criminal", (req, res) => {
  res.render("records/criminal", {
    title: "Criminals Records",
    user: getUser(req)
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

function getUser(req){
    return {
        name: (req.user && req.user.name) || 'Manish',
        email: `${(req.user && req.user.username) || 'manishkr7424'}@gmail.com`,
        imgUrl: (req.user && req.user.imgUrl) || '/images/logo.png'
    }
}



module.exports = router;
