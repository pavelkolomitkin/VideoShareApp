const helpers = require('../common/helpers');
const config = require('../config');

module.exports = (req, res, next, database) => {

    if (!helpers.isRequestSecured(req))
    {
        next();
        return;
    }

    const token = req.headers['auth-token'] || null;
    if (!token)
    {
        res.status(401).send({
            message: 'Access Denied!'
        });

        return;
    }

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
                res.status(401).send({
                    message: 'Access Denied!'
                });

                return;
            }

            req.authUser = users[0];

            next();
        });

}