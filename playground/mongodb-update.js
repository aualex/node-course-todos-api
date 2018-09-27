//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    //the below is for mongo rel 3, nte the parameter call changed from db to client
    //MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable to cnnect to mongodb server');
    }
    console.log('Connected to Mongo DB Server');
   /*  //find one and update
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5bac23d12dedc148ba91d376')
    },{$set:{completed: true}}, {returnOriginal: false
    } ).then((result) => {
        console.log(result);
    }); */
    //increment the age by 1
    db.collection('Users').findOneAndUpdate({_id: new ObjectID('5bac0a871e434e1b849d8277')},
    {$inc:{age:1}},{returnOriginal: false}).then((result)=> {
        console.log(result)
    });
    db.collection('Users').findOneAndUpdate({_id: new ObjectID('5bac0a871e434e1b849d8277')},
    {$set:{location:'Irvine'}},{returnOriginal: false}).then((result1)=> {
        console.log(result1)
    });
     /* db.close();
    console.log('Closing the DB connection..'); */
});