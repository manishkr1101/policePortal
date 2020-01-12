const express = require("express");
const router = express.Router();
const criminals = require("../../middleware/criminals");

router.get("/", (req, res) => {
  res.render("records/complaint", {
    title: "Complaint",
    user: getUser(req),
    css: "complaint"
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
