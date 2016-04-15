import React, { Component, PropTypes } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
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
