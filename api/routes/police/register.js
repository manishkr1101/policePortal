const router = require('express').Router()
const checkAdmin = require('../../middleware/checkAdmin')
const firebase = require('firebase')
require('firebase/auth')
const db = require('../../middleware/db')
const formidable = require('formidable')
const storage = require('../../middleware/storage')

// router.use(checkAdmin)

router.get('/', (req, res) => {
    res.render('police/register', {
        title: 'Register Police',
        css: 'login'
    })
})

router.post('/', (req, res) => {

    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
        // console.log(files)
        const body = fields
        const user = {
            name: body.name,
            email: body.email,
            'station-id': body.stationId,
            rank: body.rank,
            level: body.level,
            phone: body.phone
        }

        try {
            const u = await firebase.auth().createUserWithEmailAndPassword(body.email, body.password)
            const imgInfo = await storage.uploadFile(files.image.path, `police/${u.user.uid}/profile.${files.image.type.split('/')[1]}`, files.image.type)
            user.image = {
                url: imgInfo.url,
                type: imgInfo.type
            }
            await db.ref(`/police/${u.user.uid}`).set(user)
            // await firebase.auth().currentUser.sendEmailVerification()
            await firebase.auth().signOut()
            res.send('Email verificatin is sent to user. Verify and then log in')
        } catch (error) {
            res.send({ err: error })
        }



    })



})

module.exports = router