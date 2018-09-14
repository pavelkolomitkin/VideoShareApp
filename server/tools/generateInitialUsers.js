const MongoClient    = require('mongodb').MongoClient;
const JWT = require('jsonwebtoken');
const config = require('../config');

const initialUsers = [
    {
        email: 'example1@gmail.com',
        username: 'Lucky Guy',
        password: '1234'
    },
    {
        email: 'example2@gmail.com',
        username: 'Pink Girl',
        password: '4321'
    }
];

MongoClient.connect(config.MONGO.CONNECTION_URL,  {useNewUrlParser: true}, function(err, db) {
    if (err) throw err;

    const database = db.db(config.MONGO.DATABASE_NAME);

    for (let i in initialUsers)
    {
        const user = {...initialUsers[i]};
        user.password = JWT.sign(user.password, config.APP_SECURITY_SIGN_KEY);
        console.log('User "' + user.email + '" password "' + user.password);

        database
            .collection('users')
            .insertOne(user, (error, result) => {
                if (error)
                {
                    console.error('User saving error => ', error);
                }
                else
                {
                    console.log('User saved...', result.ops);
                }
            });
    }

    db.close();
});
