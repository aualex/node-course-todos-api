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
    //to fetch all, use find(), to find specific, specify in the find() parameter
    // for example: find({completed: true})
   /*  db.collection('Todos').find({_id: new ObjectID('5bac0e272dedc148ba91cc65')}).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
            console.log('Unable to fecth Todos', err);
          }); */
    /* db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.log('Unable to fecth Todos', err);
    }); */
    db.collection('Users').find({name: 'Alex Au'}).count().then((count) => {
        console.log(`Count of the document with name equals to Alex Au is ${count}`)
    }, (err) => {
        console.log('Unable to fecth count from Users', err);
    });

    
    /* db.close();
    console.log('Closing the DB connection..'); */
});