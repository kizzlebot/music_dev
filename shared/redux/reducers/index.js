import { combineReducers } from 'redux'
import PostReducer from './postReducer';
import AuthReducer from './authReducer';



// export default PostReducer;
export default combineReducers({
  posts: PostReducer,
  auth: AuthReducer
});
