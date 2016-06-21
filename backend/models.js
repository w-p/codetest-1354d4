

const nts = require('../nts');


var backend = require('.');
backend.models = {};

(function () {

    this.User = function (data_dict) {
        var fields = [
            'name',
            'email',
            'password',
            'description'
        ];
        var result = nts.database.model_factory(fields, data_dict);
        result.type = 'user';
        return result;
    };

    this.Task = function (data_dict) {
        var fields = [
            'name',
            'owner',
            'status',
            'priority',
            'visibility',
            'description'
        ];
        var result = nts.database.model_factory(fields, data_dict);
        result.type = 'task';
        return result;
    }

}).apply( backend.models );
