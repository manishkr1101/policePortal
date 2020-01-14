const express = require("express");
const router = express.Router();
const criminals = require("../../middleware/criminals");
const formidable = require("formidable");

router.get("/", (req, res) => {
  criminals.getAllCriminals().then(doc => {
    res.render("records/criminal", {
      title: "Criminals Records",
      user: getUser(req),
      css: "criminal",
      criminals: doc
    });
  });
});

router.get("/criminals/id", (req, res) => {});

router.post("/search", (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    res.send({
      fie: fields
    });
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
