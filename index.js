var fs = require('fs');
var onFinished = require('finished');
var destroy = require('destroy');

function streamRes(res, file, callback) {
    var finished = false;

    function onResFinished(err) {
        finished = true;
        destroy(file);
    }

    function onError(err) {
        // Request already finished
        if (finished) return;

        // Clean up stream
        finished = true;
        destroy(file);

        callback(err);
    }

    function onEnd() {
        callback();
    }

    // Pipe the file to the HTTP reponse
    function onOpen() {
        file.pipe(res);

        onFinished(res, onResFinished);
    }

    // Listen on error/end
    file.on('error', onError);
    file.on('end', onEnd);

    if (file instanceof fs.ReadStream) {
        if (file.fd) onOpen();
        else file.once('open', onOpen);
    } else {
        onOpen();
    }
}

module.exports = streamRes;
