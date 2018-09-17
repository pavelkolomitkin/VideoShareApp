module.exports = (url) => {
    return new Promise((resolve, reject) => {
        require('./provider/youtube')(url)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject('Can not recognize url!');
            });
    });
};
