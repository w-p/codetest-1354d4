
var sh = {};

(function () {

    this.get_form = function (id) {
        var container = document.querySelector(id);
        var controls = container.querySelectorAll('*');
        var data = {};
        _.chain(controls)
            .filter(function (control) {
                return control.id && control.value !== undefined;
            })
            .forEach(function(control) {
                data[control.id] = control.value;
            })
            .value();
        return data;
    };

    this.clear_form = function (id) {
        var container = document.querySelector(id);
        var controls = container.querySelectorAll('*');
        _.chain(controls)
            .filter(function (control) {
                return control.id && control.value;
            })
            .forEach(function(control) {
                control.value = null;
            })
            .value();
        if (container.tagName === 'FORM') container.reset();
    };

    this.post = function (url, data, on_success, on_fail) {
        var data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        fetch(url, data).then(on_success).catch(on_fail);
    };

    this.delete = function (url, data, on_success, on_fail) {
        var data = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        fetch(url, data).then(on_success).catch(on_fail);
    };

    this.show = function (selector, duration, data) {
        var target = document.querySelector(selector);
        _.forEach(data, function (v, k) {
            target.querySelector(k).innerHTML = v;
        })
        target.style.visibility = 'visible';
        dynamics.animate(
            target,
            {opacity: 1},
            {
                type: dynamics.easeIn,
                duration: duration || 250
            }
        );
    };

    this.hide = function (selector, duration) {
        var target = document.querySelector(selector);
        dynamics.animate(
            target,
            {opacity: 0},
            {
                type: dynamics.easeOut,
                duration: duration || 200,
                complete: function () {
                    target.style.visibility = 'hidden';
                }
            }
        );
    };

}).apply( sh );
