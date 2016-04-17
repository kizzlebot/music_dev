import React, { Component, PropTypes } from 'react';
import { Header, Navbar }  from '../../components/Common'
import { connect } from 'react-redux';
import Actions from '../../redux/actions';

class HeaderContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }
  onLogout(){
    this.props.dispatch(Actions.logout());
  }
  render() {
    return (
      <div>
        <Header onClick={function noop() {}}/>
        <Navbar isAuthenticated={this.props.auth.isAuthenticated} onClick={function noop() {}} onLogout={this.onLogout.bind(this)}/>
      </div>
    );
  }
}

HeaderContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

HeaderContainer.propTypes = {
  auth: PropTypes.shape({
    token: PropTypes.string,
    username: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    isAuthenticating: PropTypes.bool,
    statusText: PropTypes.string
  }),
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store){
  return {
    auth: store.auth
  }
}

export default connect(mapStateToProps)(HeaderContainer);
