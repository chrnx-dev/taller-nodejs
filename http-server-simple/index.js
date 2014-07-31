'use stric';

var http = require('http'),
	handler = function(req, res){
		res.end('Ola ke Ase');
	};


http.createServer(handler)
	.listen(8085);