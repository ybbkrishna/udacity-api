var https = require('https');
var box = require('bx');

var cache = new box();

/**
* Update an object with new keys/values from another object
*
* @param {object} defaults
* @param {object} options
*/
exports.extend = function(defaults, options) {
    var obj = defaults || {};
    if (options && typeof options === 'object') {
        var keys = Object.keys(options);
        for (var i = 0, len = keys.length; i < len; i++) {
            var k = keys[i];
            if (options[k] !== undefined) {
                obj[k] = options[k];
            }
        }
    }
    return obj;
};

exports.clear = function() {
    cache.del('data');
};

/**
* Generic function for getting and filtering a JSON response from a URL
*
* @param {object} options HTTP configuration
* @param {function} filter Function to filter data
* @param {function} cb Callback function to handle response
*/
exports.get = function(options, filter, cb) {
    var d = cache.get('data');
    if (d) {
        filter === undefined ? cb(undefined, d) : cb(undefined, filter(d));
    } else {
        var req = https.request(options, function(res) {
            var body = '';

            res.on('data', function(d) {
                body += d;
            });

            res.on('end', function() {
                var data = JSON.parse(body);

                switch(res.statusCode) {
                    case 404:
                        cb(new Error('404 page not found'));
                        break;
                    case 500:
                        cb(new Error('500 server error'));
                        break;
                    default:
                        cache.put('data', data, 60000);
                        filter === undefined ? cb(undefined, data) : cb(undefined, filter(data));
                }
            });
        });

        req.end();
        req.on('error', function(err) {
            cb(err);
        });
    }
};
