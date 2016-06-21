

process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;


var fixtures = require('./fixtures.js');
var nts = require('../nts');
var backend = require('../backend');

describe('backend.models', function () {

    var user_id = undefined;

    describe('backend.models.user', function () {
        it(
            'It creates an object from the user model',
            function (done) {
                var user_data = fixtures.user_data;
                var user = new backend.models.User(user_data);
                expect(user.id).not.to.be.undefined;

                for (key of Object.keys(user)) {
                    if (key !== 'id' && key !== 'type') {
                        expect(user[key]).to.equal(user_data[key]);
                    }
                }
                expect(user['bad']).to.be.undefined;
                done();
            }
        )
    });

    describe('backend.models.task', function () {
        it(
            'It creates an object from the task model',
            function (done) {
                var task_data = fixtures.task_data;
                task_data.owner = user_id;
                var task = new backend.models.Task(task_data);
                expect(task.id).not.to.be.undefined;

                for (key of Object.keys(task)) {
                    if (key !== 'id' && key !== 'type' && key !== 'owner') {
                        expect(task[key]).to.equal(task_data[key])
                    }
                }
                expect(task['bad']).to.be.undefined;
                done();
            }
        )
    });
});
