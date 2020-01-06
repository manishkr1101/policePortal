const express = require('express')
const router = express.Router();
const User = require('../models/user');
const passport = require('passport')
const formidable = require('formidable')
const fs = require('fs')
const request = require('request')

router.get('/', (req, res) => {
    res.render('identify')
})

router.post('/', (req, res) => {

    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        // console.log({
        //     err: err,
        //     fields: fields,
        //     files: files
        // })
        
        detectFace(files.image)
        .then(faceIds => {
            console.log('then block',faceIds)
            identifyFace(faceIds);
        })
        .catch(err => console.log(err))
        // identifyFace()
        
    })

    

    function detectFace(file){
        // console.log(file)
        const url = 'https://criminalfacerecognition.cognitiveservices.azure.com/face/v1.0/detect?recognitionModel=recognition_02';
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': process.env.FACE_DETECTION_API_KEY
            },
            body: fs.createReadStream(file.path)
        }
        return new Promise(function(resolve, reject){
            request.post(url, options, (err, response, body) => {
                if(err){
                    reject(err)
                }
                body = JSON.parse(body);
                const faceIds = body.map(key => key.faceId);
                console.log(faceIds)
                resolve(faceIds);
            })
        })
        
    }

    
    function identifyFace(faceIds){
        // console.log('in function',faceIds)
        const url = 'https://criminalfacerecognition.cognitiveservices.azure.com/face/v1.0/identify';
        const body = {
            "personGroupId": "ncrbfinal",
            "faceIds": faceIds.slice(0,10)
        }
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': process.env.FACE_DETECTION_API_KEY
            },
            body: JSON.stringify(body)
        }
        request.post(url, options,(err, response, body) => {
            res.send({
                err: err,
                body: JSON.parse(body)
            })
        })
    }
    

})

module.exports = router;