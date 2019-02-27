
/* --- Module imports --- */
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
require('../config/passport-setup')(passport);

/* --- Declare app --- */
const app = express();

/* --- Third-party middleware --- */
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

/* --- Routes --- */
app.use('/', require('./auth/router'));
app.use('/', require('./api/user/router'));
app.use('/', require('./api/product/router'));
app.use('/', (req, res)=>{
    res.status(200).send('Starting');
})

module.exports = app;