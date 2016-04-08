var express = require('express');
var router = express.Router();
var _ = require('lodash');



// var key = '7b3fb0efdb5cd66aebcab7230be6aeb6';


// module.exports = _lastfm;

exports.index = function(req, res, next){
	res.render('index', {title:'express'});
}
