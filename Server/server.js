//server.js
var app           = require('express')();
var http          = require('http').Server(app);
app.io            = require('socket.io')(http);
var bodyParser    = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./routes/routes-config')(app);


app.io.on('connection', function (socket){
   console.log('connection');

  socket.on('CH01', function (from, msg) {
    console.log('MSG', from, ' saying ', msg);
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});