const securityRoutes = require('./security');

module.exports = (app, database) => {
    securityRoutes(app, database);

};