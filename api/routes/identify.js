const express = require('express')
const router = express.Router();
// const User = require('../models/user');
// const passport = require('passport')
const formidable = require('formidable')
const face = require('../middleware/face')
const checkAuth = require('../middleware/checkAuth')

router.use(checkAuth);

router.get('/', (req, res) => {
    res.render('identify')
})

router.post('/', (req, res) => {

    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
       
        
        
        face.detectFace(files.image.path)
        .then(faceIds => {
            return face.identifyFace(faceIds);
        })
        .then(doc => {
            res.send(doc)
        })
        .catch(err => console.log(err))
        // identifyFace()
        
    })

    
    

    
    
    

})

module.exports = router;