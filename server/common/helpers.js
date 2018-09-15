module.exports.sendServerErrorResponse = (response, message) => {

    message = message | 'Server Error!';
    response.status(500).send({
        message: message
    });

};