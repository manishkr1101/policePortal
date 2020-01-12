const router = require('express').Router()
const db = require('../../middleware/db')

router.get('/states', (req, res) => {
    db.ref('/places/states').once('value')
        .then(doc => doc.val())
        .then(data => {
            let arr = []
            for (let d in data) {
                arr.push(d)
            }
            res.status(200).json(arr)
        })

})

router.get('/:state', (req, res) => {
    const state = req.params.state
    db.ref('/places/states/' + state).once('value')
        .then(doc => doc.val())
        .then(data => {
            let arr = []
            for (let d in data) {
                arr.push(d)
            }
            res.status(200).json(arr)
        })
})

router.get('/:state/:dist', (req, res) => {
    const state = req.params.state
    const dist = req.params.dist
    db.ref('/places/states/' + state+'/'+dist).once('value')
        .then(doc => doc.val())
        .then(data => {
            let arr = []
            for (let d in data) {
                arr.push(d + ': ' + data[d])
            }
            res.status(200).json(arr)
        })
})

module.exports = router