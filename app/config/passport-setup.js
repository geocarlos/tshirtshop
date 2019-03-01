const User = require('../models/customer');
const bcrypt = require('bcrypt-nodejs');

module.exports = (passport) => {
    const LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser((user, done) => {
        return done(null, user.customer_id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then(function (user) {
            if (user) {
                return done(null, user.get());
            }
            return done(user.errors, null);
        });

    });

    /* Local sign-up */
    passport.use('local-signup', new LocalStrategy(

        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        (req, email, password, done) => {
            const generateHash = (password) => {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(1), null)
            };

            User.findOne({where: {email: email}}).then(user => {
                if (user) {
                    return done(null, false, {
                        message: 'That e-mail is already registered.'
                    })
                } else {
                    const userPassword = generateHash(password);
                    const data = {
                        email: email,
                        password: userPassword,
                        name: req.body.name,
                        credit_card: req.body.credit_card || null,
                        address_1: req.body.address_1 || null,
                        address_2: req.body.address_2 || null,
                        city: req.body.city || null,
                        region: req.body.region || null,
                        postal_code: req.body.postal_code || null,
                        country: req.body.country || null,
                        day_phone: req.body.day_phone || null,
                        eve_phone: req.body.eve_phone || null,
                        mob_phone: req.body.mob_phone || null
                    };

                    User.create(data).then((newUser, created) => {
                        if (!newUser) {
                            return done(null, false);
                        }
                        return done(null, newUser);
                    })
                }
            })
        }
    ));

    /* Local sign-in */
    passport.use('local-signin', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },

        (req, email, password, done) => {

            const isValidPassword = function (userpass, password) {
                return bcrypt.compareSync(password, userpass);
            }

            User.findOne({ where: { email: email } }).then(function (user) {

                if (!user) {
                    return done(null, false, { message: 'Email does not exist' });
                }

                if (!isValidPassword(user.password, password)) {

                    return done(null, false, { message: 'Incorrect password' });

                }

                const userinfo = user.get();

                return done(null, userinfo);

            }).catch(function (err) {

                console.error("Error:", err);

                return done(null, false, { message: 'Something went wrong with your Signin' });

            });

        }
    ));


}