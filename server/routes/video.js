const _ = require('underscore');
const bodyChecker = require('../middlewares/bodyChecker');
const { body, check, validationResult } = require('express-validator/check');
const { url } = require('../validators/video');
const { isLatitude, isLongitude } = require('../validators/geo');
const helpers = require('../common/helpers');

module.exports = (app, database) => {

    app.post('/video', [
            bodyChecker,
            body('url').custom(url),
            check('title').isLength({min: 1, max: 255}),
            check('description').isLength({ max: 1000 }),
            check('location.latitude').isFloat(),
            body('location.latitude').custom(isLatitude),
            check('location.longitude').isFloat(),
            body('location.longitude').custom(isLongitude),

        ],
        (req, res) => {

        const { title, description, url, time, location } = req.body;

        database.collection('videos').insertOne(
            { title, description, url, time, location },
            (error, result) => {
                if (error)
                {

                    helpers.sendServerErrorResponse(res);
                    return;
                }

                const video = result.ops[0];
                res
                    .status(201)
                    .send({video});
            });

    });

};