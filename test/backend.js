

process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;


var backend = require('../backend');

describe('backend', function () {

    it(
        'It imports the models and endpoints namespace',
        function (done) {
            expect(backend.models).not.to.be.undefined;
            expect(backend.endpoints).not.to.be.undefined;
            done();
        }
    );

    it(
        'It has a bunyan logger',
        function (done) {
            expect(backend.log.info).not.to.be.undefined;
            done();
        }
    );

});
