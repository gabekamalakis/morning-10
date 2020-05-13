const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const { server } = require('../server');
const should = chai.should();
const expect = chai.expect;

// There is an issue in these tests where I need the database running to actually return a 200 response
// This is not a database test and we have not been able to make these


describe('GET /api', () => {
	it('Should respond with a status of 404 when called since the database is not running', done => {
		chai
			.request(server)
			.get('/api')
			.end((err, res) => {
				res.should.have.status(404)
				done();
			});
	});
});

describe('GET /api datatest', () => {
	it('Should not respond with mapdata since database is off', done => {
		chai
			.request(server)
			.get('/api')
			.end((err, res) => {
				res.should.not.have.status(200)
				res.body.should.be.a('object');
				done();
			});
	});
});

describe('PUT /api ', () => {
	it('Should accept PUT request', done => {
		chai
			.request(server)
			.put('/api')
			.end((err, res) => {
				res.should.have.status(200);
				// expect(res.body).to.have.param("status", "Success");
				done();
			});
	});
});

