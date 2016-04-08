// var fs = require('fs');
// var path = require('path');

// var dirs = path.dirname(module.filename);
// var currFilename = module.filename.replace(`${dirs}/`, '');



/**
 * Reads dir content names as array and reduces it, excluding elements for which the valid callback
 * returns false for.
 * @param  {string} dirname   The directory to look through
 * @param  {fs.State} valid   Called with `stat` object as argument
 * @return {Object}           Key-value of filenames
 */

// function getPathInfo(dirname = __dirname, valid, callback){
//   var files = fs.readdirSync(dirname)
//                 .reduce( (prev, curr) => {
//                   // if valid function returns false then don't include in prev obj
//                   var stat = fs.statSync(path.join(dirname, curr));
//                   if (!valid(stat) || curr == currFilename) return prev;

//                   // otherwise add to prev and return prev
//                   var name = curr.replace(/(.*)\.(.*?)$/, "$1");

//                   prev[name] = path.join(dirname, curr);
//                   return prev;
//                 }, {});


//   return (callback && typeof callback == 'function') ? callback(null, files) : files;
// }


// var getFiles = getPathInfo.bind(null, __dirname, (stat) => stat.isFile());
// var getDirectories = getPathInfo.bind(null, __dirname, (stat) => stat.isDirectory());







// var toExport = {};
// var files = getFiles(__dirname);

// Object.keys(files).forEach((k) => {
//   toExport[k] = require(files[k]);
// });


var home = require('./home');
var user = require('./user');
var api = require('./api');


module.exports = {
  home:home,
  user:user,
  api:api
};