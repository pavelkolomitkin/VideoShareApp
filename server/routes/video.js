const _ = require('underscore');
const bodyChecker = require('../middlewares/bodyChecker');
const { body, check, validationResult } = require('express-validator/check');
const { url } = require('../validators/video');
const { isLatitude, isLongitude } = require('../validators/geo');
const helpers = require('../common/helpers');

module.exports = (app, database) => {

    app.post('/video', [
            bodyChecker,
            check('url')
                .isURL()
                .withMessage('This fields should contain an url!')
                .custom(url),
            check('title').not().isEmpty().withMessage('This field can not be blank!'),
            check('title').isLength({max: 255}).withMessage('Max 255 characters!'),
            check('description').isLength({ max: 1000 }).withMessage('Max 1000 characters!'),
            check('location.latitude').custom(isLatitude),
            check('location.longitude').custom(isLongitude),

        ],
        (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty())
        {
            return res.status(422).json({ errors: helpers.prepareResponseErrors(errors) })
        }

        const { title, description, url, time, location } = req.body;
        const { authUser, parsedVideo } = req;
        // Add user link
        // Add Type of video -> ['youtube']
        // Add parsed data to the document

        database.collection('videos').insertOne(
            {
                title,
                description,
                url,
                time,
                location,
                videoType: parsedVideo.type,
                userId: authUser._id,
                videoData: parsedVideo
            },
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