
/* --- Module imports --- */
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors')
require('./config/passport-setup')(passport);

/* --- Declare app --- */
const app = express();

/* --- Third-party middleware --- */
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session()); 
app.use(cors());

/* --- Routes --- */
app.use('/', require('./auth/router'));
app.use('/', require('./api/user/router'));
app.use('/', require('./api/product/router'));
app.use('/', require('./api/shopping-cart/router'));
app.use('/', require('./api/order/router'));
app.use('/', express.static(__dirname + '/static/front-end'));
app.use('/api/media', express.static(__dirname + '/static/api'));
app.use((req, res) => {
    return res.status(404).json({message: 'No route found matching ' + req.url});
})

module.exports = app;