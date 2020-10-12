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
    let user = getUser(req.body);
    if (user !== undefined) {
        res.status(200).send(user) 
        return;
    }
    if (userIsValid(req.body)) {
        try {
            console.log('name: ' + req.body.name + ' mail: ' + req.body.mail)
            db.get('users').push({ name: req.body.name, mail: req.body.mail }).write()
            console.log('db query: ' + db.get('users').find({ mail: req.body.mail }).value())
            res.status(201).send(db.get('users').find({ mail: req.body.mail }).value())
        } catch (err) {
            console.error(`Could not save user {${req.body}} to database`)
            res.status(500).send()
        }
    } else {
        res.status(400).send()
    }
})

function getUser(body) {
    let user = db.get('users').find({ mail: body.mail }).value() !== undefined
    if (db.get('users').find({ mail: body.mail }).value() !== undefined) {
        console.log('User: {name:'+ body.name + ', mail:' + body.mail + '} already exists, logging in')
        return user;
    } else {
        return undefined;
    }
}

function userIsValid(body) {
    return body.name !== undefined && body.mail !== undefined;
}
module.exports = router