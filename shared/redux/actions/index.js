import * as PostActions from './postActions';
import * as AuthActions from './authActions';


export default Object.keys(AuthActions).concat(Object.keys(PostActions)).reduce(function(prev, curr){
  if (curr in PostActions){
    prev[curr] = PostActions[curr];
  }
  else if (curr in AuthActions){
    prev[curr] = AuthActions[curr];
  }
  return prev;
}, {});
