import React, { Component, PropTypes } from 'react';

class LoginView extends Component {

  constructor(props, context) {
    super(props, context);
    this.props = props;
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h3>Sign in</h3>
        </div>
        <form ref={'form'} onSubmit={this.props.onSubmit} className="form-horizontal">
          <div className="form-group">
            <label htmlFor="email" className="col-sm-3 control-label">Email</label>
            <div className="col-sm-7">
              <input type="email" name="email" id="email" placeholder="Email" autofocus="autofocus" className="form-control" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="col-sm-3 control-label">Password</label>
            <div className="col-sm-7">
              <input type="password" name="password" id="password" placeholder="Password" className="form-control" />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-3 col-sm-7">
              <button type="submit" className="col-sm-3 btn btn-primary"><i className="fa fa-user" />Login</button>
              <a href="/forgot" className="btn btn-link">Forgot your password?</a>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-3 col-sm-7">
              <hr />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-3 col-sm-7">
            <a href="/auth/lastfm" className="btn btn-block btn-lastfm btn-social"><i className="fa fa-lastfm" />Sign in with Last.fm</a>
            <a href="/auth/facebook" className="btn btn-block btn-facebook btn-social"><i className="fa fa-facebook" />Sign in with Facebook</a>
            <a href="/auth/google" className="btn btn-block btn-google btn-social"><i className="fa fa-google-plus" />Sign in with Google</a>
            <a href="/auth/github" className="btn btn-block btn-github btn-social"><i className="fa fa-github" />Sign in with GitHub</a>
            <a href="/auth/instagram" className="btn btn-block btn-instagram btn-social"><i className="fa fa-instagram" />Sign in with Instagram</a></div>
          </div>
        </form>
      </div>
    );
  }
}

LoginView.propTypes = {
  onSubmit: propTypes.func.isRequired
}

export default LoginView ;
