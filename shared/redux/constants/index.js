import * as PostConstants from './postConstants';
// import * as UserConstants from './userConstants'

var obj = Object.keys(PostConstants).reduce(function(prev, curr){
  prev[curr] = PostConstants[curr];
  return prev;
}, {});



export default obj ;
