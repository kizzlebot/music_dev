import * as PostConstants from './postConstants';
import * as AuthConstants from './authConstants';
import * as SoundcloudConstants from './soundcloudConstants';
// import * as UserConstants from './userConstants'



export default Object.keys(SoundcloudConstants).concat(Object.keys(AuthConstants)).concat(Object.keys(PostConstants)).reduce(function(prev, curr) {
  if (curr in PostConstants) {
    prev.post[curr] = PostConstants[curr];
  }
  else if (curr in AuthConstants) {
    prev.auth[curr] = AuthConstants[curr];
  }
  else if (curr in SoundcloudConstants) {
    prev.soundcloud[curr] = SoundcloudConstants[curr];
  }
  return prev;
}, {soundcloud:{}, auth:{}, post:{}});
