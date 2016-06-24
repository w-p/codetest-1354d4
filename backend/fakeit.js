

const _ = require('lodash');



const nts = require('../nts');
var backend = require('.');
backend.fakeit = {};

(function () {

    var db = nts.database.open();
    var ids = [];
    var users = [
        {name: 'Dan', email: 'dan@kvp.io', password: 'password', description: 'Code Monkey'},
        {name: 'John', email: 'john@kvp.io', password: 'password', description: 'Systems Guy'},
        {name: 'Brad', email: 'Brad@kvp.io', password: 'password', description: 'Front Office'},
        {name: 'Jane', email: 'jane@kvp.io', password: 'password', description: 'Business Development'}
    ];
    var tasks = [
        {name: 'Write UI Components', owner: '', status: 'open', priority: 10, visibility: 'public', description: 'Implement bad ass Polymer elements.'},
        {name: 'Write Tests', owner: '', status: 'open', priority: 5, visibility: 'public', description: 'Figure out how to write Polymer tests.'},
        {name: 'Write UI Documentation', owner: '', status: 'open', priority: 5, visibility: 'public', description: 'Write docstrings for all the Polymer elements, and app.js'}
    ];

    this.load_users = function () {
        _.forEach(users, function (v) {
            var user = new backend.models.User(v);
            if (!_.includes(ids, user.id)) {
                ids.push(user.id);
            }
            db.put(user);
        });
    };
    this.load_tasks = function () {
        _.forEach(tasks, function (v) {
            var id = ids[Math.floor(Math.random() * ids.length)];
            v.owner = id;
            db.put(new backend.models.Task(v));
        })
    }

}).apply( backend.fakeit );
