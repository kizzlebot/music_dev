import ActionTypes from '../constants';



const initialState = {
  data: null,
  isFetching: false
};


const dataReducer = (state = initialState, action) => {
  if (!action) return state ;

  switch(action.type){
    case ActionTypes.RECEIVE_PROTECTED_DATA:
      return Object.assign({}, state, {
          data: payload.data,
          isFetching: false
        });
    case ActionTypes.FETCH_PROTECTED_DATA_REQUEST:
      return Object.assign({}, state, {
          isFetching: true
        });
    default:
      return state ;
  }

  return (action && action.type in funcs) ? funcs[action.type](state, action.payload) : state ;
};


export default dataReducer;
