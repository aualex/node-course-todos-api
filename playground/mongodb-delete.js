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
    // delete many
   /*  db.collection('Users').deleteMany({name: 'Alex Au'}).then((result) => {
        console.log(result);
    }, (err) => {
        console.log('Unable to delete documents', err);
    }); */
    //delete one
   /*  db.collection('Todos').deleteOne({text: 'buy dinner'}).then((result)=> {
        console.log(result);
    }); */
    //find one and delete
    /* db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
        console.log(result);
    }); */
    db.collection('Users').findOneAndDelete({_id: new ObjectID('5bac07eef34e7d17ac8ce8d8')}).then((result) => {
        console.log(result);
    }); 
    
    /* db.close();
    console.log('Closing the DB connection..'); */
});