

var backend = require('.');
backend.endpoints = {};

(function () {

    this.login = {
        post: {
            path: '/login',
            handler: function (req, res) {
                var auth = req.body;
                var user = req.db.find({email: auth.email});
                if (!user) {
                    res.status(404)
                        .send('The requested account does not exist.');
                }
                if (user.password !== auth.password) {
                    res.status(401)
                        .send('Authentication failed, incorrect password.');
                }
                res.send(user.id);
            }
        }
    };

    this.users = {
        get: {
            path: '/users/:id',
            handler: function (req, res) {
                var user = req.db.get(req.params.id);
                res.send(JSON.stringify(user));
            }
        },
        put: {
            path: '/users',
            handler: function (req, res) {
                var user = new backend.models.User(req.body);
                req.db.put(user);
                res.send(user.id);
            }
        },
        delete: {
            path: '/users/:id',
            handler: function (req, res) {
                req.db.delete(req.params.id);
                res.send('ok');
            }
        }
    };

    this.tasks = {
        get: {
            path: '/tasks/:id',
            handler: function (req, res) {
                var task = req.db.get(req.params.id);
                res.send(JSON.stringify(task));
            }
        },
        put: {
            path: '/tasks',
            handler: function (req, res) {
                var task = new backend.models.Task(req.body);
                req.db.put(task);
                res.send(task.id);
            }
        },
        delete: {
            path: '/tasks/:id',
            handler: function (req, res) {
                req.db.delete(req.params.id);
                res.send('ok');
            }
        }
    };

}).apply( backend.endpoints );
