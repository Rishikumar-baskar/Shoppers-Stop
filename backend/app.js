const express = require('express');
const app = express();
const path = require('path');
const errorMiddleware = require('./middlewares/error')
const auth = require('./routes/auth');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const dotenv = require('dotenv');



dotenv.config({path:path.join(__dirname,"config/config.env")});


app.use(express.json());
app.use(cookieParser());

// Configure CORS to allow frontend domain
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/uploads', express.static(path.join(__dirname,'uploads')))

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,'../frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'../frontend/build/index.html'))
    })
}

const products = require('./routes/product')
const order = require('./routes/order')
const payment = require('./routes/payment')

app.use('/api/v1/',products);
app.use('/api/v1/',auth);
app.use('/api/v1/',order);
app.use('/api/v1/',payment);


app.use(errorMiddleware)

module.exports = app;

