import React from 'react';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';
import LoginContainer from './LoginContainer';
import RegisterContainer from './RegisterContainer';




export default class AuthCallback extends React.Component{
  constructor(props, context){
    super(props, context);
  }

  componentWillReceiveProps(nextProps){
  }
  componentDidMount(){
    var { params = {service:null} } = this.props;
    //
    if (params.service){
      // switch(params.service){
    //     case 'spotify':
    //       return this.context.router.replace('/');
    //     case 'soundcloud':
    //       return this.context.router.replace('/');
    //     case 'lastfm':
    //       return this.context.router.replace('/');
    //     case 'user':
    //       switch(params.action){
    //         case 'login':
    //         case 'logout':
    //           this.props.dispatch(Actions.auth.logout());
    //           return this.context.router('/');
    //         case 'register';
    //         default:
    //           return this.context.router.replace('/');
    //       }
        // case 'logout':
        //   this.props.dispatch(Actions.auth.logout());
        //   return this.context.router.replace('/');
        // default:
        //   console.log('hi');
          // return this.context.router.replace('/');
      // }
    }
    else{

    }
    //
  }
  render(){
    return (
      <div>{'AuthCallbackContainer'}</div>
    )
  }
}
