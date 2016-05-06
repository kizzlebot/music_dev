import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';




var $ = require('jquery');


class ProfileContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    var fields = $(evt.target).serializeArray();
    var formFields = fields.reduce((prev, curr) => {
      prev[curr.name] = curr.value ;
      return prev ;
    }, {});

    this.props.dispatch(Actions.auth.loginUser(formFields.username, formFields.password));
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


ProfileContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
};

ProfileContainer.propTypes = {
  auth: PropTypes.shape({
    token: PropTypes.string,
    username: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    isAuthenticating: PropTypes.bool,
    statusText: PropTypes.string
  }),
  soundcloud: PropTypes.shape({
    collection: PropTypes.array,
    oauth_token: PropTypes.string
  })
  dispatch: PropTypes.func.isRequired,
};


function mapStateToProps(store) {
  return {
    auth: store.auth,
    soundcloud: store.soundcloud
  };
}


export default connect(mapStateToProps)(ProfileContainer);
