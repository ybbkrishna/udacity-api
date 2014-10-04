var https = require('https');

var options = {
    hostname: 'www.udacity.com',
    path: '/api/session',
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    }
};

var _ = {
    udacity: {
        username: process.argv[2],
        password: process.argv[3]
    }
};

var req = https.request(options, function(res) {
    console.log('status: ', res.statusCode);
    console.log('headers: ', res.headers);

    res.on('data', function(d) {
        process.stdout.write(d);
    });
});

req.write(JSON.stringify(_));
req.end();

req.on('error', function(e) {
    console.error(e);
});
