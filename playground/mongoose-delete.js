const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5bad4ec0f10dc66e728ee81e';

/* Todo.remove({}).then((result)=> {
    console.log(result);
}) */;
 
Todo.findByIdAndRemove('5bae8ff0f3f9ef3d0593dd48').then((todo) => {
    console.log(todo);
});

