

process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;


var fixtures = require('./fixtures.js');
var nts = require('../nts');

describe('nts.database', function () {

    var db = new nts.database.DB();
    var result = undefined;

    it(
        'It creates a factory object from fixture data',
        function (done) {
            var fields = fixtures.database_fields;
            var data = fixtures.database_data;

            expect(result).to.be.undefined;
            result = nts.database.model_factory(fields, data);
            expect(result).not.to.be.undefined;

            for (field of fields) {
                expect(result[field]).to.equal(data[field]);
            }
            expect(result['bah']).to.be.undefined;
            done();
        }
    );

    it(
        'It stores a factory object, then retrieves and deletes it by id',
        function (done) {
            var fields = fixtures.database_fields;
            var data = fixtures.database_data;
            expect(db).not.to.be.undefined;
            expect(result).not.to.be.undefined;

            db.put(result);
            var db_results = db.all();
            expect(db_results.length).to.equal(1);

            var db_result = db.find({foo: data.foo});
            expect(db_result).not.to.be.undefined;

            db_result = undefined;
            var db_result = db.get(result.id);
            expect(db_result.id).to.equal(result.id);

            for (field of fields) {
                expect(db_result[field]).to.equal(result[field]);
            }

            db.delete(result.id);
            db_result = db.get(result.id);
            expect(db_result).to.be.undefined;
            done();
        }
);

});
