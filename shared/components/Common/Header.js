import React, { PropTypes } from 'react';
import { Link } from 'react-router';






class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.props = props ;
  }
  render() {
    return (
      <nav className="header ">
        <div className="header-container">
          <div className="header-content navbar-header">
            <h1 className="site-title animated infinite pulse">
              <Link to="/" onClick={this.props.handleLogoClick}>Music Dev</Link>
            </h1>
            <p>Yes. you are here</p>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav" />
            <div className="nav navbar-nav navbar-right" style={{ marginLeft: '2em' }}>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}


Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
  handleLogoClick: PropTypes.func
};

export default Header ;
