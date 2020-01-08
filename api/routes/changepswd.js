const express = require('express')
const router = express.Router();
const User = require('../models/user');
const passport = require('passport')

router.get('/', (req, res) => {
    res.render('change',{
        title: 'Change Password',
        css: 'change'
    })
})

router.post('/', (req, res) => {
    
    const user = req.user;
    // console.log(user)
    // res.json({
    //     user: user,
    //     data: req.body
    // })
    const oldPswd = req.body.oldpassword;
    const newPswd = req.body.newpassword;
    user.changePassword(oldPswd, newPswd).then(doc => console.log(doc))
    .catch(err => console.log(err))
})

module.exports = router;