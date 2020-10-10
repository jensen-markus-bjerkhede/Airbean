const { Router } = require('express')
const router = new Router();


//Database
const { db } = require('./../db')

router.get('/', (req, res) => {
    let products = db.get('menu').value()
    res.send(products)
})

module.exports = router
