const { Router } = require('express')
const router = new Router();
const { db } = require('./../db')

router.post('/create', (req, res) => {
    let totalCost = getTotalCost(req.body.products);
    let timestamp = Math.floor(Date.now() / 1000);
    let eta = timestamp + Math.floor(Math.random() * (1800 - 600) + 600);
    let orderNumber = '#AB' + getIncrementalOrderNumber() + 'Z';
    db.get('orders')
        .push({
            orderNumber: orderNumber,
            owner: req.body.owner,
            totalCost: totalCost,
            createdAt: timestamp,
            products: req.body.products,
            estimatedTimeArrival: eta
        }).write();
    res.status(201).send({ orderNumber: orderNumber });
})

router.get('/', (req, res) => {
    let orders = db.get('orders').filter({ owner: req.query.owner }).value();
    res.send(orders);
})
router.get('/latest', (req, res) => {
    let orders = db.get('orders').filter({ owner: req.query.owner }).value();
    res.send(orders.slice(-1)[0]);
  })

function getIncrementalOrderNumber() {
    db.update('incrementalOrderNumber', n => n + 1)
        .write();
    return db.get('incrementalOrderNumber').value();
}

function getTotalCost(products) {
    let totalCost = 0;
    products.forEach(product => totalCost += getProductPrice(product.id) * product.quantity);
    return totalCost;
}

function getProductPrice(id) {
    let product = db.get('products').find({ id: id }).value();
    return product.price;
}

module.exports = router