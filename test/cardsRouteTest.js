process.env.NODE_ENV = 'test';
const assert = require('chai').assert;
const app = require("../cardsRoute.js");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('/GET card', () => {
    it('it should GET the latest 24 cards', (done) => {
        chai.request('http://localhost:5000/cards')
            .get('/home')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.below(25);
                done();
            });
    });
});

//the function relating to the below test requires a parameter passed through in the body of the request.
//Haven't worked that out yet and so this test will fail.
describe('/GET card', () => {
    it('it should GET all cards for parameter rempno', (done) => {
        chai.request('http://localhost:5000/cards')
            .get('/user')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.rempno.should.be.eql(req.body.rempno);
                done();
            });
    });
});
