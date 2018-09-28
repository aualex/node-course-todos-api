const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5bad4ec0f10dc66e728ee81e';

if (!ObjectID.isValid(id)) {
    console.log('ID not valid');
} else{
    User.findById(id).then((user) => {
        if(!user){ return console.log(` user not found for ${id} `)}
        console.log(`user\'s email id is : ${user.email} `);
    } , (e) => {
        console.log(e);
    })
}
/* Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
}); */
/* Todo.findById(id).then((todo) => {
    if(!todo){
        return console.log(`record not found for ${id}`);
    }
    console.log('Todo by Id', todo);
}).catch((e) => {
    console.log(e);
}); */

