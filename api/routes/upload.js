const express = require('express')
const router = express.Router();
// const User = require('../models/user');
// const passport = require('passport')
const formidable = require('formidable')
// const face = require('../middleware/face')
const checkAuth = require('../middleware/checkAuth')
const googleStorage = require('@google-cloud/storage');
const fs = require('fs')
// console.log(__dirname+'../../api-key.json')
const storage = new googleStorage.Storage({
    projectId: "hackathon-2a76f",
    keyFilename: './api-key-file.json'
})

const bucket = storage.bucket('gs://hackathon-2a76f.appspot.com')
// console.log(bucket);

// router.use(checkAuth);

router.get('/', (req, res) => {

    // async function listFiles(){
    //     const [files] = await bucket.getFiles();
    //     res.send(files.map(file => file.name))
    // }
    // listFiles();
    let flag = true;
    if(flag){
        
        require('../middleware/storage').getSignedUrl("criminals/fb211935-880b-4fac-9d10-bdc1cb35ddad/WhatsApp Image 2020-01-07 at 11.34.41 PM.jpeg")
        .then(url => res.send(`<a href='${url}'> view </a>`))
        .catch(err => res.send(err))
    }
    else{
        res.render('upload')
    }
    
    

    

    
    // bucket.file('criminal/imageedit_4_6371337906.jpg')
    // .download({
    //     destination: 'public/images/imageedit_4_6371337906.jpg'
    // })
    // .then(doc => res.send(doc))
    // .catch(err => res.send(err))
})

router.post('/', (req, res) => {

    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {

        

        // const filename = files.image.name;
        const file = files.image;

        // console.log(files.image);
        const dest =   `criminal/${file.name}`
       

        require('../middleware/storage').uploadFile(file.path, dest, file.type)
        .then(doc => res.send(doc))
        .catch(err => res.send(err))
        
       
        
        
        
        
    })

    
    

    
    
    

})

module.exports = router;