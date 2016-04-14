import * as PostActions from './postActions';


var obj = Object.keys(PostActions).reduce(function(prev, curr){
  prev[curr] = PostActions[curr];
  return prev;
}, {});

export default obj;
