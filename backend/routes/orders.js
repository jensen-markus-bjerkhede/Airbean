const { Router } = require('express')
const router = new Router();
const { db } = require('./../db')

router.post('/create', (req, res) => {
    let id = generateUUID();
    let totalCost = getTotalCost(req.body.products);
    let timestamp = Math.floor(Date.now() / 1000);
    db.get('orders')
        .push({
            id: id,
            owner: req.body.owner,
            totalCost: totalCost,
            createdAt: timestamp,
            products: req.body.products
        }).write();
    res.status(201).send({ orderId: id })
})

router.get('/', (req, res) => {
    let orders = db.get('orders').filter({ owner: req.query.owner }).value()
    res.send(orders);
})

function getTotalCost(products) {
    let totalCost = 0;
    products.forEach(product => totalCost += getProductPrice(product.id) * product.quantity);
    return totalCost;
}

function getProductPrice(id) {
    let product = db.get('products').find({ id: id }).value()
    return product.price;
}
function generateUUID() {
    let date = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const random = (date + Math.random() * 16) % 16 | 0;
        date = Math.floor(date / 16);
        return (c === 'x' ? random : (random & 0x3 | 0x8)).toString(16);
    });
}

module.exports = router