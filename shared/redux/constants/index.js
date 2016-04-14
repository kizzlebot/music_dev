import * as PostConstants from './postConstants';

var obj = Object.keys(PostConstants).reduce(function(prev, curr){
  prev[curr] = PostConstants[curr];
  return prev;
}, {})

export default obj;
