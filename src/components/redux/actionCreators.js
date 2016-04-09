import {LOG_IN, LOG_OUT, SIGN_UP, GET_PROFILE} from './actionTypes';


/**
 * Action Creators
 */
function log_in(form){
  return {
    type: LOG_IN,
    form:form
  }
}

function log_out(){
  return {
    type: LOG_OUT
  }
}

function sign_up(form){
  return {
    type: SIGN_UP,
    form:form
  }
}

function get_profile(id){
  return {
    type: GET_PROFILE,
    id:id
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitLogin: (form) => {
      dispatch(log_in(form))
    },
    onLogout:() => {
      dispatch(log_out);
    },
    onSubmitSignup:(form) => {
      dispatch(sign_up(form));
    },
    onGetProfile:(id) => {
      dispatch(get_profile(id))
    }
  }
}



export {log_in, log_out, sign_up, get_profile};
