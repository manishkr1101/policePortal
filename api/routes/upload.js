const express = require('express')
const router = express.Router();
// const User = require('../models/user');
// const passport = require('passport')
const formidable = require('formidable')
// const face = require('../middleware/face')
const checkAuth = require('../middleware/checkAuth')
const googleStorage = require('@google-cloud/storage');
const fs = require('fs')
console.log(__dirname+'/api-key.json')
const storage = new googleStorage.Storage({
    projectId: "hackathon-2a76f",
    keyFilename: "api-key-file.json"
})

const bucket = storage.bucket('gs://hackathon-2a76f.appspot.com')

// router.use(checkAuth);

router.get('/', (req, res) => {
    res.render('upload')
})

router.post('/', (req, res) => {

    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {

        console.log(files)
       
        // const file = fs.createReadStream(files.image.path)
        // const sref = storage.ref('first.jpeg').put(file).then(snapshot => {
        //     console.log(snapshot)
        // })
        // .catch(err => res.send(err))
        
        
        
    })

    
    

    
    
    

})

module.exports = router;