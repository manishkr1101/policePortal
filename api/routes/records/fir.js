const express = require("express");
const router = express.Router();
const passport = require("passport");
const checkAuth = require("../../middleware/checkAuth");

router.get("/", (req, res) => {
  res.render("records/fir", {
    title: "Report Fir",
    user: getUser(req),
    css: "fir"
  });
});

router.get("/:fir-number", (req, res) => {
  res.render("records/fir-number", {
    title: "fir-content",
    user: getUser(req),
    css: "fir-number"
  });
});

function getUser(req) {
  return {
    name: (req.user && req.user.name) || "Manish",
    email: `${(req.user && req.user.username) || "manishkr7424"}@gmail.com`,
    imgUrl: (req.user && req.user.imgUrl) || "/images/logo.png"
  };
}

module.exports = router;
