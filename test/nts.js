

process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;


var nts = require('../nts');

describe('nts', function () {

    it(
        'It imports the server and database namespace',
        function (done) {
            expect(nts.server).not.to.be.undefined;
            expect(nts.database).not.to.be.undefined;
            done();
        }
    );

    it(
        'It has a bunyan logger',
        function (done) {
            expect(nts.log.info).not.to.be.undefined;
            done();
        }
    );

});
