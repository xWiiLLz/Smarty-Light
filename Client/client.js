//client.js
var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000', {reconnect: true});

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connecté!');
});

socket.emit('CH01', 'me', 'test msg');
socket.on('Data', function(red, green, blue){
    console.log("Received :     Red:" + red + "   Green:" + green + "    Blue:" + blue);
});