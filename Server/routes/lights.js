var express     = require('express');
var router      = express.Router();
var findWithAttr  = require('../functions/misc_functions').findWithAttr;
const util = require('util');

router.post('/',function(req,res){
    console.log("Requête POST reçu");
    console.log(req.body);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    var red = req.body.red;
    var green = req.body.green;
    var blue = req.body.blue; 
    if(req.body.id!=null)
    {
        
        console.log(req.app.lightbulbs);
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
        console.log("Requête -- Rouge:" + red + " Vert:" + green + " Bleu:" + blue);
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
    /*console.log('Requête Get reçu...');
    console.log(req.app.lightbulbs);*/
});

//Route pour trouver acquérir l'information d'une ampoule unique
router.get('/unique/:id',function(req,res){
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    if(req.params.id!=null)
    {
    var id = req.params.id;
        if(req.app.lightbulbs)
        {
            var tempLightbulbs = req.app.lightbulbs;
            var indexLightbulbs = findWithAttr(tempLightbulbs,'id',id);
            if(indexLightbulbs>=0)
            {
                // On renvoie l'ampoule unique trouvée;
                res.send(req.app.lightbulbs[indexLightbulbs]);
            }
            else
            {
                res.send(null);
                console.log("Index de lightbulb = ", indexLightbulbs);
                console.log(util.inspect(req.app.lightbulbs[indexLightbulbs], false, null))
            }
        }
        else{
            console.log("Erreur..");
        }
    }
    else
    {
        res.send("ID nul");
    }
});

module.exports=router;