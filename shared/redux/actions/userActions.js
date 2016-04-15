import ActionTypes from '../constants';
import Config from '../../../server/config';
import fetch from 'isomorphic-fetch';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';



export function registerUser(formData) {
  return {
    type: ActionTypes.CHECK_EXISTING,
    formData
  };
}

export function registerUserRequest(formData) {
  return (dispatch) => {
    fetch(`${baseURL}/api/users/register`, {
      method: 'post',
      body: JSON.stringify({
        username:formData.username,
        password: formData.password,
        confirmPassword:formData.confirmPassword
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json()).then(res => dispatch(registerUser(res.message)));
  }
}
