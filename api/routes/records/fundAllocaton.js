const express = require("express");
const router = express.Router();
const passport = require("passport");
const checkAuth = require("../../middleware/checkAuth");

router.get("/", (req, res) => {
  res.render("records/fundAllocation", {
    title: "Fund Requests",
    user: getUser(req),
    css: "fundAllocation"
  });
});

router.get("/:requestId", (req, res) => {
  res.render("records/fundRequest", {
    title: "Request ",
    user: getUser(req),
    css: "fundRequest"
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
