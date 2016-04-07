var fs = require('fs');
var path = require('path');

var dirs = path.dirname(module.filename);
var currFilename = module.filename.replace(`${dirs}/`, '');



/**
 * Reads dir content names as array and reduces it, excluding elements for which the valid callback
 * returns false for.
 * @param  {string} dirname   The directory to look through
 * @param  {fs.State} valid   Called with `stat` object as argument
 * @return {Object}           Key-value of filenames
 */
/*
function getPathInfo(dirname = __dirname, valid){
  return  fs.readdirSync(dirname)
            .reduce( (prev, curr) => {
              // if valid says no then skip

              var stat = fs.statSync(path.join(dirname, curr));
              if (!valid(stat) || curr == currFilename) return prev;

              // otherwise add to prev and return prev
              var name = curr.replace(/(.*)\.(.*?)$/, "$1");

              prev[name] = path.join(dirname, curr);
              return prev;
            }, {});
}
function getFiles(dirname){
  return getPathInfo(dirname, (stat) => stat.isFile());
}

function getDirectories(dirname){
  return getPathInfo(dirname, (stat) => stat.isDirectory());
}


var toExport = {};
var files = getFiles(__dirname);

Object.keys(files).forEach((k) => {
  toExport[k] = require(files[k]);
})
*/

var home = require('./home');
var user = require('./user');


var toExport = {
  home:home,
  user:user
};

module.exports = toExport;
