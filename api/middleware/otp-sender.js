const request = require('request')
const querystring = require('querystring')
let otps = {}


module.exports = {
    /**
     * 
     * @param {Number} phone 
     * @param {String} msg 
     */
    sendOTP: function (phone, msg) {
        let otp = Math.round(Math.random() * 1000000)
        // console.log(otp)
        otps[phone] = msg
        msg = msg.replace('$otp', String(otp))
        const params = querystring.stringify({
            message: msg,
            sender: 'TXTLCL',
            numbers: phone,
            test: true
        })
        const url = `https://api.textlocal.in/send/?apiKey=${process.env.TEXTLOCAL_API_KEY}&${params}`
        // console.log(url)
        const option = {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        return new Promise((resolve, reject) => {
            request(url, option, function (err, res, body) {
                if (err) {
                    reject(err)
                }
                else {
                    console.log(body)
                    body = JSON.parse(body)
                    if(body.status == 'failure'){
                        reject(body)
                    }
                    else{
                        otps[phone] = otp;
                        setTimeout(() => {
                            delete otps[phone]
                        }, 1000 * 60 * 3)
                        resolve(body)
                    }
                    
                }
            })
        })


    },
    verifyOTP: function(phone, otp){
        // return true;
        if(typeof otps[phone] != 'undefined' && otps[phone] == otp){
            delete otps[phone]
            return true
        }
        return false
    }
}