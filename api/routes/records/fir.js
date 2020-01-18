const express = require("express");
const router = express.Router();
const passport = require("passport");
const checkAuth = require("../../middleware/checkAuth");
const firs = require("../../middleware/fir");
const date = require("../../middleware/date");
const storage = require("../../middleware/storage");
const db = require("../../middleware/db");

router.use(checkAuth);

router.get("/", (req, res) => {
  firs
    .getAllFirByPS(req.user.psid)
    .then(firs => {
      res.render("records/fir", {
        title: "FIR",
        user: getUser(req),
        css: "fir",
        firs: firs
      });
    })
    .catch(err => res.send(err));
});

router.get("/:firNumber", async (req, res) => {
  try {
    const fir = await firs.getFirById(req.params.firNumber);
    console.log(fir);
    fir.date = date.getDateAndTime(fir.date);
    fir.complainant["dob"] = date.getDate(fir.complainant["dob"]);
    fir.signature.url = await storage.getSignedUrl(fir.signature.url);
    res.render("records/fir-number", {
      title: "fir-content",
      user: getUser(req),
      css: "fir-number",
      fir: fir
    });
  } catch (error) {
    res.send(error);
  }
});

router.get("/:firNumber/accept", async (req, res) => {
  try {
    const firNo = req.params.firNumber;
    await firs.acceptFir(firNo);
    res.redirect("/fir");
  } catch (error) {
    res.send({ err: error });
  }
});

router.get("/:firNumber/reject", async (req, res) => {
  try {
    const firNo = req.params.firNumber;
    await firs.rejectFir(firNo);
    res.redirect("/fir");
  } catch (error) {
    res.send({ err: error });
  }
});

function getUser(req) {
  return {
    name: (req.user && req.user.name) || "Manish",
    email: `${(req.user && req.user.username) || "manishkr7424"}@gmail.com`,
    imgUrl: (req.user && req.user.imgUrl) || "/images/logo.png"
  };
}

module.exports = router;
