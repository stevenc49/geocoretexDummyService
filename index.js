var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.get('/', function(req, res){
  res.sendFile('index.html', { root: __dirname });
});

//////////////////////////////////////
//     geocortex mock workflows
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
    socket.emit('connected', 'you are now connected to the socket.io server');
});

//////////////////////////////////////
//     timer
//////////////////////////////////////
function checkAllWorkflows() {
    var sleepTime = 1000;

    var url = "http://localhost:8888/monitorServices/pingUrl?url=http://www.google.ca";
    console.log("Calling " + url);
    
    require('http').get(url, function(res) { 
      
      res.on('data', function (chunk) {
        console.log('Response: ' + chunk);

        io.sockets.emit('broadcast', 'express1:' + chunk.toString());
      });
      
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
    
    setTimeout(function () { checkAllWorkflows() }, sleepTime);
}

checkAllWorkflows();