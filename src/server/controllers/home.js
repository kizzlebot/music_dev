var express = require('express');
var router = express.Router();
var _ = require('lodash');



// var key = '7b3fb0efdb5cd66aebcab7230be6aeb6';


// module.exports = _lastfm;
var scriptPath = (process.env.NODE_ENV == 'development') ? 'http://localhost:8080/dist/client.js' : '/dist/client.js';
exports.index = function(req, res, next){
	res.render('index', {title:'express', scriptPath:scriptPath});
}
