import React, { Component, PropTypes } from 'react';


class RegisterView extends Component {
  constructor(props, context) {
    super(props, context);
    this.props = props;
  }

  render() {
    return (
      <div className={'container'}>
        <div className="page-header">
          <h3>Register</h3>
        </div>
        <form ref={'form'} onSubmit={this.props.onSubmit} className="form-horizontal">
          <div className="form-group">
            <label htmlFor="username" className="col-sm-3 control-label">Username</label>
            <div className="col-sm-7">
              <input type="username" name="username" id="username" placeholder="Username" autofocus="autofocus" className="form-control" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="col-sm-3 control-label">Password</label>
            <div className="col-sm-7">
              <input type="password" name="password" id="password" placeholder="Password" className="form-control" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="col-sm-3 control-label">Confirm Password</label>
            <div className="col-sm-7">
              <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" className="form-control" />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-3 col-sm-7">
              <button type="submit" className="col-sm-3 btn btn-primary"><i className="fa fa-user" />Register</button>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-3 col-sm-7"><hr /></div>
          </div>
        </form>
      </div>
    );
  }
}

RegisterView.propTypes = {
  onSubmit: PropTypes.func
};

export default RegisterView ;
