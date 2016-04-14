import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Nav, Navbar } from 'react-bootstrap';


function Header(props, context) {
  return (
    <Navbar className='header'>
      <Navbar.Header className="header-content">
        <h1 className="site-title">
          <Link to="/" onClick={props.handleLogoClick}>MERN Starter Blog</Link>
        </h1>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
        </Nav>
        <Nav pullRight>
          {
            context.router.isActive('/', true)
              ? <a className="add-post-button" href="#" onClick={props.onClick}>Add Post</a>
              : null
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}


Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
  handleLogoClick: PropTypes.func,
};

export default Header;
