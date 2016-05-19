import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
var $ = require('jquery');


import Actions from '../../redux/actions';
import { RegisterView } from '../../components/Auth';



class RegisterContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.props = props ;
  }

  handleSubmit(evt) {
    evt.preventDefault();

    var formFields = $(evt.target).serializeArray().reduce((prev, curr) => {
      prev[curr.name] = curr.value ;
      return prev ;
    }, {});

    this.props.dispatch(Actions.auth.registerUser(formFields.username, formFields.password, formFields.confirmPassword));
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
      <RegisterView onSubmit={this.handleSubmit.bind(this)} />
    );
  }
}


RegisterContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
};

RegisterContainer.propTypes = {
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


export default connect(mapStateToProps)(RegisterContainer);
