import React, { PropTypes } from 'react';
import { Link } from 'react-router';


class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.props = props ;
  }
  render() {

    var btnToRender = this.context.router.isActive('/', true) ? <a className="add-post-button" href="#" onClick={this.props.onClick}>Add Post</a> : null;
    var toRender ;

    if (!this.props.isAuthenticated) {
      toRender = (
        <ul className="nav navbar-nav navbar-right">
          <li style={{ borderLeft: '1px solid rgb(63, 152, 230)' }}>
            <Link to={'/login'} activeClassName={'active'}>Login</Link>
          </li>
          <li style={{ borderLeft: '1px solid rgb(63, 152, 230)', borderRight: '1px solid rgb(63, 152, 230)' }}>
            <Link to={'/register'} activeClassName={'active'}>Register</Link>
          </li>
        </ul>
      );
    }
    else {
      // TODO: Logout route
      toRender = (
        <ul className="nav navbar-nav navbar-right">
          <li style={{ borderLeft: '1px solid rgb(63, 152, 230)', borderRight: '1px solid rgb(63, 152, 230)' }}>
            <a href='#' onClick={this.props.onLogout}>Log Out</a>
          </li>
        </ul>
      );
    }



    return (
      <nav className="navbar navbar-default navbar-static-top" style={{ boxShadow: "0 2px 6px rgba(0,0,0,.16), 0 2px 6px rgba(0,0,0,.23)" }}>
        <div className="container">
          <div className="navbar-header">
            <button aria-controls="navbar" aria-expanded="false" className="navbar-toggle collapsed" data-target="#navbar" data-toggle="collapse" type="button">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
          </div>
          <div className="navbar-collapse collapse" id="navbar">
            <ul className="nav navbar-nav">
              <li style={{ borderLeft: '1px solid rgb(63, 152, 230)' }}><Link to={'/'} activeClassName={'active'}>Home</Link></li>
              <li className="dropdown" style={{ borderLeft: '1px solid rgb(63, 152, 230)', borderRight: '1px solid rgb(63, 152, 230)' }}>
                <a aria-expanded="false" aria-haspopup="true" className="dropdown-toggle" data-toggle="dropdown" href="#" role="button">Dropdown <span className="caret" /></a>
                <ul className="dropdown-menu">
                </ul>
              </li>
            </ul>
            {toRender}
          </div>{/*/.nav-collapse */}
        </div>
      </nav>
    );
  }
}

Navbar.contextTypes = {
  router: React.PropTypes.object,
};

Navbar.propTypes = {
  onClick: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  handleLogoClick: PropTypes.func,
};

export default Navbar;
