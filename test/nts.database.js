

var chai = require('chai');
var assert = chai.assert;
var fixtures = require('./fixtures.js');


var nts = require('../nts');

describe('nts.database', function () {

    var db = new nts.database.DB();
    var result = undefined;

    describe('.model_factory()', function () {
        it(
            'creates a factory object from <data> by extracting only <fields>',
            function (done) {
                var fields = fixtures.database_fields;
                var data = fixtures.database_data;
                assert(result === undefined);
                result = nts.database.model_factory(fields, data);
                assert(result !== undefined);

                for (field of fields) {
                    assert(result[field] === data[field]);
                }
                assert(result['bah'] === undefined);
                done();
            }
        );
    });

    describe('.DB()', function () {
        it(
            'stores a factory object, and retrieves and deletes that object by id',
            function (done) {
                var fields = fixtures.database_fields;
                var data = fixtures.database_data;
                assert(db !== undefined);
                assert(result !== undefined);

                db.put(result);
                var db_results = db.all();
                assert(db_results.length == 1);

                var db_result = db.find({foo: data.foo});
                assert(db_result !== undefined)
                db_result = undefined;

                var db_result = db.get(result.id);
                assert(db_result.id == result.id);
                for (field of fields) {
                    assert(db_result[field] === result[field]);
                }

                db.delete(result.id);
                db_result = db.get(result.id);
                assert(db_result === undefined);
                done();
            }
        );
    });
});
