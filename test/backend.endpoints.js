

process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-http'));
var fixtures = require('./fixtures.js');


var app = require('../app.js');
var config = require('../config.js');
var backend = require('../backend');
var endpoints = backend.endpoints;


describe('backend.endpoints', function () {

    var url = `http://${ config.host }:${ config.port }`
    var user_id = null;
    var task_id = null;
    var login = {
        email: fixtures.user_data.email,
        password: fixtures.user_data.password
    };
    var agent = chai.request.agent(app.base_app);

    describe('Tests the lifecycle of a user and endpoints.', function () {

        it(
            'It creates a user',
            function () {
                return agent.put(endpoints.users.put.path)
                    .send(fixtures.user_data)
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        var ident = JSON.parse(res.text);
                        expect(ident.id.length).to.equal(36);
                        user_id = ident.id; // storing for later.
                    });
            }
        );

        it(
            'Then retrieves the user by id',
            function () {
                return agent.get(endpoints.users.get.path.split(':')[0] + user_id)
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        var user = JSON.parse(res.text);
                        expect(user.id).to.equal(user_id);
                        expect(user.name).to.equal(fixtures.user_data.name);
                        expect(user.bad).to.be.undefined;
                    });
            }
        );

        it (
            'Then retrieves all users',
            function () {
                return agent.get(endpoints.users.get.path.split(':')[0])
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        var users = JSON.parse(res.text);
                        expect(users.length).to.equal(1);
                    });
            }
        );

        it(
            'Then logs a user in, with email and password',
            function () {
                return agent.post(endpoints.login.post.path)
                    .send(login)
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        expect(res).to.have.cookie('id'); // stores cookie for future requests...
                        var auth = JSON.parse(res.text);
                        expect(auth.id).to.be.a('string');
                        expect(auth.id.length).to.equal(36);
                    })
            }
        );

        it(
            'It creates a task',
            function () {
                return agent.put(endpoints.tasks.put.path)
                    .send(fixtures.task_data)
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        var ident = JSON.parse(res.text);
                        expect(ident.id.length).to.equal(36);
                        task_id = ident.id; // storing for later
                    });
            }
        );

        it(
            'Then retrieves the task by id',
            function () {
                return agent.get(endpoints.tasks.get.path.split(':')[0] + task_id)
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        var task = JSON.parse(res.text);
                        expect(task.id).to.equal(task_id);
                        expect(task.name).to.equal(fixtures.task_data.name);
                        expect(task.bad).to.be.undefined;
                    });
            }
        );

        it (
            'Then retrieves all tasks',
            function () {
                return agent.get(endpoints.tasks.get.path.split(':')[0])
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        var tasks = JSON.parse(res.text);
                        expect(tasks.length).to.equal(1);
                    });
            }
        );

        it(
            'Then deletes the task by id',
            function () {
                return agent.delete(endpoints.tasks.delete.path.split(':')[0] + task_id)
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        expect(res.text).to.equal('ok');
                    });
            }
        );

        it(
            'It deletes the user by id',
            function () {
                return agent.delete(endpoints.users.delete.path.split(':')[0] + user_id)
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        expect(res.text).to.equal('ok');
                    });
            }
        );

        it(
            'Then logs the user out',
            function () {
                agent.post(endpoints.logout.post.path)
                    .then(function (res) {
                        expect(res).to.have.status(200);
                        expect(res).to.not.have.cookie('id');
                        expect(res.text).to.equal('ok');
                    });
            }
        );

    });
});
