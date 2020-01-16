const fs = require('fs')
const request = require('request')

const API_KEY = process.env.FACE_DETECTION_API_KEY
const BASE_URL = 'https://criminalfacerecognition.cognitiveservices.azure.com/face/v1.0';
const PERSON_GROUP_ID = 'ncrbfinal'

let headers = {
    'Ocp-Apim-Subscription-Key': API_KEY
}

module.exports = {
    /**
     * @returns persistedFaceId
     * @param {String} personId Id of person while creating person
     * @param {String} filePath Path to the image of person to be added
     */
    addFace: function(personId, filePath){
        console.log('filepath',filePath)
        const url = `${BASE_URL}/persongroups/${PERSON_GROUP_ID}/persons/${personId}/persistedFaces?detectionModel=detection_02`;
        headers['Content-Type'] = 'application/octet-stream'
        const options = {
            method: 'post',
            headers: headers,
            body: fs.createReadStream(filePath)
        }

        return new Promise((resolve, reject) => {
            request.post(url, options, (err, response, body) => {
                if(err){
                    reject(err)
                }
                body = JSON.parse(body)
                resolve(body.persistedFaceId)
            })
        })
    },
    addFaces: async function(personId, filePaths){
        let persistedFaceIds = [];
        try {
            for(let filePath of filePaths){
                const t = await this.addFace(personId, filePath);
                persistedFaceIds.push(t)
            }
            return persistedFaceIds;
        } catch (error) {
            throw error;
        }
        
    },
    createPerson: function(name, userData){
        const url = `${BASE_URL}/persongroups/${PERSON_GROUP_ID}/persons`;
        headers['Content-Type'] = 'application/json';
        const body = {
            name: name,
            userData: userData
        }
        const options = {
            method: 'post',
            headers: headers,
            body: JSON.stringify(body)
        }

        return new Promise((resolve, reject) => {
            request.post(url, options, (err, response, body) => {
                if(err){
                    reject(err)
                }
                body = JSON.parse(body)
                resolve(body.personId)
            })
        })
    },
    detectFace: function(filePath){
        // console.log(file)
        const url = `${BASE_URL}/detect?recognitionModel=recognition_02`;
        headers['Content-Type'] = 'application/octet-stream';
        const options = {
            method: 'post',
            headers: headers,
            body: fs.createReadStream(filePath)
        }
        return new Promise(function(resolve, reject){
            request.post(url, options, (err, response, body) => {
                if(err){
                    reject(err)
                }
                body = JSON.parse(body);
                const faceIds = body.map(key => key.faceId);
                resolve(faceIds);
            })
        })
        
    },
    
    /**
     * @return confidence and personId to all given faceIds
     * @param {[string]} faceIds Array of faceId to search in all Face Records
     */
    identifyFace: function (faceIds){
        // console.log('in function',faceIds)
        const url = `${BASE_URL}/identify`;
        headers['Content-Type'] = 'application/json';

        const body = {
            "personGroupId": PERSON_GROUP_ID,
            "faceIds": faceIds,
            "maxNumOfCandidatesReturned": 25
        }
        const options = {
            method: 'post',
            headers: headers,
            body: JSON.stringify(body)
        }
        return new Promise((resolve, reject) => {
            request.post(url, options,(err, response, body) => {
                if(err){
                    reject(err)
                }
                resolve(JSON.parse(body))
            })
        })
        
    },
    parseResponse: function(res, confidence){
        let personIds = []
        for(let r of res){
            for(let cand of r.candidates){
                if(cand.confidence > confidence){
                    personIds.push(cand.personId)
                }
            }
        }
        return personIds;
    },
    train: function(){
        const url = `${BASE_URL}/persongroups/${PERSON_GROUP_ID}/train`;
        const options = {
            method: 'post',
            headers: headers
        }

        return new Promise((resolve, reject) => {
            request.post(url, options, (err, response, body) => {
                if(err){
                    reject(err)
                }
                resolve({
                    msg: 'Model trained successfuly'
                })
            })
        })
    }
}





