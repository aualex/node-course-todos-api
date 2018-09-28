const express = require('express');
const bodyParser = require('body-parser');

const ObjectID = require('mongodb').ObjectID;

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());
app.post('/todos', (req, res)=> {
    var todo = new Todo({
        text: req.body.text
    });
   todo.save().then((doc) => {
        res.send(doc);     
   }, (err) =>{
        res.status(400).send(err);
   });
});

app.get('/todos',(req, res) => {
    Todo.find().then((result) => {
        res.status(200).send({result});
    }, (err) => {
        res.status(400).send(err);
    });
});
//GET /todos/12345
app.get('/todos/:id',(req, res) => {
    var id = req.params.id;
    console.log(id);
    if (!ObjectID.isValid(id)){ return res.status(400).send(`id entered not valid`)};

    Todo.findById(id).then((result) => {
        if(!result) {
            return res.status(404).send(` record ${id} not found`);
        } 
        res.status(200).send({result})
    }).catch((e) => {
        res.status(400).send(e);
    });
/* }, (err) => {
    res.status(400).send(err); */
});

app.listen(3000, () => {
    console.log('started on port 3000')
});

module.exports = {app};