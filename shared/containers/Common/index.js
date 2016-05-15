/**
 * Requires all js files in the current directory. Uses webpacks
 * require.context for client and fs for node
 */

var modules = {};
if (process.env.CLIENT){
  function requireAll(requireContext) {
    return requireContext.keys().reduce((prev, curr, index, array) => {
      var k = curr.slice(2).replace('.js','');
      prev[k] = requireContext(curr).default;
      return prev ;
    }, {});
  }
  modules = requireAll(require.context("./", true, /^\.\/(?!index).*\.js/));
}
else{
  var fs = require('fs');
  modules = fs.readdirSync(__dirname).filter((f) => /(?!index).*\.js/.test(f)).reduce((prev, curr, i, array) => {
    prev[curr.replace('.js','')] = require(`./${curr}`).default;
    return prev;
  }, {});
}

// console.log(modules);
module.exports = modules ;
