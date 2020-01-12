const express = require("express");
const router = express.Router();
const passport = require("passport");
const checkAuth = require("../../middleware/checkAuth");

const criminalRoute = require("./criminals");
const firRoute = require("./fir");
const complaintRoute = require("./complaint");

router.use("/criminal", criminalRoute);
router.use("/fir", firRoute);
router.use("/complaint", complaintRoute);

router.get("/lost-vehicle", (req, res) => {
  res.render("records/lost-vehicle", {
    title: "Report Lost Vehicle"
  });
});

router.get("/test", (req, res) => {
  console.log(req.ip, req.connection.remoteAddress);
});

module.exports = router;
