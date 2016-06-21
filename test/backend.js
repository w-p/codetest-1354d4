

var chai = require('chai');
var assert = chai.assert;


var backend = require('../backend');

describe('backend', function () {
    describe('module index', function () {
        it(
            'imports the models and endpoints namespace',
            function (done) {
                assert(backend.models !== undefined);
                assert(backend.endpoints !== undefined);
                done();
            }
        );
        it(
            'has a bunyan logger',
            function (done) {
                assert(backend.log.info !== undefined);
                done();
            }
        );
    });
});
