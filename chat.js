var express = require('express');
var socketIO = require('socket.io');
var exec = require('child_process').exec;

var app = express();
var server = app.listen(8080);
var io = socketIO.listen(server);

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

app.post('/image', function(req, res) {
  var url = req.body.url;

  var fileUrl = '/img/' + Date.now();
  var path = __dirname + '/public' + fileUrl;
  var cmd = "curl '" + url + "' | convert - -resize x50 " + path;

  exec(cmd, function(err) {
    if (err) throw err;

    io.sockets.emit('image', fileUrl);

    res.writeHead(204);
    res.end();
  });
});
