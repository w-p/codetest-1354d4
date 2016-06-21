

var nts = require('./nts');
var backend = require('./backend');
var config = require('./config.js');

console.log('node env is:     ', process.env.NODE_ENV);
console.log('logging level is:', config.log_level);

nts.log.level(config.log_level);
backend.log.level(config.log_level);

var app = module.exports = nts.server;
app.register_endpoint(backend.endpoints.login);
app.register_endpoint(backend.endpoints.logout);
app.register_endpoint(backend.endpoints.tasks);
app.register_endpoint(backend.endpoints.users);
app.start(config.host, config.port, config.site_root);
