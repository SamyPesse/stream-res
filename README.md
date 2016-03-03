# stream-res [![Build Status](https://travis-ci.org/SamyPesse/stream-res.svg?branch=master)](https://travis-ci.org/SamyPesse/stream-res)

> Pipe a stream to an HTTP response

### Installation

```
$ npm i stream-res --save
```

### Usage

```js
var fs = require('fs');
var streamRes = require('stream-res');

app.get('/', function(req, res, next) {
    var stream = fs.createReadStream('./test.html');

    streamRes(res, stream, function(err) {
        if (err) next(err);
        else {
            console.log('file test.html has been piped to client');
        }
    });
});
```
