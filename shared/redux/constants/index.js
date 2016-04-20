import * as PostConstants from './postConstants';
import * as AuthConstants from './authConstants';
import * as SoundcloudConstants from './soundcloudConstants';
// import * as UserConstants from './userConstants'



export default Object.keys(SoundcloudConstants).concat(Object.keys(AuthConstants)).concat(Object.keys(PostConstants)).reduce(function(prev, curr) {
  if (curr in PostConstants) {
    prev[curr] = PostConstants[curr];
  }
  else if (curr in AuthConstants) {
    prev[curr] = AuthConstants[curr];
  }
  else if (curr in SoundcloudConstants) {
    prev[curr] = SoundcloudConstants[curr];
  }
  return prev;
}, {});
