

var chai = require('chai');
var assert = chai.assert;
var fixtures = require('./fixtures.js');


var nts = require('../nts');
var backend = require('../backend');

describe('backend.models', function () {
    describe('user model', function () {
        it(
            'creates an object from the user model',
            function (done) {
                var user_data = fixtures.user_data;
                var user = new backend.models.User(user_data);
                assert(
                    user.id !== undefined,
                    `user id is ${ user.id }, should be undefined`
                );

                for (key of Object.keys(user)) {
                    if (key !== 'id' && key !== 'type') {
                        assert(
                            user[key] === user_data[key],
                            `key ${ key }: ${ user[key] } != ${ user_data[key] }`
                        )
                    }
                }
                assert(
                    user['bad'] === undefined,
                    `user should not have ${ user['bad'] }`
                )
                done();
            }
        )
    });
    describe('task model', function () {
        it(
            'creates an object from the task model',
            function (done) {
                var task_data = fixtures.task_data;
                var task = new backend.models.Task(task_data);
                assert(
                    task.id !== undefined,
                    `task id is ${ task.id }, should be undefined`
                );

                for (key of Object.keys(task)) {
                    if (key !== 'id' && key !== 'type') {
                        assert(
                            task[key] === task_data[key],
                            `${ task[key] } != ${ task_data[key] }`
                        )
                    }
                }
                assert(
                    task['bad'] === undefined,
                    `task should not have ${ task['bad'] }`
                )
                done();
            }
        )
    });
});
