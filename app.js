const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

// CORS error : 
app.use(cors());
app.options('*', cors());

// setting up the middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// error handling
app.use((req, res, next) => {
    const error = new Error('Invalid Request');
    res.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status = error.status || 500;
    return res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;