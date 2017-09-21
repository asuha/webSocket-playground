const serverPort = 8080,
  filePath = `${__dirname}/FileToBeTransfered.txt`;

var WebSocketServer = require('websocket').server;

var http = require('http'),
  fs = require('fs');

var fileBuffer = null;

fs.readFile(filePath, (err, result) => {
  fileBuffer = result;
});

//create http server
var server = http.createServer(function(request, response) {});

//starts http server in port 8080
server.listen(serverPort, function() {
  console.log(`Listening on port ${serverPort}`);
});

//Creates Web Socket layer
var wsServer = new WebSocketServer({
  httpServer: server
});

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
  console.log(`Connection from origin ${request.origin}.`);

  var connection = request.accept(null, request.origin);

  console.log('Connection accepted.');

  //callback called when a message is received
  connection.on('message', function(message) {
    connection.sendBytes(fileBuffer);

    console.log('File sent');
  });

  //callback called when connection is closed
  connection.on('close', function() {
    //Execute something before closing the web socket
  });

});
