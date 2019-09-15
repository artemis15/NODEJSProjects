const apiRoutes = require('./apis/mainApi');

const init =(server) => {
     server.get('*',function(req,res,next){
        console.log('Request was made to: ' + req.originalUrl);
        return next();
     });

     server.use('/api',apiRoutes);
}

module.exports = {
    init : init
}