
/* --- Module imports --- */
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

/* --- Declare app --- */
const app = express();

/* --- Third-party middleware --- */
app.use(helmet());
app.use(bodyParser.json());

/* --- Routes --- */
app.use('/', require('./api/user/router'));
app.use('/', require('./api/product/router'));
app.use('/', (req, res)=>{
    res.status(200).send('Starting');
})

module.exports = app;