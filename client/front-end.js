$(function() {
  const serverPort = 8080;

  // if user is running mozilla then use it's built-in WebSocket
  window.WebSocket = window.WebSocket || window.MozWebSocket;

  var socket = new WebSocket(`ws://127.0.0.1:${serverPort}`);

  socket.binaryType = 'arraybuffer';

  socket.onopen = function() {
    // socket is opened and ready to use
  };

  socket.onerror = function(error) {
    // an error occurred when sending/receiving data
  };

  // handle incoming message
  socket.onmessage = function(message) {
    //add the file content to text area
    addContent(message.data);
  };

  var button = $('#button'),
    content = $('#fileContent');

  // when request button is clicked sends message through websocket
  button.on('click', event => {
    content.text('');
    socket.send('send_my_precious');
  });

  function addContent(fileFrame) {
    let textDecoder = new TextDecoder(),
      decodedText = textDecoder.decode(fileFrame);

    //If the file is sent in two pieces it is already prepared
    content.text(content.text() + decodedText);
  }
});
