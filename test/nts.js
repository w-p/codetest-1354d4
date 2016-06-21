

var chai = require('chai');
var assert = chai.assert;


var nts = require('../nts');

describe('nts', function () {
    describe('module index', function () {
        it(
            'imports the server and database namespace',
            function (done) {
                assert(nts.server !== undefined);
                assert(nts.database !== undefined);
                done();
            }
        );
        it(
            'has a bunyan logger',
            function (done) {
                assert(nts.log.info !== undefined);
                done();
            }
        );
    });
});
