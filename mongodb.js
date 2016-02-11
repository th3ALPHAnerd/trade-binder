//require/import the mongodb native drivers.
var mongodb = require('mongodb');

//Work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where the server is running.
var url = 'mongodb://localhost:27017/users';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        //connected
        console.log('Connection established to', url);

        // Get the documents collection
        var collection = db.collection('users');

        // Insert some users
        collection.find({user: 'leeroy'}).toArray(function (err, result) {
            if (err) {
                console.log(err);
            } else if (result.length) {
                console.log('Found:', result);
            } else {
                console.log('No document(s) found with defined "find" criteria!');
            }

            //Close connection
            db.close();
        });
    }
});