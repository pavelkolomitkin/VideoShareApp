const _ = require('underscore');

const config = require('../config');

module.exports.sendServerErrorResponse = (response, message) => {

    message = message | 'Server Error!';
    response.status(500).send({
        message: message
    });

};

module.exports.isRequestSecured = (request) => {
    let result = false;

    const currentRoute = request.path;
    for (let route of config.SECURED_ROUTES)
    {
        if (route.indexOf(currentRoute) === 0)
        {
            result = true;
            break;
        }
    }

    return result;
};

module.exports.prepareResponseErrors = (errors) => {
    let data = (typeof errors.array === 'function') ? errors.array() : errors;

    const result = {};
    for (const errorItem of data)
    {
        if (!_.isArray(result[errorItem.param]))
        {
            result[errorItem.param] = [];
        }

        result[errorItem.param].push(errorItem.msg);
    }

    return result;
};