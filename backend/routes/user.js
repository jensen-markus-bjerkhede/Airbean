const { Router } = require('express')
const router = new Router();
const { db } = require('./../db')

router.get('/', (req, res) => {
    if (req.query.userEmail === 'undefined') {
        res.status(400).send()
    } else {
        let user = db.get('users').find({ mail: req.query.userEmail }).value()
        res.status(200).send(user)
    }
})

router.post('/create', (req, res) => {
    console.log(req.body)
    if (userIsValid(req.body)) {
        try {
            db.get('users').push({ name: req.body.name, mail: req.body.mail }).write()
            res.status(201).send()
        } catch (err) {
            console.error(`Could not save user {${req.body}} to database`)
            res.status(500).send()
        }
    } else {
        res.status(400).send()
    }
})

function userIsValid(body) {
    if (db.get('users').find({ mail: body.mail }).value() !== undefined) {
        return false;
    }
    return body.name !== undefined && body.mail !== undefined;
}
module.exports = router