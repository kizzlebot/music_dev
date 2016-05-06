import React, { Component, PropTypes } from 'react';
import { HeaderContainer }  from './Common';
import { Footer }  from '../components/Common';
import Actions from '../redux/actions';
import { connect } from 'react-redux';
import { RouteTransition } from 'react-router-transition';



class App extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    this.props.dispatch(Actions.auth.restoreLoginStatus());
  }

  render() {
    return (
      <div>
        <HeaderContainer/>
          <RouteTransition
            pathname={this.props.location.pathname}
            atEnter={{ translateX: 100 }}
            atLeave={{ translateX: -100 }}
            atActive={{ translateX: 0 }}
            mapStyles={styles => ({ transform: `translateX(${styles.translateX}%)` })}
          >
            {this.props.children}
          </RouteTransition>

        <Footer/>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};



// connect <App/> so it has this.props.dispatch defined
export default connect()(App);
