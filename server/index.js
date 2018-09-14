const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();

app.get('/', (req, res) => {
    res.send({
        message: 'Hi from JSON API!'
    });
});

const port = 8000;
app.listen(port, () => {
    console.log('We are live on ' + port);
});