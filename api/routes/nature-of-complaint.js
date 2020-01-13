const router = require('express').Router()
const db = require('../middleware/db')
router.get('/', (req, res) => {
    db.ref('/nature-of-complaint').once('value')
    .then(res => res.val())
    .then(result => {
        let arr = []
        for(let r in result){
            arr.push(r)
        }
        res.status(200).json(arr)
    })
    .catch(err => res.send([]))
})

router.get('/:noc', (req, res) => {
    db.ref('/nature-of-complaint/'+req.params.noc).once('value')
    .then(res => res.val())
    .then(result => {
        let arr = []
        for(let r in result){
            arr.push(r)
        }
        res.status(200).json(arr)
    })
    .catch(err => res.send([]))
})

module.exports = router