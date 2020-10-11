// Imports
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

//Routes
const userRoute = require('./routes/user')
const productsRoute = require('./routes/products')

// Variables
const app = express();
const PORT = 5000;

app.use(cors())
app.use(bodyParser.json());

// Get
app.use('(/user', userRoute)
app.use('/products', productsRoute)

// Static Assets
app.use('/assets', express.static('./assets'))


// Starting Server
app.listen(PORT,() => {
    console.log('Server has started')
} )
