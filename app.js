try {
  require("dotenv").config();
} catch (error) {
  console.log(error)
}
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const ejs = require("ejs");
const mongoose = require("mongoose");
const passport = require("passport");
const firebase = require("firebase/app");
const db = require("./api/middleware/db");
const checkAuth = require("./api/middleware/checkAuth");
const storage = require("./api/middleware/storage");

const session = require("express-session");

app.use(express.static("public"));
app.use(function(req, res, next) {
  process.stdout.write("ip " + req.ip);
  next();
});
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

function getTime(hr, min) {
  return (hr * 60 + min) * 60 * 1000;
}

app.use(
  session({
    secret: "my name is manish",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: getTime(0, 30)
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());
const User = require("./api/models/user");
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

mongoose.connect(
  `mongodb+srv://manish:${process.env.MONGO_ATLAS_PASSWORD}@cluster0-rp3y8.mongodb.net/policeDB`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  }
)
.catch(err => {
  console.log(err)
});

const loginRoutes = require("./api/routes/login");
const signupRoutes = require("./api/routes/signup");
const changePswdRoutes = require("./api/routes/changepswd");
const resetRoutes = require("./api/routes/reset");
const identifyRoutes = require("./api/routes/identify");
const createRoutes = require("./api/routes/createperson");
const uploadRoutes = require("./api/routes/upload");
const formsRoutes = require("./api/routes/forms");
const recordsRoutes = require("./api/routes/records/records");
const registerRoutes = require("./api/routes/police/register");
const placesRoutes = require("./api/routes/places/places");
const nocRoutes = require("./api/routes/nature-of-complaint");
const otpRoutes = require("./api/routes/send-otp");

app.use("/login", loginRoutes);
app.use("/signup", signupRoutes);
app.use("/change", changePswdRoutes);
app.use("/reset", resetRoutes);
app.use("/identify", identifyRoutes);
app.use("/create", createRoutes);
app.use("/upload", uploadRoutes);
app.use("/form", formsRoutes);
app.use("/", recordsRoutes);
app.use("/register", registerRoutes);
app.use("/places", placesRoutes);
app.use("/nature-of-complaint", nocRoutes);
app.use("/sendotp", otpRoutes);

app.get("/", checkAuth, async (req, res) => {
  const options = {
    title: "Home",
    css: "styles",
    ps: req.user,
    polices: await getPolices(req.user.psid)
  };
  res.render("index", options);
});

async function getPolices(psid){
  if(typeof psid == 'undefined' || psid == null){
    return {}
  }
  const obj = (await db.ref('police-station/'+psid).once('value')).val()
  let newObj = {
    sp: obj.sp,
    dsp: obj.dsp,
    ins: obj.ins
  }
  console.log(newObj)
  let result = {}
  for(let i in newObj){
     let temp = await (await db.ref(`police/${newObj[i]}`).once('value')).val()
    //  console.log(temp)
     result[i] = {}
     result[i]['name'] = temp.name
     result[i]['url'] = await storage.getSignedUrl(temp.image.url)

  }
  return result
}

app.get("/logout", checkAuth, (req, res) => {
  req.logOut();
  res.redirect("/login");
});

app.get("/data", (req, res) => {
  // let obj = {
  //   BR26001: 'Pir Bahaur',
  //   BR26002: 'Beur',
  //   BR26003: 'Kotwali',
  //   BR26004: 'Kankarbagh',
  //   BR26005: 'Rajiv Nagar'
  // }
  // db.ref('/places/states/Bihar').update({
  //   Patna: obj
  // })
  // db.ref()
  //   .once("value")
  //   .then(data => {
  //     res.json(data);
  //   });
  // let state = 'Andhra Pradesh,Arunachal Pradesh,Assam,Bihar,Chhattisgarh,Goa,Gujarat,Haryana,Himachal Pradesh,Jammu and Kashmir,Jharkhand,Karnataka,Kerala,Madhya Pradesh,Maharashtra,Manipur,Meghalaya,Mizoram,Nagaland,Odisha,Punjab,Rajasthan,Sikkim,Tamil Nadu,Telangana,Tripura,Uttar Pradesh,Uttarakhand,West Bengal,Andaman and Nicobar,Chandigarh,Dadra and Nagar Haveli,Daman and Diu,Lakshadweep,Delhi,Puducherry';
  // let states = state.split(',');
  // let stateObj = {}
  // for(let s of states){
  //   stateObj[s] = 0
  // }
  // let dist = 'Araria,Madhepura,Arwal,Madhubani,Aurangabad,Monghyr,Banka,Muzaffarpur,Begusarai,Nalanda,Bhagalpur,Nawada,Bhojpur,Patna,Buxar,Purnea,Darbhanga,Rohtas,East Champaran,Saharsa,Gaya,Samastipur,Gopalganj,Saran,Jamui,Shiekhpura,Jehanabad,Sheohar,Kaimur,Sitamarhi,Katihar,Siwan,Khagaria,Supaul,Kishanganj,Vaishali,Lakhisarai,West Champaran';
  // let dist = 'Agra,Aligarh,PrayagRaj,Ambedkar Nagar,Amroha,Auraiya,Azamgarh,Badaun,Bahraich,Ballia,Balrampur,Banda District,Barabanki,Bareilly,Basti,Bijnor,Bulandshahr,Chandauli(Varanasi Dehat),Chitrakoot,Deoria,Etah,Etawah,Faizabad,Farrukhabad,Fatehpur,Firozabad,Gautam Buddha Nagar,Ghaziabad,Ghazipur,Gonda,Gorakhpur,Hamirpur,Hapur District,Hardoi,Hathras,Jaunpur District,Jhansi,Kannauj,Kanpur Dehat,Kanpur Nagar,Kasganj,Kaushambi,Kushinagar,Lakhimpur Kheri,Lalitpur,Lucknow,Maharajganj,Mahoba,Mainpuri,Mathura,Mau,Meerut,Mirzapur,Moradabad,Muzaffarnagar,Pilibhit,Pratapgarh,Rae Bareli,Rampur,Saharanpur,Sant Kabir Nagar,Sant Ravidas Nagar,Sambhal,Shahjahanpur,Shamli,Shravasti,Siddharthnagar,Sitapur,Sonbhadra,Sultanpur,Unnao,Varanasi (Kashi),Allahabad,Amethi,Bagpat'
  // let dists = dist.split(',')
  // let distsObj = {}
  // for(let d of dists){
  //   distsObj[d] = 0
  // }
  // db.ref('/places/states').update({
  //   'Uttar Pradesh': distsObj
  // })
});

app.get('/env', (req, res) => {
  res.json(process.env)
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`server is running at localhost:${process.env.PORT | 3000}`);
});
