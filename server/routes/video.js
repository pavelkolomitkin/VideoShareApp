const _ = require('underscore');
const bodyChecker = require('../middlewares/bodyChecker');
const { body, check, validationResult } = require('express-validator/check');
const { url } = require('../validators/video');
const { isLatitude, isLongitude } = require('../validators/geo');
const helpers = require('../common/helpers');
const { ObjectID } = require('mongodb');

module.exports = (app, database) => {

    app.get('/video/:id', (req, res) => {
        const videoId = req.params.id;

        database
            .collection('videos')
            .aggregate([
                {
                    $match: {
                        _id: new ObjectID(videoId)
                    }
                },
                {
                    $lookup:
                    {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'owner'
                    }
                },
                {
                    $unwind: "$owner"
                }
            ]).toArray(
            (error, videos) => {
                if (error)
                {
                    helpers.sendServerErrorResponse(res);
                    return;
                }

                if (videos.length === 0)
                {
                    res.status(404).send({error: 'Video was not found!'});

                    return;
                }

                const video = videos[0];
                res.send({
                    video: video
                });
            }
        );
    });

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

    app.post('/video/list', bodyChecker, (req, res) => {

        const { bounds } = req.body;
        const { topLeft, bottomRight } = bounds;

        const query = {
            'location.latitude':  {$gte: topLeft.latitude, $lte: bottomRight.latitude},
        };
        if (topLeft.latitude * bottomRight.latitude > 0)
        {
            query['location.longitude'] = {$gte: topLeft.longitude, $lte: bottomRight.longitude };
        }

        database.collection('videos')
            .find(query)
            .toArray((error, result) => {
                if (error)
                {
                    helpers.sendServerErrorResponse(res);
                    return;
                }

                res.send({
                    videos: result
                });
            });

    });

};