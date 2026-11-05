const express = require('express');
const apiRoutes = require('./routes/api');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: process.env.URL_FRONTEND,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());

app.use('/api', apiRoutes);

module.exports = app;