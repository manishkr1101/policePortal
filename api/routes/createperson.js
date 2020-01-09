const express = require('express')
const router = express.Router();
// const User = require('../models/user');
// const passport = require('passport')
const formidable = require('formidable')
const face = require('../middleware/face')
const checkAuth = require('../middleware/checkAuth')
const db = require('../middleware/db')
const storage = require('../middleware/storage')

router.use(checkAuth);

router.get('/', (req, res) => {
    res.render('createperson')
})

router.post('/', (req, res) => {

    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        
        let person = {}
        person.name = fields.name;
       
        face.createPerson(fields.name)
        .then(personId => {
            person.personId = personId
            return face.addFace(personId, files.image.path);
        })
        .then(persistedFaceId => {
            person.persistedFaceId = persistedFaceId;
            return face.train();
        })
        .then(response => {
            return storage.uploadFile(files.image.path, `criminals/${person.personId}/${files.image.name}`, files.image.type )
        })
        .then(imageInfo => {
            person.images = [imageInfo];
            return db.ref(`/criminals/${person.personId}`).set(person)
        })
        .then(doc => {
            res.send('Person Added Successfully')
        })
        .catch(err => res.send(err))
        
    })

    
    

    
    
    

})

module.exports = router;