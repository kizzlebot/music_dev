import * as PostActions from './postActions';
import * as AuthActions from './authActions';
import * as SoundcloudActions from './soundcloudActions';


export default Object.keys(SoundcloudActions).concat(Object.keys(AuthActions)).concat(Object.keys(PostActions)).reduce(function(prev, curr) {
  if (curr in PostActions) {
    prev[curr] = PostActions[curr];
  }
  else if (curr in AuthActions) {
    prev[curr] = AuthActions[curr];
  }
  else if (curr in SoundcloudActions) {
    prev[curr] = SoundcloudActions[curr];
  }
  return prev;
}, {});
