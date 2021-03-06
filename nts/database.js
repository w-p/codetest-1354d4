

const _ = require('lodash');
const uuid = require('node-uuid');


var nts = require('.');
nts.database = {};

(function () {

    var database = null;

    this.model_factory = function (fields, data_dict) {
        var result = {};
        for (field of fields) {
            result[field] = data_dict[field] || null;
        }
        result.id = uuid.v4();
        return result;
    }

    this.DB = function () {
        var datastore = {};

        this.all = function () {
            return _.map(datastore, function (v) {
                return v;
            });
        };

        this.find = function (query_dict) {
            return _.filter(this.all(), query_dict);
        };

        this.get = function (id) {
            return datastore[id];
        };

        this.put = function (data) {
            datastore[data.id] = data;
        };

        this.delete = function (id) {
            delete datastore[id];
        };
    };

    this.open = function () {
        if (!database) {
            database = new nts.database.DB();
        }
        return database;
    };

}).apply( nts.database );
