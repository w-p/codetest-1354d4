

const http = require('http');
const express = require('express');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');


var nts = require('.');
require('./database.js');
nts.server = {};

(function () {

    var _host = '0.0.0.0';
    var _port = 8888;
    var app = express();
    var server = http.createServer(app);
    var db = new nts.database.DB();
    var methods = [
        'get',
        'put',
        'post',
        'delete'
    ];

    this.base_app = app;
    app.use(cookieparser());
    app.use(bodyparser.json());
    app.use(function (req, res, next) {
        req.db = db;
        next();
    });
    app.use(function (req, res, next) {
        nts.log.debug(`[${ req.method }] ${ req.originalUrl }`)
        next();
    })

    this.register_endpoint = function (endpoint) {
        for (method of methods) {
            var resource = endpoint[method];
            if (resource) {
                var path = resource.path;
                var handler = resource.handler;
                app[method](path, handler);
                nts.log.info(`registered route: [${ method }] ${ path }`);
            }
        }
    };

    this.start = function (host, port, site_root) {
        if (host) _host = host;
        if (port) _port = port;
        app.use('/', express.static(site_root));
        server.listen(
            _port,
            _host,
            function () {
                nts.log.info(`started server on: ${ _host }:${ _port }`);
            }
        );
    };

}).apply( nts.server );
