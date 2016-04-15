import { combineReducers } from 'redux'
import PostReducer from './postReducer';



// export default PostReducer;
export default combineReducers({
  posts: PostReducer
});
