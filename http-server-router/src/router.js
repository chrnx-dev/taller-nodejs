'use strict';
var Handler = require('./handler'),
	fs = require('fs'),
	parser = require('url'),
	rs = require('path'),
	handlers = {},
	
	Router = function(){};


Router.prototype = {
	clear: function(){
		handlers = {};
	},
	get: function(url, method){
		handlers[url] = new Handler(method);
	},
	route: function(req){
		var url = parser.parse(req.url, true),
			handler = handlers[url.pathname];

		if (!handler) handler = this.static(req)
  	return handler;
	},
	static: function(req){
		var url = parser.parse(req.url, true),
			path = rs.resolve("public"+url.pathname),
			data ='', mime;
			
			try {    
			  data = fs.readFileSync(path);
			  mime = req.headers.accepts || 'text/html'
			  return new Handler(function(req, res) {
			    res.writeHead(200, {'Content-Type': mime});
			    res.write(data);
			    res.end();
			  });        
			} catch (e) { 
				console.log(e);
			  return new Handler(function(req, res) {
			    res.writeHead(404, {'Content-Type': 'text/plain'});
			    res.write("No route registered for " + url.pathname);
			    res.end();
			  });      
			}  

	}
};

module.exports = Router;