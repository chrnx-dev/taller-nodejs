'use strict';
// http://node-simple-router.herokuapp.com/documents
var http = require('http'),
	Router = require('node-simple-router'),
	route = new Router({static_route: __dirname + "/public"});

	route.get('/ola', function(req, res){
		res.end('ola ke ase');
	});

	http.createServer(route).listen(8085);