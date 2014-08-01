var restify = require('restify'),
    User = require('./routes/v1/users');

var ip_addr = '127.0.0.1';
var port    =  '8085';

var server = restify.createServer({
    name : "sistema-control-api",
    version: '0.0.1'
});

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.fullResponse());
server.use(restify.CORS();

server.get('/v1', function(req, res, next){
  res.send({
    server: 'Sistema Control API',
    version: '0.0.1'
  });
  next();
});


server.get('/v1/users/list', User.list);


function unknownMethodHandler(req, res) {
  if (req.method.toLowerCase() === 'options') {
      console.log('received an options method request');
    var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'Origin', 'X-Requested-With']; // added Origin & X-Requested-With

    if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');

    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
    res.header('Access-Control-Allow-Methods', res.methods.join(', '));
    res.header('Access-Control-Allow-Origin', req.headers.origin);

    return res.send(204);
  }
  else
    return res.send(new restify.MethodNotAllowedError());
}

server.on('MethodNotAllowed', unknownMethodHandler);

server.listen(port , function(){
    console.log('%s listening at %s ', server.name , server.url);
});