var get = require('./utils').get;

/**
* Create a new Catalog.
*/
var Catalog = function() {
    this.version = 'v0';
    this.info = {
        hostname: 'www.udacity.com',
        path: '/public-api/v0/courses',
        method: 'GET'
    };
};

/**
* Get all catalog data.
*
* @param {function} cb Callback function to handle response
*/
Catalog.prototype.all = function(cb) {
    get(this.info, undefined, function(err, data) {
        if (err) {
            cb(err);
        } else {
            data === undefined ? cb(new Error('catalog not found')) : cb(undefined, data);
        }
    });
};

/**
* Get custom catalog data.
*
* @param {function} filter Function to filter data
* @param {function} cb Callback function to handle response
*/
Catalog.prototype.get = function(filter, cb) {
    get(this.info, filter, function(err, data) {
        if (err) {
            cb(err);
        } else {
            data === undefined ? cb(new Error('data not found')) : cb(undefined, data);
        }
    });
};

/**
* Get all course data.
*
* @param {function} cb Callback function to handle response
*/
Catalog.prototype.courses = function(cb) {
    get(this.info, function(obj) {
        return obj.courses;
    }, function(err, data) {
       if (err) {
            cb(err);   
        } else {
            data === undefined ? cb(new Error('courses not found')) : cb(undefined, data);
        }
    });
};

/**
* Get data for a specific course.
*
* @param {string} id Course key
* @param {function} cb Callback function to handle response
*/
Catalog.prototype.course = function(id, cb) {
    get(this.info, function(obj) {
        var courses = obj.courses;
        return courses.filter(function(el) {
            return el.key === id;
        });
    }, function(err, data) {
        if (err) {
            cb(err);   
        } else {
            data[0] === undefined ? cb(new Error('course "' + id + '" not found')) : cb(undefined, data[0]);
        }
    });
};

/**
* Get all track data.
*
* @param {function} cb Callback function to handle response
*/
Catalog.prototype.tracks = function(cb) {
    get(this.info, function(obj) {
        return obj.tracks;
    }, function(err, data) {
        if (err) {
            cb(err);   
        } else {
            data === undefined ? cb(new Error('tracks not found')) : cb(undefined, data);
        }
    });
};

/**
* Get data for a specific track.
*
* @param {string} name Track name
* @param {function} cb Callback function to handle response
*/
Catalog.prototype.track = function(name, cb) {
    get(this.info, function(obj) {
        var tracks = obj.tracks;
        return tracks.filter(function(el) {
            return el.name === name;
        });
    }, function(err, data) {
        if (err) {
            cb(err);   
        } else {
            data[0] === undefined ? cb(new Error('track "' + name + '" not found')) : cb(undefined, data[0]);
        }
    });
};

/**
* Get the instructors from one course.
*
* @param {string} id Course key
* @param {function} cb Callback function to handle response
*/
Catalog.prototype.instructors = function(id, cb) {
    this.course(id, function(err, data) {
        if (err) {
            cb(err);   
        } else {
            data.instructors === undefined ? cb(new Error('course "' + id + '" instructors not found')) : cb(undefined, data.instructors); 
        }
    });
};

module.exports = Catalog;