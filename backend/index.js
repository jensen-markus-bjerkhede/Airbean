// Imports
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

//Routes
const usersRoute = require('./routes/users')
const productsRoute = require('./routes/products')
const ordersRoute = require('./routes/orders')

// Variables
const app = express();
const PORT = 5000;

app.use(cors())
app.use(bodyParser.json());

app.use('/orders', ordersRoute)
app.use('/users', usersRoute)
app.use('/products', productsRoute)

// Static Assets
app.use('/assets', express.static('./assets'))


// Starting Server
app.listen(PORT,() => {
    console.log('Server has started')
} )
