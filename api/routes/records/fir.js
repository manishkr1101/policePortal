const express = require("express");
const router = express.Router();
const passport = require("passport");
const checkAuth = require("../../middleware/checkAuth");
const fir = require('../../middleware/fir')

router.get("/", (req, res) => {
  fir.getAllFirByPS('BR26003')
    .then(firs => {
      res.render("records/fir", {
        title: "FIR",
        user: getUser(req),
        css: "fir",
        firs: firs
      });
    })
    .catch(err => res.send(err))

});

router.get("/:firNumber", (req, res) => {
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
