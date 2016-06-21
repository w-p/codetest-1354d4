

var chai = require('chai');
var assert = chai.assert;
chai.use(require('chai-http'));
var fixtures = require('./fixtures.js');


var app = require('../app.js');
var config = require('../config.js');
var backend = require('../backend');
var endpoints = backend.endpoints;

describe('backend.endpoints', function () {

    var url = `http://${ config.host }:${ config.port }`
    var user_id = null;

    describe(`${ url }/login`, function () {
        it(
            'logs a user in with email and password',
            function (done) {
                chai.request(url)
                    .put(endpoints.users.put.path)
                    .send(fixtures.user_data)
                    .end(function (err, res) {
                        chai.request(url)
                            .post(endpoints.login.post.path)
                            .send({
                                email: fixtures.user_data.email,
                                password: fixtures.user_data.password
                            })
                            .end(function (err, res) {
                                assert(!err, JSON.stringify(res.error));
                                var status = res.status;
                                var payload = res.text;
                                assert(status === 200, `status: ${ status } != 200`);
                                assert(payload.length === 36);
                                done();
                            });
                    });
            }
        )
    });

    describe(`${ url }/users`, function () {
        it(
            'creates (put) a user',
            function (done) {
                chai.request(url)
                    .put(endpoints.users.put.path)
                    .send(fixtures.user_data)
                    .end(function (err, res) {
                        assert(!err, JSON.stringify(res.error));
                        var status = res.status;
                        var payload = res.text;
                        assert(status === 200, `status: ${ status } != 200`);

                        user_id = payload;
                        assert(user_id.length == 36, `uuid: got ${ user_id }`);
                        done();
                    });
            }
        );
        it(
            'retrieves (get) as user by id',
            function (done) {
                chai.request(url)
                    .get(endpoints.users.get.path.split(':')[0] + user_id)
                    .end(function (err, res) {
                        assert(!err, JSON.stringify(res.error));
                        var status = res.status;
                        var payload = res.text;
                        var data = fixtures.user_data;
                        assert(status === 200, `status: ${ status } != 200`);

                        var user = JSON.parse(payload);
                        assert(user.id === user_id, `id: ${ user.id } != ${ user_id }`);
                        assert(user.name === data.name, `name: ${ user.name } === ${ data.name }`);
                        assert(user.bad === undefined, `unexpected data: user[bad] == ${ user.bad }`);
                        done();
                    });
            }
        );
        it(
            'deletes (delete) a user by id',
            function (done) {
                chai.request(url)
                    .delete(endpoints.users.delete.path.split(':')[0] + user_id)
                    .end(function (err, res) {
                        assert(!err, JSON.stringify(res.error));
                        var status = res.status;
                        var payload = res.text;
                        assert(status === 200, `status: ${ status } != 200`);
                        assert(payload === 'ok', `response: ${ payload } != 'ok'`);

                        chai.request(url)
                            .get(endpoints.users.get.path.split(':')[0] + user_id)
                            .end(function (err, res) {
                                assert(!err, JSON.stringify(res.error));
                                var status = res.status;
                                var payload = res.text;
                                assert(status === 200, `status: ${ status } != 200`);
                                assert(payload.length === 0, `response: ${ res.payload } should be empty`);
                                done();
                            });
                    });
            }
        )
    });

    describe(`${ url }/tasks`, function () {
        it(
            'creates (put) a task',
            function (done) {
                chai.request(url)
                    .put(endpoints.tasks.put.path)
                    .send(fixtures.task_data)
                    .end(function (err, res) {
                        assert(!err, JSON.stringify(res.error));
                        var status = res.status;
                        var payload = res.text;
                        assert(status === 200, `status: ${ status } != 200`);

                        task_id = payload;
                        assert(task_id.length == 36, `uuid: got ${ task_id }`);
                        done();
                    });
            }
        );
        it(
            'retrieves (get) as task by id',
            function (done) {
                chai.request(url)
                    .get(endpoints.tasks.get.path.split(':')[0] + task_id)
                    .end(function (err, res) {
                        assert(!err, JSON.stringify(res.error));
                        var status = res.status;
                        var payload = res.text;
                        var data = fixtures.task_data;
                        assert(status === 200, `status: ${ status } != 200`);

                        var task = JSON.parse(payload);
                        assert(task.id === task_id, `id: ${ task.id } != ${ task_id }`);
                        assert(task.name === data.name, `name: ${ task.name } === ${ data.name }`);
                        assert(task.bad === undefined, `unexpected data: task[bad] == ${ task.bad }`);
                        done();
                    });
            }
        );
        it(
            'deletes (delete) a task by id',
            function (done) {
                chai.request(url)
                    .delete(endpoints.tasks.delete.path.split(':')[0] + task_id)
                    .end(function (err, res) {
                        assert(!err, JSON.stringify(res.error));
                        var status = res.status;
                        var payload = res.text;
                        assert(status === 200, `status: ${ status } != 200`);
                        assert(payload === 'ok', `response: ${ payload } != 'ok'`);

                        chai.request(url)
                            .get(endpoints.tasks.get.path.split(':')[0] + task_id)
                            .end(function (err, res) {
                                assert(!err, JSON.stringify(res.error));
                                var status = res.status;
                                var payload = res.text;
                                assert(status === 200, `status: ${ status } != 200`);
                                assert(payload.length === 0, `response: ${ res.payload } should be empty`);
                                done();
                            });
                    });
            }
        )
    });

});
