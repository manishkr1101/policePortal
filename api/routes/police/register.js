const router = require('express').Router()
const checkAdmin = require('../../middleware/checkAdmin')
const firebase = require('firebase')
require('firebase/auth')
const db = require('../../middleware/db')

router.get('/',checkAdmin, (req, res) => {
    res.render('police/register',{
        title: 'Register Police',
        css: 'login'
    })
})

router.post('/',checkAdmin, (req, res) => {
    const body = req.body;
    const user = {
        name: body.name,
        email: body.email,
        'station-id': body.stationId,
        rank: body.rank,
        level: body.level,
        phone: body.phone
    }

    firebase.auth().createUserWithEmailAndPassword(body.email, body.password)
    .then((u) => {
        db.ref(`/police/${u.user.uid}`).set(user)
    })
    .then(user => {
        console.log({user: user})
        return firebase.auth().currentUser.sendEmailVerification()
    })
    .then(() => {
        firebase.auth().signOut()
        res.send('Email verificatin is sent to user. Verify and then log in')
    })
    .catch(err => res.send(err))
})

module.exports = router