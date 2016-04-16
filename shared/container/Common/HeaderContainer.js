import React, { Component, PropTypes } from 'react';
import { Header, Navbar }  from '../../components/Common'
import { connect } from 'react-redux';

class HeaderContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <Header onClick={function noop() {}}/>
        <Navbar onClick={function noop() {}} />
      </div>
    );
  }
}

HeaderContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

HeaderContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};



export default connect()(HeaderContainer);
