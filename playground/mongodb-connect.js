//const MongoClient = require('mongodb').MongoClient;
// use destructuring for the above statment, sample as below
/* var user ={name: 'Alex Au', age: 25};
var {name} = user;
console.log(name); */
const {MongoClient, ObjectID} = require('mongodb');

/* var obj = new ObjectID();
console.log(obj);
 */


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    //the below is for mongo rel 3, nte the parameter call changed from db to client
    //MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable to cnnect to mongodb server');
    }
    console.log('Connected to Mongo DB Server');
     //the below is for mongo rel 3, need to add const definition for db from client
     //const db = client.db('TodoApp')
    /* db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if(err){
            console.log('problem inserting collection', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    }
    ); */
    //the below is for mongo rel 3, repalce db.close to client.close
    //client.close();

    db.collection('Users').insertOne({
        name: 'Alex Au',
        age: 25,
        location: 'Phoneix'
    }, (err,result) => {
        if(err) {
            return console.log('Unable to insert document to Collection Users');
        }
        // console.log(JSON.stringify(result.ops, undefined, 2));
        console.log(result.ops[0]._id.getTimestamp());
    });

    db.close();
    console.log('Closing the DB connection..');
});