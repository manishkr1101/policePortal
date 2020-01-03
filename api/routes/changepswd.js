const express = require('express')
const router = express.Router();
const User = require('../models/user');
const passport = require('passport')

router.get('/', (req, res) => {
    res.render('signup')
})

router.post('/', (req, res) => {
    
    const user = req.user;
    // const oldPswd = req.body;
    user.changePassword()
})

module.exports = router;