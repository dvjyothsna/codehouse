var http = require('http');
var path = require('path');
var express = require('express');
var app = express();



app.use(express.static(path.join(__dirname, 'public/dist')));

app.get('*', function(req, res, next) {
  res.sendFile(__dirname+"/public/dist/index.html");
})


var server = http.createServer(app);
var io = require('socket.io')(server);
io.on('connection', function (socket) {
    socket.emit('msg', { msg: 'Welcome!' });
    socket.on('message',function(points){
        socket.broadcast.emit('messageReturn', {points : points});
    });


});

server.listen(8988);
