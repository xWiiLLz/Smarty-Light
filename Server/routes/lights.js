var express     = require('express');
var router      = express.Router();
const util = require('util');

router.post('/',function(req,res){
    var red = req.body.red;
    var green = req.body.green;
    var blue = req.body.blue; 
    console.log("requête -- Red:" + red + " Green:" + green + " Blue:" + blue);
    console.log(util.inspect(req.body, {showHidden: false, depth: null}))
    req.app.io.sockets.emit('Data', red, green, blue);
    res.send("Success ");
});

router.get('/',function(req,res){
    console.log("page get");
});

module.exports=router;