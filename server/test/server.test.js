const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');
beforeEach(populateUsers);
beforeEach(populateTodos);

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

describe('GET /users/me', () => {
    it('Should return a user if authenticated', (done) => {
        request(app)
        .get('/users/me')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
            expect(res.body._id).toBe(users[0]._id.toHexString());
            expect(res.body.email).toBe(users[0].email);
        })
        .end(done);
    });

    it('Should return a 401 if not authenticated', (done) => {
        request(app)
        .get('/users/me')
        .expect(401)
        .expect((res) => {
            expect(res.body).toEqual({});
        })
        .end(done);
    });
});

describe('POST /users', () => {
    it('Should create a user', (done) => {
        var email = 'example@example.com';
        var password = 'password1';
        request(app)
        .post('/users')
        .send({email, password})
        .expect(200)
        .expect((res) => {
            expect(res.headers['x-auth']).toExist();
            expect(res.body._id).toExist();
            expect(res.body.email).toBe(email);
        })
        .end((err) => {
            if(err){
                return done(err);
            }
            User.findOne({email}).then((user) => {
                expect(user).toExist();
                expect(user.password).toNotBe(password);
                done();
            }).catch((err) => done(err));
        });
    });

    it('Should return validation error if request invalid', (done)=> {
        request(app)
        .post('/users')
        .send({
            email: 'and',
            password: '123'
        })
        .expect(400)
        .end(done);
    });
    it('Should not create user if email in used', (done)=> {
        request(app)
        .post('/users')
        .send({
            email: users[0].email,
            password: 'password123'
        })
        .expect(400)
        .end(done);
    });
});
describe('POST /users/login', () => {
    it('should login user and return token', (done) => {
        request(app)
        .post('/users/login')
        .send({email: users[1].email,
            password: users[1].password})
        .expect(200)
        .expect((res) => {
            expect(res.headers['x-auth']).toExist();
        })
        .end((err, res) => {
            if (err) {
                return  done(err);
            }
            User.findById(users[1]._id).then((user) => {
                expect(user.tokens[0]).toInclude({
                    access: 'auth',
                    token: res.headers['x-auth']
                });
                done();
            }).catch((err) => done(err)); 
        });
    } );
    it('should reject invalid login', (done) => {
        request(app)
        .post('/users/login')
        .send({email: users[1].email,
            password: users[1].password + '1'})
        .expect(400)
         .expect((res) => {
            expect(res.headers['x-auth']).toNotExist();
        }) 
        .end((err, res) => {
            if (err) {
                return  done(err);
            }
            User.findById(users[1]._id).then((user) => {
                expect(user.tokens.length).toEqual(0);
                done();
            }).catch((err) => done(err)); 
        });
    });
});