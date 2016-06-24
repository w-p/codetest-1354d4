

const _ = require('lodash');


var backend = require('.');
backend.endpoints = {};

(function () {

    this.login = {
        get: {
            path: '/login',
            handler: function (req, res) {
                if (req.cookies.id) {
                    if (req.db.get(req.params.id)) {
                        res.send('ok');
                        return;
                    }
                }
                res.status(401)
                    .send('This session has not yet logged in.');
            }
        },
        post: {
            path: '/login',
            handler: function (req, res) {
                var auth = req.body;
                var user = req.db.find({email: auth.email});
                if (user.length > 1) {
                    res.status(500)
                        .send('More than one account has the same unique identifier.')
                }
                user = user[0];
                if (!user) {
                    res.status(404)
                        .send('The requested account does not exist.');
                    return;
                }
                if (user.password !== auth.password) {
                    res.status(401)
                        .send('Authentication failed, incorrect password.');
                    return;
                }
                res.cookie('id', user.id);
                res.send(JSON.stringify({id: user.id}));
            }
        }
    };

    this.logout = {
        post: {
            path: '/logout',
            handler: function (req, res) {
                if (req.cookies.id) {
                    res.clearCookie('id');
                }
                res.send('ok');
            }
        }
    };

    this.users = {
        get: {
            path: '/users/:id?',
            handler: function (req, res) {
                if (!req.params.id) {
                    var users = req.db.find({type: 'user'});
                    users = _.map(users, function (v) {
                        return {id: v.id, name: v.name};
                    });
                    res.send(JSON.stringify(users));
                    return;
                }
                var user = req.db.get(req.params.id);
                if (!user) {
                    res.status(404)
                        .send('Unable to find the specified account.');
                    return;
                }
                res.send(JSON.stringify(
                    {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        description: user.description
                    }
                ));
            }
        },
        put: {
            path: '/users',
            handler: function (req, res) {
                var data = req.body;
                var user = req.db.find({email: data.email});
                if (user.length > 0) {
                    if (user.length > 1) {
                        res.status(500)
                            .send('More than one user has the same unique identifier.');
                        return;
                    }
                    user = user[0];
                    if (user.name === data.name) {
                        res.status(400)
                            .send('An account with that name already exists.');
                        return;
                    }
                    if (user.email === data.email) {
                        res.status(400)
                            .send('An account with that e-mail already exists.');
                        return;
                    }
                }
                user = new backend.models.User(data);
                req.db.put(user);
                res.send(JSON.stringify(
                    {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        description: user.description
                    }
                ));
            }
        },
        post: {
            path: '/users/:id',
            handler: function (req, res) {
                if (req.cookies.id !== req.params.id) {
                    res.status(401)
                        .send('An account may only be updated by its owner.');
                    return;
                }
                var user = req.db.get(req.params.id);
                var data = req.body;
                _.forEach(user, function(v, key) {
                    if (key !== 'id') {
                        user[key] = data[key] || user[key];
                    }
                });
                req.db.put(user);
                res.send(JSON.stringify(
                    {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        description: user.description
                    }
                ));
            }
        },
        delete: {
            path: '/users/:id',
            handler: function (req, res) {
                if (req.cookies.id !== req.params.id) {
                    res.status(401)
                        .send('An account may only be deleted by its owner.');
                    return;
                }
                req.db.delete(req.params.id);
                res.send('ok');
            }
        }
    };

    this.tasks = {
        get: {
            path: '/tasks/:id?',
            handler: function (req, res) {
                if (!req.params.id) {
                    var tasks = req.db.find({type: 'task'});
                    tasks = _.map(tasks, function (v) {
                        return {id: v.id, name: v.name};
                    });
                    res.send(JSON.stringify(tasks));
                    return;
                }
                var task = req.db.get(req.params.id);
                var user = req.db.get(req.cookies.id);
                if (!task) {
                    res.status(404)
                        .send('Unable to find the specified task.');
                    return;
                }
                if (task.owner !== user.id && task.visibility !== 'public') {
                    res.status(401)
                        .res('The requested task is not public.')
                    return;
                }
                res.send(JSON.stringify(task));
            }
        },
        put: {
            path: '/tasks',
            handler: function (req, res) {
                var data = req.body;
                var task = req.db.find({name: data.name});
                if (task.length > 0) {
                    if (task.length > 1) {
                        res.status(500)
                            .send('More than one task has the same unique identifier.');
                        return;
                    }
                    task = task[0];
                    res.status(400)
                        .send('A task with that name already exists.');
                    return;
                }
                var task = new backend.models.Task(data);
                task.owner = req.cookies.id;
                req.db.put(task);
                res.send(JSON.stringify(task));
            }
        },
        post: {
            path: '/tasks/:id',
            handler: function (req, res) {
                var task = req.db.get(req.params.id);
                if (task.owner !== req.cookies.id && task.visibility !== 'public') {
                    res.status(401)
                        .send('A non-public task may only be updated by its owner.');
                    return;
                }
                var data = res.body;
                _.forEach(task, function (v, key) {
                    if (key !== 'id') {
                        task[key] = data[key] || task[key];
                    }
                });
                req.db.put(task);
                res.send(JSON.stringify(task));
            }
        },
        delete: {
            path: '/tasks/:id',
            handler: function (req, res) {
                var task = req.db.get(req.params.id);
                if (task.owner !== req.cookies.id) {
                    res.status(401)
                        .send('A non-public task may only be deleted by its owner.');
                    return;
                }
                req.db.delete(req.params.id);
                res.send('ok');
            }
        }
    };

}).apply( backend.endpoints );
