import { combineReducers } from 'redux'
import PostReducer from './postReducer';
import AuthReducer from './authReducer';
import DataReducer from './dataReducer';
import SoundcloudReducer from './soundcloudReducer';


// export default PostReducer;
export default combineReducers({
  posts: PostReducer,
  auth: AuthReducer,
  data:DataReducer,
  soundcloud: SoundcloudReducer
});
