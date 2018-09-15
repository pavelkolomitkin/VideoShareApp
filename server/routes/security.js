const _ = require('underscore');
const JWT = require('jsonwebtoken');
const bodyChecker = require('../middlewares/bodyChecker');
const config = require('../config');
const helpers = require('../common/helpers');

module.exports = (app, database) => {

    app.post('/login', bodyChecker, (req, res) => {

        let { email, password } = req.body;
        email = email ? email.trim() : '';

        database
            .collection('users')
            .find({email: email}).limit(1).toArray((error, users) => {
                if (error)
                {
                    helpers.sendServerErrorResponse(res);
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
                    const newToken = JWT.sign(userData, config.APP_SECURITY_SIGN_KEY);
                    database
                        .collection('users')
                        .findOneAndUpdate({'_id': userData._id}, {$set: {token: newToken}}, {},
                            (error, result) => {

                                if (error)
                                {
                                    helpers.sendServerErrorResponse(res);
                                    return;
                                }

                                res
                                    .status(200)
                                    .send({
                                        user: userData,
                                        token: newToken
                                    });
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

    app.post('/verify', bodyChecker, (req, res) => {
        const { token } = req.body;

        database
            .collection('users')
            .find({token: token})
            .limit(1)
            .toArray((error, users) => {

                if (error)
                {
                    helpers.sendServerErrorResponse(res);
                    return;
                }

                if (users.length === 0)
                {
                    res.status(400).send({
                        errors: {
                            token: 'Token is not valid!'
                        }
                    });

                    return;
                }

                const user = users[0];
                const userData = _.omit(user, 'password');
                res
                    .status(200)
                    .send({
                        user: userData
                    });

            });
    });
};