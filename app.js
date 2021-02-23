const express = require('express');
const app = express();
const userServiceV1 = require('./routes/v1');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {ResponseCode} = require('./services/util.service');

// logger
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// DB
require('./models');

// handle cors errors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET,DELETE');
        return res.status(200).json({});
    }
    next();
});

// route v1
app.use('/user-service/v1', userServiceV1);

// server health
app.use('/user-service/health',(req,res,next)=>{
    const code = mongoose.connection.readyState;
    const connState = {
        code,
        message: codeMap[code]
    };
    const status = code ===1 ? ResponseCode.SUCCESS_OK: ResponseCode.SERVICE_NOT_AVAILABLE;
    res.status(status).json(connState);
});

// erro handling
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

module.exports = app;

let codeMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
};