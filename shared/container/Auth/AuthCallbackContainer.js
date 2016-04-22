import React from 'react';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';

class AuthCallbackContainer extends React.Component{
  constructor(props, context){
    super(props, context);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.soundcloud.oauth_token){
      window.close();
    }
  }
  componentDidMount(){
    this.props.dispatch(Actions.soundcloud.soundcloudLoginCallback(this.props.params.service, this.props.location, this.context.router))
  }
  render(){
    return (
      <div>{'AuthCallbackContainer'}</div>
    )
  }
}

AuthCallbackContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

AuthCallbackContainer.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};


function mapStateToProps(store) {
  return {
    soundcloud: store.soundcloud,
    auth: store.auth
  };
}




export default connect(mapStateToProps)(AuthCallbackContainer);
