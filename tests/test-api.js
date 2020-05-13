const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const app = require('../server');
const should = chai.should();
const expect = chai.expect;

describe('GET /api', () => {
	it('Should respond with a status of 200 when called', done => {
		chai
			.request('http://localhost:3000')
			.get('/api')
			.end((err, res) => {
				res.should.have.status(200)
				done();
			});
	});
});

