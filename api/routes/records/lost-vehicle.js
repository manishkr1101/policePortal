const express = require("express");
const router = express.Router();
const passport = require("passport");
const checkAuth = require("../../middleware/checkAuth");

router.get("/", (req, res) => {
  res.render("records/lost-vehicle", {
    title: "Lost vehicle",
    user: getUser(req),
    css: "lost-vehicle"
  });
});

router.get("/:vehicleNo", (req, res) => {
  res.render("records/vehicleDetails", {
    title: "Vehicle-details",
    user: getUser(req),
    css: "vehicleDetails"
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
