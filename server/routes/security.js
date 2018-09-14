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
            .findOne({email: email})
            .exec()
            .then((user) => {

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

            })
            .catch((error) => {
                console.error(error);
            });

        res.status(403);
    });
};