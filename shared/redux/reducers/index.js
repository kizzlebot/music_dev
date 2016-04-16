import { combineReducers } from 'redux'
import PostReducer from './postReducer';
import AuthReducer from './authReducer';
import DataReducer from './dataReducer';



// export default PostReducer;
export default combineReducers({
  posts: PostReducer,
  auth: AuthReducer,
  data:DataReducer
});
