import React, { Component, PropTypes } from 'react';
import { HeaderContainer }  from './Common';
import { Footer }  from '../components/Common'
import Actions from '../redux/actions';
import { connect } from 'react-redux';


if (process.env.CLIENT){
  require('font-awesome-webpack')
}

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
    this.props.dispatch(Actions.fetchPosts());
    this.props.dispatch(Actions.restoreLoginStatus());
  }

  render() {
    return (
      <div>
        <HeaderContainer/> ;
        { this.props.children }
        <Footer/>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(App);
