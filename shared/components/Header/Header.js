import React, { PropTypes } from 'react';
import { Link } from 'react-router';



class Header extends React.Component {
  constructor(props){
    super(props);
    this.props = props ;
  }
  render(){

    var btnToRender = this.context.router.isActive('/', true) ? <a className="add-post-button" href="#" onClick={this.props.onClick}>Add Post</a> : null

    return (
      <nav className="header navbar navbar-default">
        <div className="container">
          <div className="header-content navbar-header">
            <h1 className="site-title">
              <a className href="/">MERN Starter Bloggs</a></h1>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav" />
            <div className="nav navbar-nav navbar-right" style={{ marginLeft: '2em' }}>
              {btnToRender}
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
  handleLogoClick: PropTypes.func,
};

export default Header;
