const securityRoutes = require('./security');
const videoRoutes = require('./video');

module.exports = (app, database) => {
    securityRoutes(app, database);
    videoRoutes(app, database);
};