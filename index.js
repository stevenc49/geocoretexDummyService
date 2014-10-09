var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile('index.html', { root: __dirname });
});

//////////////////////////////////////
//     mock geocortex workflows
//////////////////////////////////////

app.get('/workflows/error.json', function(req, res){
  res.sendFile('/workflows/error.json', { root: __dirname });
});

app.get('/workflows/wferror.json', function(req, res){
  res.sendFile('/workflows/wferror.json', { root: __dirname });
});

app.get('/workflows/good.json', function(req, res){
  res.sendFile('/workflows/good.json', { root: __dirname });
});

//////////////////////////////////////
//     socket.io
//////////////////////////////////////
io.on('connection', function(socket){
    console.log('a connection was established');
    socket.emit('update', 'express1:OK');
});


app.get('/socketsend', function(req, res){
  res.sendFile('/workflows/good.json', { root: __dirname });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});