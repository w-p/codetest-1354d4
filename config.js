

var testing = process.env.NODE_ENV !== 'test'

var config = module.exports = {
    host: '0.0.0.0',
    port: 8000,
    log_dir: '.',
    log_level: testing ? 'debug' : 'fatal',
    site_root: './frontend'
};
