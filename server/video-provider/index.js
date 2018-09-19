module.exports = (url) => {
    return new Promise((resolve, reject) => {
        require('./provider/youtube')(url)
            .then((data) => {
                data.type = 'youtube';
                resolve(data);
            })
            .catch((error) => {
                reject('Can not recognize url!');
            });
    });
};
