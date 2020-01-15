const express = require("express");
const router = express.Router();
const criminals = require("../../middleware/criminals");
const formidable = require("formidable");
const storage = require('../../middleware/storage')

router.get("/", (req, res) => {

  doSomething();

  async function doSomething() {
    let doc = await criminals.getAllCriminals();

    let docs = []
    for (let criminal of doc) {
      let images = criminal.images
      let url;
      if (images) {
        url = images[Object.keys(images)[0]]['url']
        url = await storage.getSignedUrl(url)
      }
      docs.push({
        name: criminal.name,
        age: getAge(criminal.dob),
        sex: criminal.sex,
        district: criminal.district,
        state: criminal.state,
        url: url,
        personId: criminal.personId
      })
    }
    res.render("records/criminal", {
      title: "Criminals Records",
      user: getUser(req),
      css: "criminal",
      criminals: docs
    });
  }

  function getAge(date) {
    const now = (new Date()).getFullYear()
    return now - (new Date(date)).getFullYear()
  }
});

router.get("/:id", async (req, res) => {
  const personId = req.params.id
  const criminal = await criminals.getCriminalById(personId)
  if (criminal) {
    let imgUrls = []
    for(let key in criminal.images){
      let imgUrl = await storage.getSignedUrl(criminal.images[key].url)
      imgUrls.push(imgUrl)
    }

    criminal.images = imgUrls
    let crimes = []
    for(let key in criminal.crimes){
      crimes.push(criminal.crimes[key])
    }

    res.render("records/id", {
      title: "Criminal History",
      user: getUser(req),
      css: "id",
      criminal: criminal,
      crimes: crimes
    });
  }
  else {
    res.render('records/404', {
      title: 'Not Found',
      css: '404',
      user: getUser(req),
      errorMsg: 'Your criminal not found'
    })
  }



});

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
