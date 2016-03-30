var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');


function getDirectories(){
	fs.readdirSync(__dirname).filter( (f) => {
		return fs.statSync(path.join(__dirname, f)).isDirectory();
	})
}


module.exports = router;
