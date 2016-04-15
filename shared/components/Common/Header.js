import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Navbar from './Navbar';




class Header extends React.Component {
  constructor(props, context){
    super(props, context);
    this.props = props ;
  }
  render(){
    return (
      <div>
        <nav className="header ">
          <div className="header-container">
            <div className="header-content navbar-header">
              <h1 className="site-title"><Link to="/" onClick={this.props.handleLogoClick}>MERN Starter Blog</Link></h1>
            </div>
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav" />
              <div className="nav navbar-nav navbar-right" style={{ marginLeft: '2em' }}>
              </div>
            </div>
          </div>
        </nav>
        <Navbar onClick={function noop(){}}/>
      </div>
    );
  }
}


Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
  handleLogoClick: PropTypes.func,
};

export default Header;
