const express = require("express");
const router = express.Router();
const passport = require("passport");
const checkAuth = require("../../middleware/checkAuth");

const criminalRoute = require("./criminals");
const firRoute = require("./fir");
const complaintRoute = require("./complaint");
const missingpersonRoute = require("./missing-person");
const lostvehicleRoute = require("./lost-vehicle");

router.use("/criminal", criminalRoute);
router.use("/fir", firRoute);
router.use("/complaint", complaintRoute);
router.use("/missing-person", missingpersonRoute);
router.use("/lost-vehicle", lostvehicleRoute);

router.get("/test", (req, res) => {
  console.log(req.ip, req.connection.remoteAddress);
});

module.exports = router;
