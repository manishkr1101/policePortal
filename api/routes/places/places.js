const router = require('express').Router()
const db = require('../../middleware/db')

router.get('/states', (req, res) => {
    db.ref('/places/State').once('value')
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
    db.ref('/places/State/' + state).once('value')
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
    db.ref('/places/State/' + state+'/'+dist).once('value')
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