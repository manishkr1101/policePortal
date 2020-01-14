const router = require('express').Router()
const otpSender = require('../middleware/otp-sender')
// router.use(require('../middleware/checkAuth'))

router.post('/:ph', (req, res) => {
    let ph = req.params.ph
    otpSender.sendOTP(ph, 'Your OTP is $otp for verification')
    .then(body => res.status(200).json(body))
    .catch(er => res.status(500).json({err: er}))
})

module.exports = router