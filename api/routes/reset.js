const express = require('express')
const router = express.Router();
const User = require('../models/user');
const passport = require('passport')
const mongoose = require('mongoose')

router.get('/', (req, res) => {
    res.render('reset',{
        title: 'Reset Password',
        css: 'reset'
    })
})

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password)

    User.findOne({username: username}, (err, user) => {
        if(err){
            console.log({error: err})
            res.send('Error! try again')
        }
        else{
            if(!user){
                res.send('No Such User found')
            }
            else{
                user.setPassword(password, (err, response) => {
                    if(err){
                        res.send('Error! try again in set password')
                    }
                    else{
                        console.log(response)
                        user.save();
                        res.send('Password changed')
                        
                    }
                })
            }
        }
    })

    
    
    
})

module.exports = router;