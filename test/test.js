var fs = require('fs');
var http = require('http');
var path = require('path');
var request = require('supertest');
var streamRes = require('..')

var app = http.createServer(function(req, res){
    function error(err) {
        res.statusCode = 500;
        res.end(err.code);
    }

    var filename = path.join(__dirname, 'fixtures', req.url);
    var file = fs.createReadStream(filename);

    streamRes(res, file, function(err) {
        if (err) error(err);
    });
});

describe('stream-res', function() {

    it('should stream file', function(done) {
        request(app)
        .get('/test.txt')
        .expect(200, 'Hello World', done)
    });

    it('should stream error message', function(done) {
        request(app)
        .get('/test2.txt')
        .expect(500, 'ENOENT', done)
    });
});

