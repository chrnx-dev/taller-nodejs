'use strict';

var http = require('http'),
	Router = require('./src/router'),
	server, router;

router = new Router();

router.get('/', function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write('Hello World');
	res.end();
});

router.get('/ola-ke-ase', function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write('Ola Ke Ase');
	res.end();
});

server = http.createServer(function(req, res){
	var handler = router.route(req);
	console.log(handler);
	handler.process(req,res);
});

server.listen(8085);