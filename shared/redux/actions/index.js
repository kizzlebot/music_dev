




var modules = {};
if (process.env.CLIENT){
  function requireAll(requireContext) {
    return requireContext.keys().reduce((prev, curr, index, array) => {
      var k = curr.slice(2).replace('Actions.js','');
      prev[k] = requireContext(curr);
      return prev ;
    }, {});
  }
  modules = requireAll(require.context("./", true, /^\.\/(?!index).*\.js/));
}
else{
  var fs = require('fs');
  modules = fs.readdirSync(__dirname).filter((f) => f.search('index') == -1).reduce((prev, curr, i, array) => {
    prev[curr.replace('Actions.js','')] = require(`./${curr}`)
    return prev;
  }, {});
}

export default modules ;
