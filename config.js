
var testing = process.env.NODE_ENV === 'test';

var config = module.exports = {
    host: '0.0.0.0',
    port: 8000,
    site_root: './frontend',
    load_fake_data: true,
    log_dir: '.',
    log_level: testing ? 'debug' : 'info'
};
