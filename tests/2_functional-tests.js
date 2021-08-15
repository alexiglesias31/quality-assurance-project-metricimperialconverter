const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    // Functional test
    test('Convert valid input', function(done){
        chai
            .request(server)
            .get('/api/convert?input=1gal')
            .end(function(err,res) {
                const data = JSON.parse(res.text)
                assert.equal(res.status, 200)
                assert.equal(data.initNum, '1')
                assert.equal(data.initUnit, 'gal')
                assert.equal(data.returnNum, '3.78541')
                assert.equal(data.returnUnit, 'L')
                assert.equal(data.string, '1 gallons to 3.78541 liters')
                done()
            })
    })
    test('Convert invalid input', function(done){
        chai
            .request(server)
            .get('/api/convert?input=10liters')
            .end((err,res) => {
                assert.equal(res.status, 200)
                assert.equal(res.text, 'invalid unit')
                done()
            })
    })
    test('Convert invalid number', function(done){
        chai
            .request(server)
            .get('/api/convert?input=3/2/3kg')
            .end((err,res) => {
                assert.equal(res.status, 200)
                assert.equal(res.text, 'invalid number')
                done()
            })
    })
    test('Convert invalid unit and number', function(done){
        chai
            .request(server)
            .get('/api/convert?input=3/4/2kilogram')
            .end((err,res) => {
                assert.equal(res.status, 200)
                assert.equal(res.text, 'invalid number and unit')
                done()
            })
    })
    test('Convert with no number', function(done){
        chai
            .request(server)
            .get('/api/convert?input=gal')
            .end((err,res) => {
                const data = JSON.parse(res.text)
                assert.equal(res.status, 200)
                assert.equal(data.initNum, '1')
                assert.equal(data.initUnit, 'gal')
                assert.equal(data.returnNum, '3.78541')
                assert.equal(data.returnUnit, 'L')
                assert.equal(data.string, '1 gallons to 3.78541 liters')
                done()
            })
    })
});
