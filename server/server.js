const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const ObjectID = require('mongodb').ObjectID;

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.port || 3000;

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
});

//DELETE /todos/123456
app.delete('/todos/:id', (req, res) => {
    //get the id
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {return res.status(404).send(`id ${id} is not valid`)};
    Todo.findByIdAndRemove(id).then((todo)=> {
        if(!todo){
            return res.status(404).send(`no record found for id ${id}`);
        }  
        res.status(200).send({todo});
    }).catch((e) => {
        res.status(400).send(e);
    });
});
app.patch('/todos/:id', (req, res)=> {
    var id = req.params.id;
    var body = _.pick(req.body, ['text','completed']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send(`id ${id} is not valid`)
    };
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completedAt = null;
        body.completed = false;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`)
});

module.exports = {app};