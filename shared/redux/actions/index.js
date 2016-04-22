import * as PostActions from './postActions';
import * as AuthActions from './authActions';
import * as SoundcloudActions from './soundcloudActions';


export default Object.keys(SoundcloudActions).concat(Object.keys(AuthActions)).concat(Object.keys(PostActions)).reduce(function(prev, curr) {
  if (curr in PostActions) {
    prev.post[curr] = PostActions[curr];
  }
  else if (curr in AuthActions) {
    prev.auth[curr] = AuthActions[curr];
  }
  else if (curr in SoundcloudActions) {
    prev.soundcloud[curr] = SoundcloudActions[curr];
  }
  return prev;
}, {soundcloud:{}, auth:{}, post:{}});
