const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const cors = require('cors');

const config = require('./config');

const app            = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = 8000;
MongoClient.connect(config.MONGO.CONNECTION_URL, {useNewUrlParser: true}, (err, db) => {

    if (err) return console.log(err);

    const database = db.db(config.MONGO.DATABASE_NAME);

    app.use((req, res, next) => {
        require('./middlewares/tokenChecker')(req, res, next, database);
    });

    require('./routes')(app, database);

    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});