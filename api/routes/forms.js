const express = require('express')
const router = express.Router();
const passport = require('passport')
const User = require('../models/user')
const checkAuth = require('../middleware/checkAuth')


router.get('/fir', (req, res) => {
    res.render('forms/fir', {
        title: 'Report Fir'
    })
})

router.post('/', (req, res) => {
    
    
})

module.exports = router;