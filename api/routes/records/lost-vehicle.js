const express = require("express");
const router = express.Router();
const passport = require("passport");
const checkAuth = require("../../middleware/checkAuth");
const lostVehicles = require("../../middleware/lost-vehicle");

router.get("/", (req, res) => {
  lostVehicles
    .getAllLostVehicles()
    .then(lostVehicles => {
      console.log(lostVehicles);
      res.render("records/lost-vehicle", {
        title: "Lost vehicle",
        user: getUser(req),
        css: "lost-vehicle",
        lostVehicles: lostVehicles
      });
    })
    .catch(err => res.send(err));
  // res.send("hi");
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
