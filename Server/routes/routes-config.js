var lightsRouter    = require('./lights');

function routesConfig(app){
    app.use('/lights', lightsRouter);
}

module.exports=routesConfig;