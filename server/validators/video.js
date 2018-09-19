const provider = require('../video-provider/index');

module.exports.url = (url, { req }) => {
    return new Promise((resolve, reject) => {
            provider(url)
                .then((data) => {
                    req.parsedVideo = data;
                    resolve();
                })
                .catch((error) => {
                    reject('Can not recognize url!');
                });
        });
};