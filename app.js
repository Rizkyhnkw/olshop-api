const express = require('express');
const app = express()
const bodyparser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config')
const authjwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');


app.use(cors())
app.options('*', cors())
app.use(authjwt())
const productsRouter = require('./routers/products')
const usersRouter = require('./routers/users')
const orderRouter = require('./routers/orders')
const categoriesRouter = require('./routers/categories')


const api = process.env.API_URL;

// middleware
app.use(bodyparser.json())
app.use(morgan('tiny'))
app.use(errorHandler)
// Routers
app.use(`${api}/products`, productsRouter)
app.use(`${api}/categories`, categoriesRouter)
app.use(`${api}/orders`, orderRouter)
app.use(`${api}/users`, usersRouter)


mongoose.connect(process.env.CONNECTION_STRING,{
dbName: 'olshop'
    }
)
.then(()=>{
    console.log('database is ready')
})
.catch((err)=>{
    console.log(err)
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(3000, ()=>{
    console.log(api)
    console.log(`server is running at http://localhost:3000`)
})