const express = require('express');
const app = express();
const path = require('path');
const errorMiddleware = require('./middlewares/error')
const auth = require('./routes/auth');
const cookieParser = require('cookie-parser');
const cors = require('cors')

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

const products = require('./routes/product')
const order = require('./routes/order')
app.use('/api/v1/',products);
app.use('/api/v1/',auth); 
app.use('/api/v1/',order);  

app.use(errorMiddleware)

module.exports = app;

