import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';


import { LoginView } from '../../components/Auth';


var $ = require('jquery');


class LoginContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.props = props ;
  }

  handleSubmit(evt) {
    evt.preventDefault();
    var fields = $(evt.target).serializeArray();
    var formFields = fields.reduce((prev, curr) => {
      prev[curr.name] = curr.value ;
      return prev ;
    }, {});

    this.props.dispatch(Actions.loginUser(formFields.username, formFields.password));
  }
  componentWillReceiveProps(newProps, router) {
    if (newProps.auth.isAuthenticated) {
      this.context.router.replace('/');
    }
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.context.router.replace('/');
    }
  }
  render() {
    return (
      <div>
        <LoginView onSubmit={this.handleSubmit.bind(this)} />
      </div>
    );
  }
}


LoginContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
};

LoginContainer.propTypes = {
  auth: PropTypes.shape({
    token: PropTypes.string,
    username: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    isAuthenticating: PropTypes.bool,
    statusText: PropTypes.string
  }),
  dispatch: PropTypes.func.isRequired,
};


function mapStateToProps(store) {
  return {
    auth: store.auth
  };
}


export default connect(mapStateToProps)(LoginContainer);
