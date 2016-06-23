


log.setLevel('debug');
log.setDefaultLevel('debug');

var app = {};

(function () {
}).apply( app );


app.validators = {};

(function () {

    var defaults = {
        presence: {
            message: 'is a required field.'
        },
        email: {
            message: 'appears to be invalid.'
        },
        length: {
            password: {
                minimum: 1,
                maximum: 15,
            },
            name: {
                minimum: 1,
                maximum: 64
            },
            text: {
                minimum: 1,
                maximum: 256
            }
        }
    };

    this.login = {
        email: {
            presence: defaults.presence,
            email: defaults.email
        },
        password: {
            presence: defaults.presence,
            length: defaults.length.password
        }
    };

    this.user = {
        name: {
            presence: defaults.presence,
            length: defaults.length.name
        },
        email: {
            presence: defaults.presence,
            email: defaults.email
        },
        password: {
            presence: defaults.presence,
            length: defaults.length.password
        },
        description: {
            presence: defaults.presence,
            length: defaults.length.text
        }
    };

}).apply( app.validators );


app.io = {};

(function () {

    function get_options (method, payload) {
        var opts = {
            method: method,
            credentials: 'same-origin',
            headers: {}
        };
        if (payload) {
            opts.headers = {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
            opts.body = JSON.stringify(payload);
        }
        return opts;
    }

    function make_fetch (method, url, payload, cb, err_cb) {
        log.debug('[' + method + '] ' + url);
        log.debug(' > payload: ', payload);

        var status = null;
        var content_type = null;
        fetch(url, get_options(method, payload))
            .then(function (res) {
                status = res.status;
                content_type = res.headers.get('content-type');
                if (_.includes(content_type, 'application/json')) {
                    return res.json();
                } else {
                    return res.text();
                }
            })
            .then(function (data) {
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    // pass
                }
                log.debug(' < status:  ', status);
                log.debug(' < content: ', content_type);
                log.debug(' < response:', data);
                if (cb) cb(status, data);
            })
            .catch(function (err) {
                log.debug(' x error:', err);
                if (err_cb) err_cb(err);
            });
    }

    this.get = function (url, payload, cb, err_cb) {
        make_fetch('GET', url, payload, cb, err_cb);
    };

    this.put = function (url, payload, cb, err_cb) {
        make_fetch('PUT', url, payload, cb, err_cb);
    };

    this.post = function (url, payload, cb, err_cb) {
        make_fetch('POST', url, payload, cb, err_cb);
    };

    this.delete = function (url, payload, cb, err_cb) {
        make_fetch('DELETE', url, payload, cb, err_cb);
    };

}).apply( app.io );


app.evt = {};

(function () {

    this.sub = function (namespace, handler) {
        postal.subscribe({
            topic: namespace,
            callback: handler
        });
    };

    this.pub = function (namespace, data) {
        postal.publish({
            topic: namespace,
            data: data
        });
    };

}).apply( app.evt );


app.fx = {};

(function () {

    this.animate = function(element) {
        var easings = [
            'linear',
            'ease',
            'ease-in',
            'ease-out',
            'ease-in-out'
        ]
        var keyframes = [];
        var properties = {};
        var options = {
            duration: 500,
            fill: 'none',
            easing: 'ease-in-out'
        };
        var onfinish = function () {};

        function run() {
            element.animate(keyframes, options).onfinish = onfinish;
        }
        run.run = function () {
            if (properties !== {}) run.then();
            run();
        }
        run.to = function (attribute, value) {
            properties[attribute] = value;
            return run;
        }
        run.then = function () {
            keyframes.push(properties);
            properties = {};
            return run;
        }
        run.for = function (duration) {
            options.duration = duration;
            return run;
        }
        run.sticky = function () {
            options.fill = 'both';
            return run;
        }
        run.ease = function (easing) {
            options.easing = dynamics[easing] || dynamics.easeInOut;
            return run;
        }
        run.onfinish = function (callback) {
            onfinish = callback;
            return run;
        }
        return run;
    };

    this.fade_in = function (element, cb) {
        app.fx.animate(element)
            .for(250)
            .sticky()
            .onfinish(cb)
            .to('opacity', 0.0)
            .then()
            .to('opacity', 1.0)
            .run();
    };

    this.fade_out = function (element, cb) {
        app.fx.animate(element)
            .for(250)
            .sticky()
            .onfinish(cb)
            .to('opacity', 1.0)
            .then()
            .to('opacity', 0.0)
            .run();
    };

    this.shake = function (element, cb) {
        app.fx.animate(element)
            .for(75 * 3)
            .onfinish(cb)
            .to('transform', 'translateX(-10%)')
            .then()
            .to('transform', 'translateX(10%)')
            .then()
            .to('transform', 'translateX(-10%)')
            .then()
            .to('transform', 'translateX(10%)')
            .run();
    }

}).apply( app.fx );
