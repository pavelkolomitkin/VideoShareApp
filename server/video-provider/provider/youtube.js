const request = require('request');

const isYoutubeLink = (url) => {

    return /www\.youtube\.(com|ru)\/watch\?v=([A-Za-z0-9\-\_]+)/.test(url);
};

module.exports = (url) => {
    return new Promise((resolve, reject) => {

        if (!isYoutubeLink(url))
        {
            reject();
            return;
        }

        request('https://www.youtube.com/oembed?url=' + url, (error, response, body) => {
            if (error || response.statusCode !== 200) {
                reject();
                return;
            }

            resolve(JSON.parse(body));
        });
    });
};