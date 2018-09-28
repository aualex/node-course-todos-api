const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [
    {_id: new ObjectID(),
    text: 'First test todo'},
    {_id: new ObjectID(),
     text: 'Second test todo'}
];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    });
});

describe('POST /todos 1', () => {
  /* it('should create a new todo', (done) => {
    var text = 'text todo text'; 

    request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if(err) {
                return done(err);
            }
            Todo.find(text).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        })
  });   */
  it('should not create a new todo', (done) => {
    request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if(err) {
                return done(err);
            }
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e)); 
        })
  });

});
describe('GET /todos', () => {
    it('should get all todos', (done) => {
      request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
          console.log(res);
          expect(res.body.result.length).toBe(2);
        })
        .end(done);
    });
  });

describe('GET /todos/:id', () => {
    it('Should return todo doc', (done)=> {
        // console.log(todos[0]._id)
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.result.text).toEqual(todos[0].text);
        })
        .end(done);
    });
    it('Should return a 404 if todo not found', (done)=> {
        var id1 = new ObjectID(); 
        console.log(id1);
        request(app)
        .get(`/todos/${id1}`)
        .expect(404)
        .end(done);
    });
    it('Should return a 400 if the todo id is not valid',(done)=>{
        request(app)
        .get('/todos/123')
        .expect(400)
        .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('Should remove a todo', (done) => {
        request(app)
        .delete(`/todos/${todos[0]._id}`)
        .expect(200)
        .expect((res) => {
            console.log({res});
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }
            //query database with the id again and expect nothing
           Todo.findById(todos[0]._id).then((todo)=> {
            expect(todo).toNotExist();
            done();
           }).catch((e) => {
               done(e);
           })
        });
    });
    it('Should return a 404 if todo not found', (done)=> {
        var id2 = new ObjectID();
        request(app)
        .delete('/todos/id2')
        .expect(404)
        .end(done);
    });
    it('Should return a 404 is id is not valid', (done)=> {
        request(app)
        .delete('/todos/123456')
        .expect(404)
        .end(done);
    });
});