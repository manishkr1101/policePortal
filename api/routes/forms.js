const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const checkAuth = require("../middleware/checkAuth");
const otpSender = require("../middleware/otp-sender");
const formidabel = require("formidable");
const storage = require("../middleware/storage");
const db = require("../middleware/db");
const face = require("../middleware/face");

let otps = {};

router.get("/fir", checkAuth, (req, res) => {
  res.render("forms/fir", {
    title: "Report Fir"
  });
});

router.post("/fir", checkAuth, (req, res) => {
  const form = new formidabel.IncomingForm();
  let fir;
  form.parse(req, (err, fields, files) => {
    let otp = fields.otp;
    const date = new Date().getTime();

    if (otpSender.verifyOTP("91" + fields.phone, otp)) {
      fir = {
        complainant: {
          name: fields.name || "0",
          email: fields.email || "0",
          dob: new Date(fields.dob).getTime(),
          phone: fields.phone || "0",
          sex: fields.sex || "0",
          address: {
            city: fields.city || "0",
            state: fields.state || "0",
            district: fields.district || 0,
            ps: fields.ps || 0
          }
        },
        "nature-of-complaint": fields.natureOfComplaint || 0,
        "crime-sub-type": fields.crimeSubType || 0,
        "is-victim-present": Number(fields.typeOfVictim) || 0,
        "is-crime-scene": Number(fields.occurencePlaceKnown) || 0,
        content: fields.content || 0,
        date: date,
        "fir-no": date,
        status: "pending",
        accepted: 0
      };

      if (fields.isSameAddr == "on") {
        fir.complainant["perm-address"] = fir.complainant.address;
      } else {
        fir.complainant["perm-address"] = {
          city: fields.permCity || 0,
          state: fields.permState || 0,
          district: fields.permDistrict || 0,
          ps: fields.permPs || 0
        };
      }

      const file = files.signature;
      storage
        .uploadFile(
          file.path,
          `fir/${fir["fir-no"]}/sign.${file.type.split("/")[1]}`,
          file.type
        )
        .then(val => {
          fir.signature = {
            url: val.url,
            type: val.type
          };
          // console.log({fir:fir})
          return db.ref("/fir/" + fir["fir-no"]).set(fir);
        })
        .then(doc => {
          // console.log({doc:doc})
          let obj = {};
          obj[fir["fir-no"]] = 0;
          // console.log('obj',obj)
          // console.log(req.user.psid)
          const url = `/police-station/${req.user.psid}/fir`;
          // console.log('url', url)
          return db.ref(url).update(obj);
        })
        .then(() => res.redirect("/fir"))
        .catch(err => res.send({ err: err }));
    } else {
      res.send("can't verify OTP please fill again");
    }
  });
});

router.get("/criminal", (req, res) => {
  res.render("forms/criminal", {
    title: "Add Criminal"
  });
});

router.post("/criminal", (req, res) => {
  let form = new formidabel.IncomingForm(),
    fields = {},
    files = [];
  form
    .on("field", (field, value) => {
      // console.log(field, value);
      fields[field] = value;
    })
    .on("file", function(field, file) {
      // console.log(field, file);
      files.push(file);
    })
    .on("end", function() {
      // console.log(files)
      uploadData(fields, files);
      // res.send(fields)
    });
  form.parse(req);

  async function uploadData(fields, files) {
    let person = {
      name: fields.name || 0,
      dob: new Date(fields.dob).getTime() || 0,
      sex: fields.sex || 0,
      phone: fields.phone || 0,
      city: fields.city || 0,
      district: fields.district || 0,
      state: fields.state || 0,
      fathername: fields.fathername || 0,
      reward: fields.reward || 0,
      crimes: {}
    };
    let key = await getKey();

    person.crimes[key] = {
      type: fields.type || 0,
      desc: fields.desc || 0,
      "sub-type": fields["sub-type"] || 0
    };

    try {
      let personId = await face.createPerson(fields.name);
      console.log(personId);
      person.personId = personId;
      person.persistedFaceId = {};
      person.images = {};
      for (let file of files) {
        console.log("file", file);
        let persistedFaceId = await face.addFace(personId, file.path);
        console.log(persistedFaceId);
        key = await getKey();
        person.persistedFaceId[persistedFaceId] = key;

        let imgInfo = await storage.uploadFile(
          file.path,
          `criminals/${person.personId}/${file.name}`,
          file.type
        );
        console.log(imgInfo);

        person.images[key] = imgInfo;
      }
      face.train();
      await db.ref(`/criminals/${person.personId}`).set(person);
      res.send("Person Added Successfully");
    } catch (error) {
      res.send({ err: error });
    }
  }

  async function getKey() {
    return (await db.ref().push()).key;
  }
});

router.get("/missing-person", (req, res) => {
  res.render("forms/missing-person", {
    title: "Report Missing Person"
  });
});

router.get("/lost-vehicle", (req, res) => {
  res.render("forms/lost-vehicle", {
    title: "Report Lost Vehicle"
  });
});

router.get("/complaint", (req, res) => {
  res.render("forms/complaint", {
    title: "Report Complain"
  });
});

//complaint-post
// router.post("/complaint", checkAuth, (req, res) => {
//   const form1 = new formidabel.IncomingForm();
//   let comlaint;
// });
module.exports = router;
