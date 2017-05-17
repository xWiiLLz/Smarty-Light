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

app.use((req, res, next) => {
            // Set permissive CORS header - this allows this server to be used only as
            // an API server in conjunction with something like webpack-dev-server.
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

            // Disable caching so we'll always get the latest comments.
            res.setHeader('Cache-Control', 'no-cache');
            next();
});

require('./routes/routes-config')(app);

var allSockets = [];
app.lightbulbs = [];
var uniqueID = 0;


app.io.on('connection', function (socket){
   console.log('connection', socket.id);
   allSockets.push(socket); //On ajoute l'ampoule qui se connecte à la liste
  
  // On assigne un ID à l'ampoule qui vient de se connecter
  
   var lightbulbID = generateID();   //On lui donne un id
   console.log('Ajout de l\'ampoule avec l\'ID:', socket.id);

   // On récupère l'adresse ip
  var clientIp = socket.request.connection.remoteAddress;
  var clientPort = socket.request.connection.remotePort;

  // On extrait les caractères ::ffff: ipv6 pour récupérer seulement ipv4
  var idx = clientIp.lastIndexOf(':');
  if (~idx && ~clientIp.indexOf('.'))
  {
    clientIp = clientIp.slice(idx + 1);
  }
  console.log('Nouvelle connexion depuis ' + clientIp + ":" + clientPort);
   app.lightbulbs.push({id: lightbulbID,
                    socketID: socket.id,
                    red: 0,
                    green: 0,
                    blue: 0,
                    ip: clientIp,
                    port: clientPort
                    
  });

  // Event handler de déconnexion
  socket.on('disconnect', function(){
    console.log('Socket avec le ID #', socket.id, ' déconnecté');
    var i = allSockets.indexOf(socket);
    allSockets.splice(i, 1);

    var indexLightbulbs = findWithAttr(app.lightbulbs,'id',socket.id);
    app.lightbulbs.splice(indexLightbulbs,1);
  });
});


http.listen(3000, function () {
  console.log('À l\'écoute sur le port *:3000');
});

function generateID(){
  return uniqueID++;
}