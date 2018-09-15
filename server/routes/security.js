const _ = require('underscore');
const JWT = require('jsonwebtoken');
const bodyChecker = require('../middlewares/bodyChecker');
const config = require('../config');

module.exports = (app, database) => {

    app.post('/login', bodyChecker, (req, res) => {

        let { email, password } = req.body;
        email = email ? email.trim() : '';

        database
            .collection('users')
            .find({email: email}).limit(1).toArray((error, users) => {
                if (error)
                {
                    console.error(error);
                    res.status(500).send({
                        message: 'Server Error!'
                    });
                    return;
                }

                if (users.length === 0)
                {
                    res.status(400).send({
                        errors: {
                            email: 'Email or password are incorrect!'
                        }
                    });

                    return;
                }

                const user = users[0];
                //debugger;

                if (user.password ===  JWT.sign(password, config.APP_SECURITY_SIGN_KEY))
                {
                    const userData = _.omit(user, 'password');
                    res
                        .status(200)
                        .send({
                            user: userData,
                            token: JWT.sign(userData, config.APP_SECURITY_SIGN_KEY)
                        });
                }
                else
                {
                    res.status(400).send({
                        errors: {
                            email: 'Email or password are incorrect!'
                        }
                    });
                }

            });
    });
};