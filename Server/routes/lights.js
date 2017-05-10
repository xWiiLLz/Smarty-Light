var express     = require('express');
var router      = express.Router();
var findWithAttr  = require('../functions/misc_functions').findWithAttr;
const util = require('util');

router.post('/',function(req,res){
    var red = req.body.red;
    var green = req.body.green;
    var blue = req.body.blue; 
    if(req.body.id!=null)
    {
        var id = req.body.id;
        if(req.app.lightbulbs)
        {
            var indexLightbulbs = findWithAttr(req.app.lightbulbs,'id',id);
            if(indexLightbulbs>=0)
            {
                var socketID = req.app.lightbulbs[indexLightbulbs].socketID;
                req.app.io.sockets.connected[socketID].emit('Data', red, green, blue);
                req.app.lightbulbs[indexLightbulbs].red = red;
                req.app.lightbulbs[indexLightbulbs].green = green;
                req.app.lightbulbs[indexLightbulbs].blue = blue;
                res.send("Succès!");
            }
            else
            {
                res.send("Il n'y a aucune ampoule avec l'ID #" + id);
            }
        }
    }
    else
    {
        //On modifie toutes les ampoules
        console.log("Requête -- Red:" + red + " Green:" + green + " Blue:" + blue);
        if((red >=0 && red <=1024) && (green >=0 && green <=1024) && (blue >=0 && blue <=1024))
        {
            req.app.io.sockets.emit('Data', red, green, blue);
            req.app.lightbulbs.forEach(function(element) {
                element.red = red;
                element.green = green;
                element.blue = blue;
            }, this);
            res.send("Succès!");
        }
        else
        {
            res.send("Veuillez entrer des valeurs entre 0 et 1024 pour les attributs 'red', 'green' et 'blue'.");
        }
    }
});

router.get('/',function(req,res){
    //On ajoute les header de response pour permettre
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.send(req.app.lightbulbs);
    console.log('Requête Get reçu...');
    console.log(req.app.lightbulbs);
});

module.exports=router;