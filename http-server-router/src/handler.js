'use srict';

var Handler = function(method){
	this.method = method;
};

Handler.prototype.process = function(req, res){
	var params = null;
	return this.method.apply(this, [req, res, params]);
}

module.exports = Handler;