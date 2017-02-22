// TUTORIAL URLS
// https://www.distelli.com/docs/tutorials/automated-mocha-tests-for-node
// https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai


//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Users = require('../models/User');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Users', () => {
    beforeEach((done) => { //Before each test we empty the database
        Users.remove({}, (err) => { 
           done();         
        });     
    });
/*
  * Test the /GET route
  */
  describe('/GET users', () => {
      it('it should GET all the users', (done) => {
        chai.request(app)
            .get('/users/all')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });


   /*
  * Test the /POST route
  */
    describe('/POST user', () => {
        // Test to post a new user
        it('it should POST a new user ', (done) => {
            // Make a temp user just for testing
            let newTestUser = {
                fullname: 'Ezio auditore da firenze', 
                username: 'ezio', 
                password: '1459', 
                email: 'owl@assassins.creed',
                boards: {
                    todo: [],
                    doing: [],
                    done: [],
                    later: [],
                    other: [],
                },
                createdAt: new Date()
            }
            chai.request(app)
                .post('/users/register')
                .send(newTestUser)
                .end((err, res) => {
                    // everything is ok?
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    // Did it even got saved?!
                    res.body.should.have.property('success').eql(true);
                    // See if the new user is complete
                    res.body.newUser.should.have.property('_id');
                    res.body.newUser.should.have.property('fullname');
                    res.body.newUser.should.have.property('username');
                    res.body.newUser.should.have.property('password');
                    res.body.newUser.should.have.property('boards');
                    res.body.newUser.should.have.property('email');
                    res.body.newUser.should.have.property('createdAt');
                    // does he have a token?
                    res.body.should.have.property('token');
                    res.body.token.should.be.a('string');
                    done();
                });
        });
    });



    /*
  * Test the /GET/:id route
  */
  describe('/GET/:id user boards', () => {
      it('it should GET this user boards by the given id', (done) => {
        let user = new Users({
            fullname: 'Ezio auditore da firenze', 
            username: 'ezio', 
            password: '1459', 
            email: 'owl@assassins.creed',
            boards: {
                todo: [],
                doing: [],
                done: [],
                later: [],
                other: [],
            },
            createdAt: new Date()
        });
        user.save((err, user) => {
            chai.request(app)
            .get('/boards/' + user.id)
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                // console.log(res.body)
                // See if we have a full user
                res.body.should.have.property('_id');
                res.body.should.have.property('fullname');
                res.body.should.have.property('username');
                res.body.should.have.property('password');
                res.body.should.have.property('boards');
                res.body.should.have.property('email');
                res.body.should.have.property('createdAt');
                // Check the type of some important stuff
                res.body.boards.should.be.a('object');
              done();
            });
        });

      });
  });



});