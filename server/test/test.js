var server = require('../index');
// const lib = require("../functions");
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
var sinon = require('sinon');
// var proxyquire = require('proxyquire');
var passport = require('passport');
// var sinonChai = require('sinon-chai');
chai.use(chaiHttp);

var request = require('supertest');
const { assert } = require('chai');

// var server = request.agent('http://localhost:9000');

const userCredentials = {
    username: 'user', 
    your_pass: 'password'
  }
  // now let's login the user before we run any tests
  var authenticatedUser = request.agent(server);
  before(function(done){
    authenticatedUser
      .post('/signin')
      .send(userCredentials)
      .end(function(err, response){
        expect(response.statusCode).to.equal(302);
        expect(response).to.redirectTo("/dashboard")     
        done();
      });
  });



describe('GET /confirmation', function () {
    this.timeout(5000);
    it('should return a 200 response and redirect to /index', function(done){
        request(server).get('/confirmation')
        // .expect('Location', '/index')
        .expect(200, done);
        });
});

describe('GET /redirect_page', function () {
    this.timeout(5000);
    it('should return a 200 response and redirect to /index', function(done){
        request(server).get('/redirect_page')
        // .expect('Location', '/index')
        .expect(200, done);
        });
});

describe('GET /index', function () {
    this.timeout(5000);
    it('should return a 200 response and redirect to /index', function(done){
        request(server).get('/index')
        // .expect('Location', '/index')
        .expect(200, done);
        });
});

describe('GET /', function () {
  this.timeout(5000);
  it('should return a 200 response and redirect to /index', function(done){
      request(server).get('/index')
      // .expect('Location', '/index')
      .expect(200, done);
      });
});

describe('GET /signin', function () {
    this.timeout(5000);
    it('should return a 200 response and redirect to /index', function(done){
        request(server).get('/signin')
        // .expect('Location', '/index')
        .expect(200, done);
        });
});

describe('GET /signup', function(done){
//addresses 1st bullet point: if the user is logged in we should get a 200 status code
this.timeout(5000);
it('should return a 200 response and redirect to /index', function(done){
    request(server).get('/signup')
    // .expect('Location', '/index')
    .expect(200, done);
    });
});

// describe('isHoliday', function(){
//     it('should return false if user id blank', function () {
//       var test = lib.isHoliday('2021-12-25');
//       assert.equal(test, true);
//     });
//   });

describe('GET /dashboard', function(done){
    //addresses 1st bullet point: if the user is logged in we should get a 200 status code
        it('should return a 200 response if the user is logged in', function(done){
        authenticatedUser.get('/dashboard')
        // .expect('Location', '/signin')
        .expect(200, done);
        });
    //addresses 2nd bullet point: if the user is not logged in we should get a 302 response code and be directed to the /login page
        it('should return a 302 response and redirect to /index', function(done){
        request(server).get('/dashboard')
        .expect('Location', '/index')
        .expect(302, done);
        });
    });


// describe('GET /profile', function(done){
// //addresses 1st bullet point: if the user is logged in we should get a 200 status code
//     it('should return a 200 response if the user is logged in', function(done){
//     authenticatedUser.get('/profile')
//     .expect(200, done);
//     });
// //addresses 2nd bullet point: if the user is not logged in we should get a 302 response code and be directed to the /login page
//     it('should return a 302 response and redirect to /index', function(done){
//     request(server).get('/profile')
//     .expect('Location', '/index')
//     .expect(302, done);
//     });
// });

// describe('GET /edit_profile', function(done){
// //addresses 1st bullet point: if the user is logged in we should get a 200 status code
//     it('should return a 200 response if the user is logged in', function(done){
//     authenticatedUser.get('/edit_profile')
//     .expect(200, done);
//     });
// //addresses 2nd bullet point: if the user is not logged in we should get a 302 response code and be directed to the /login page
//     it('should return a 302 response and redirect to /index', function(done){
//     request(server).get('/edit_profile')
//     .expect('Location', '/index')
//     .expect(302, done);
//     });
// });

// describe('GET /fuel_quote', function(done){
// //addresses 1st bullet point: if the user is logged in we should get a 200 status code
//     it('should return a 200 response if the user is logged in', function(done){
//     authenticatedUser.get('/fuel_quote')
//     .expect(200, done);
//     });
// //addresses 2nd bullet point: if the user is not logged in we should get a 302 response code and be directed to the /login page
//     it('should return a 302 response and redirect to /index', function(done){
//     request(server).get('/fuel_quote')
//     .expect('Location', '/index')
//     .expect(302, done);
//     });
// });

// describe('GET /fuel_history', function(done){
// //addresses 1st bullet point: if the user is logged in we should get a 200 status code
//     it('should return a 200 response if the user is logged in', function(done){
//     authenticatedUser.get('/fuel_history')
//     .expect(200, done);
//     });
// //addresses 2nd bullet point: if the user is not logged in we should get a 302 response code and be directed to the /login page
//     it('should return a 302 response and redirect to /index', function(done){
//     request(server).get('/fuel_history')
//     .expect('Location', '/index')
//     .expect(302, done);
//     });
// });

// describe('POST /edit_profile', function(done){
//     it('valid user input', (done) => {
//         let info = {
//             fullName: "Rat Rat", 
//             addressOne: "123 Rat St. Houston, TX", 
//             cityOne: "Houston", 
//             stateOne: "TX", 
//             zipCodeOne: "77777",
//             addressTwo: "123 Rat St. Houston, TX",
//             cityTwo: "Houston",
//             stateTwo: "TX",
//             zipCodeTwo: "77777",
//         }

//         authenticatedUser
//         .post('/edit_profile')
//         .send(info)
//         .end((err, response) => {
//             expect(response.should.have.status(302));
//             expect(response).to.redirectTo("/profile")
//             done();
//         });
//     });

//     it('invalid user input', (done) => {
//         let info = {
//             fullName: "Rat Rat", 
//             addressOne: "123 Rat St. Houston, TX", 
//             cityOne: "Houston", 
//             stateOne: "TX", 
//             zipCodeOne: "7777",
//             addressTwo: "123 Rat St. Houston, TX",
//             cityTwo: "Houston",
//             stateTwo: "TX",
//             zipCodeTwo: "7777",
//         }

//         authenticatedUser
//         .post('/edit_profile')
//         .send(info)
//         .end((err, response) => {
//             expect(response.should.have.status(302));
//             expect(response).to.redirectTo("/edit_profile")
//             done();
//         });
//     });

//     it('invalid user input - did not insert all primary fields', (done) => {
//         let info = {
//             fullName: "Rat Rat", 
//             addressOne: "123 Rat St. Houston, TX", 
//             cityOne: "Houston", 
//             stateOne: "TX", 
//             zipCodeOne: "",
//             addressTwo: "123 Rat St. Houston, TX",
//             cityTwo: "Houston",
//             stateTwo: "TX",
//             zipCodeTwo: ""
//         }

//         authenticatedUser
//         .post('/edit_profile')
//         .send(info)
//         .end((err, response) => {
//             expect(response.should.have.status(302));
//             expect(response).to.redirectTo("/edit_profile")
//             done();
//         });
//     });

//     it('invalid user input - did not insert all secondary fields', (done) => {
//         let info = {
//             fullName: "Rat Rat", 
//             addressOne: "123 Rat St. Houston, TX", 
//             cityOne: "Houston", 
//             stateOne: "TX", 
//             zipCodeOne: "7777",
//             addressTwo: "123 Rat St. Houston, TX",
//             cityTwo: "Houston",
//             stateTwo: "TX",
//             zipCodeTwo: ""
//         }

//         authenticatedUser
//         .post('/edit_profile')
//         .send(info)
//         .end((err, response) => {
//             expect(response.should.have.status(302));
//             expect(response).to.redirectTo("/edit_profile")
//             done();
//         });
//     });
// });


describe('POST /signup', ()=> {
    it("valid user input", (done) => {
        let user = {
            name: "Rat", 
            email: "rat2@gmail.com", 
            username: "rat",
            pass: "password", 
            re_pass: "password",
            agree_term: "on"
        }
        authenticatedUser
        .post("/signup")
        .send(user)
        .end(function(err, response){
            expect(response.statusCode).to.equal(302);
            expect(response).to.redirectTo("/signin")     
            done();
        });
    });

    it("invalid user input - passwords don't match", (done) => {
        let user = {
            name: "Rat", 
            email: "rat2@gmail.com", 
            username: "rat",
            pass: "password", 
            re_pass: "password22",
            agree_term: "on"
        }
        authenticatedUser
        .post("/signup")
        .send(user)
        .end(function(err, response){
            expect(response.statusCode).to.equal(302);
            expect(response).to.redirectTo("/signup")     
            done();
        });
    });

    it("invalid user input - user id already registered", (done) => {
        let user = {
            name: "user", 
            email: "rat2@gmail.com", 
            username: "password",
            pass: "password", 
            re_pass: "password",
            agree_term: "on"
        }
        authenticatedUser
        .post("/signup")
        .send(user)
        .end(function(err, response){
            expect(response.statusCode).to.equal(302);
            expect(response).to.redirectTo("/index")     
            done();
        });
    });

    it("invalid user input - email already registered", (done) => {
        let user = {
            name: "user", 
            email: "user@gmail.com", 
            username: "password",
            pass: "password", 
            re_pass: "password",
            agree_term: "on"
        }
        authenticatedUser
        .post("/signup")
        .send(user)
        .end(function(err, response){
            expect(response.statusCode).to.equal(302);
            expect(response).to.redirectTo("/index")     
            done();
        });
    });

    it("invalid user input", (done) => {
        authenticatedUser
        .post("/signup")
        .end(function(err, response){
            expect(response.statusCode).to.equal(302);
            expect(response).to.redirectTo("/signup")     
            done();
        });
    });

});

describe('POST /signin', ()=> {
    it('valid user input', (done) => {
        const user = {
            username: 'user', 
            your_pass: 'password'
        }
        authenticatedUser
        .post('/signin')
        .send(user)
        .end(function(err, response){
            expect(response.statusCode).to.equal(302);
            expect(response).to.redirectTo("/dashboard")     
            done();
      });
    });

    it('nonvalid user input', (done) => {
        const user = {
            username: 'rat', 
            your_pass: 'password222'
          }
        authenticatedUser
        .post('/signin')
        .send(user)
        .end(function(err, response){
            expect(response.statusCode).to.equal(302);
            expect(response).to.redirectTo("/signin")     
            //expect('Location', '/home');
            done();
      });
    });

    it('no user input', (done) => {
        authenticatedUser
        .post('/signin')
        .end(function(err, response){
            expect(response.statusCode).to.equal(302);
            expect(response).to.redirectTo("/signin")     
            //expect('Location', '/home');
            done();
      });
    });
});

// describe('POST /new_user', ()=> {
//     it('valid user input', (done) => {
//         const user = {
//             loginUserID: 'user', 
//             loginPass: 'password'
//           }
//         authenticatedUser
//         .post('/new_user')
//         .send(user)
//         .end(function(err, response){
//             expect(response.statusCode).to.equal(302);
//             expect(response).to.redirectTo("/create_profile")     
//             //expect('Location', '/home');
//             done();
//       });
//     });

//     it('nonvalid user input', (done) => {
//         const user = {
//             loginUserID: 'rat', 
//             loginPass: 'password'
//           }
//         authenticatedUser
//         .post('/login')
//         .send(user)
//         .end(function(err, response){
//             expect(response.statusCode).to.equal(302);
//             expect(response).to.redirectTo("/index")     
//             //expect('Location', '/home');
//             done();
//       });
//     });

//     it('no user input', (done) => {
//         authenticatedUser
//         .post('/login')
//         .end(function(err, response){
//             expect(response.statusCode).to.equal(302);
//             expect(response).to.redirectTo("/index")     
//             //expect('Location', '/home');
//             done();
//       });
//     });
// });


// describe('POST /fuel_quote', ()=> {
//     it('valid user input', (done) => {
//         let info = {
//             gallonsRequested: 10, 
//             deliveryAddress: "123 Rat St. Houston, TX", 
//             deliveryDate: "2021-03-31 00:00:00", 
//             suggestedPrice: 3, 
//             total: 300,
//         }
//         done();

//         authenticatedUser
//         .post('/fuel_quote')
//         .send(info)
//         .end((err, response) => {
//             expect(response.should.have.status(302));
//             expect(response).to.redirectTo("/fuel_history")
//             done();
//         });
//     });
// });


// describe('POST /reset_password', ()=> {
//     it('valid user input', (done) => {
//         let info = {
//             inputUserID: "user",
//             resetPass: "password",
//             resetConfirmPass: "password", 
//         }
        
//         authenticatedUser
//         .post('/reset_password')
//         .send(info)

//         .end((err, response) => {
//             expect(response.should.have.status(302));
//             expect(response).to.redirectTo("/index")
//             done();
//         });
//     });

//     it('invalid user input', (done) => {
//         let info = {
//             inputUserID: "",
//             resetPass: "test",
//             resetConfirmPass: "teeeeest", 
//         }
        
//         authenticatedUser
//         .post('/reset_password')
//         .send(info)

//         .end((err, response) => {
//             expect(response.should.have.status(302));
//             expect(response).to.redirectTo("/reset_password")
//             done();
//         });
//     });

//     it('invalid user input', (done) => {
//         let info = {
//             inputUserID: "rat",
//             resetPass: "rat",
//             resetConfirmPass: "rat", 
//         }
        
//         authenticatedUser
//         .post('/reset_password')
//         .send(info)

//         .end((err, response) => {
//             expect(response.should.have.status(302));
//             expect(response).to.redirectTo("/reset_password")
//             done();
//         });
//     });
// });

// describe('POST /create_profile', function(done){
//     it('valid user input - primary and secondary addresses', (done) => {
//         let info = {
//             fullName: "Rat Rat", 
//             addressOne: "123 Rat St. Houston, TX", 
//             cityOne: "Houston", 
//             stateOne: "TX", 
//             zipCodeOne: "77777",
//             addressTwo: "123 Rat St. Houston, TX",
//             cityTwo: "Houston",
//             stateTwo: "TX",
//             zipCodeTwo: "77777",
//         }

//         authenticatedUser
//         .post('/create_profile')
//         .send(info)

//         .end((err, response) => {
//             expect(response.should.have.status(302));
//             expect(response).to.redirectTo("/dashboard")
//             done();
//         });
//     });

//     it('valid user input - np secondary address', (done) => {
//         let info = {
//             fullName: "Rat Rat", 
//             addressOne: "123 Rat St. Houston, TX", 
//             cityOne: "Houston", 
//             stateOne: "TX", 
//             zipCodeOne: "77777",
//             addressTwo: "",
//             cityTwo: "",
//             stateTwo: "null",
//             zipCodeTwo: "",
//         }

//         authenticatedUser
//         .post('/create_profile')
//         .send(info)

//         .end((err, response) => {
//             expect(response.should.have.status(302));
//             expect(response).to.redirectTo("/dashboard")
//             done();
//         });
//     });

//     it('invalid user input', (done) => {
//         let info = {
//             fullName: "Rat Rat", 
//             addressOne: "", 
//             cityOne: "", 
//             stateOne: "TX", 
//             zipCodeOne: "",
//             addressTwo: "",
//             cityTwo: "",
//             stateTwo: "TX",
//             zipCodeTwo: "77777",
//         }
    
//         authenticatedUser
//         .post('/create_profile')
//         .send(info)

//         .end((err, response) => {
//             expect(response.should.have.status(302));
//             expect(response).to.redirectTo("/create_profile")
//             done();
//         });
//     });

//     it('invalid user input', (done) => {
//         let info = {
//             fullName: "Rat Rat", 
//             addressOne: "123 Rat St. Houston, TX", 
//             cityOne: "Houston", 
//             stateOne: "TX", 
//             zipCodeOne: "7777",
//             addressTwo: "123 Rat St. Houston, TX",
//             cityTwo: "Houston",
//             stateTwo: "TX",
//             zipCodeTwo: "7777",
//         }
        
//         authenticatedUser
//         .post('/create_profile')
//         .send(info)

//         .end((err, response) => {
//             expect(response.should.have.status(302));
//             expect(response).to.redirectTo("/create_profile")
//             done();
//         });
//     });
// });
