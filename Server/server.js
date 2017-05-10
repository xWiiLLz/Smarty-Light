//server.js
var app           = require('express')();
var http          = require('http').Server(app);
app.io            = require('socket.io')(http);
var bodyParser    = require('body-parser');
var findWithAttr  = require('./functions/misc_functions').findWithAttr;
var cors = require('cors');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: null}));
require('./routes/routes-config')(app);

var allSockets = [];
app.lightbulbs = [];
var uniqueID = 0;

//app.lightbulbs=lightbulbs;

app.io.on('connection', function (socket){
   console.log('connection', socket.id);
   allSockets.push(socket); //On ajoute l'ampoule qui se connecte à la liste
  
  // On assigne un ID à l'ampoule qui vient de se connecter
  
   var lightbulbID = generateID();   //On lui donne un id
   console.log('Added lightbulb with id:', socket.id);
   app.lightbulbs.push({id: lightbulbID,
                    socketID: socket.id,
                    red: 0,
                    green: 0,
                    blue: 0,
                    
  });

  // Event handler de déconnexion
  socket.on('disconnect', function(){
    console.log('Socket with id #', socket.id, ' disconnected');
    var i = allSockets.indexOf(socket);
    allSockets.splice(i, 1);

    var indexLightbulbs = findWithAttr(app.lightbulbs,'id',socket.id);
    app.lightbulbs.splice(indexLightbulbs,1);
  })
});


http.listen(3000, function () {
  console.log('listening on *:3000');
});

function generateID(){
  return uniqueID++;
}

/*function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}*/
