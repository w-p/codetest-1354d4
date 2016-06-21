

var app = {};

(function () {


}).apply( app );


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
                'Content-Type': 'application/json'
            }
            opts.body = JSON.stringify(payload);
        }
        return opts;
    }

    function make_fetch (method, url, payload, cb, err_cb) {
        fetch(url, get_options(method, payload))
            .then(function (res) {
                if (cb) {
                    console.log(res);
                    cb(res);
                }
            })
            .catch(function (err) {
                if (err_cb) {
                    err_cb(err)
                } else {
                    console.error('request failed:', err);
                }
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
