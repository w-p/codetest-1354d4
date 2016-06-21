

const bunyan = require('bunyan');


var nts = module.exports = {};

(function () {

    this.log = bunyan.createLogger({
        name: 'nts',
        streams: [{
            stream: process.stdout
        }]
    });

}).apply( nts );

require('./server.js');
require('./database.js');
