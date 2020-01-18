const request = require('request')

const BASE_URL = 'https://lit-ridge-96428.herokuapp.com'

module.exports = {
    encrypt: async function(firNo, content){

        return new Promise((resolve, reject)=>{
            request(`${BASE_URL}/encrypt`,{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firNo: firNo,
                    text: content
                })
            }, (err, response, body) => {
                if(err || response.statusCode == 400){
                    reject(err)
                }
                else{
                    console.log(body)
                    resolve(JSON.parse(body))
                }
            })
        })
        
    },
    decrypt: async function(firNo, encrypted){

        return new Promise((resolve, reject)=>{
            request(`${BASE_URL}/decrypt`,{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firNo: firNo,
                    text: encrypted
                })
            }, (err, response, body) => {
                if(err || response.statusCode == 400){
                    reject(err)
                }
                else{
                    console.log(body)
                    resolve(JSON.parse(body))
                }
            })
        })
        
    }
}