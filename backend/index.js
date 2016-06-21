

const bunyan = require('bunyan');


var backend = module.exports = {};

(function () {

    this.log = bunyan.createLogger({
        name: 'backend',
        streams: [{
            stream: process.stdout
        }]
    });

}).apply( backend );

require('./models.js');
require('./endpoints.js');
