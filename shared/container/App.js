import React, { Component, PropTypes } from 'react';
import { Header, Footer }  from '../components/Common'
import { connect } from 'react-redux';

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <Header onClick={function noop() {}}/>
        { this.props.children }
        <Footer/>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default connect()(App);
