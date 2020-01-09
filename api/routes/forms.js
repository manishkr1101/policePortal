const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const checkAuth = require("../middleware/checkAuth");

router.get("/fir", (req, res) => {
  res.render("forms/fir", {
    title: "Report Fir"
  });
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

router.post("/", (req, res) => {});
module.exports = router;
