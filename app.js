

const bunyan = require('bunyan');


var nts = require('./nts');
var backend = require('./backend');
var config = require('./config.js');

nts.log.level(config.log_level);
backend.log.level(config.log_level);

app = nts.server;
app.register_endpoint(backend.endpoints.login);
app.register_endpoint(backend.endpoints.tasks);
app.register_endpoint(backend.endpoints.users);
app.start(config.host, config.port, config.site_root);
