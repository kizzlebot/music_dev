import React, {PropTypes} from 'react';
import Actions from '../../redux/actions';
import { connect } from 'react-redux';

import Header from '../../components/Common/Header';
var querystring = require('querystring');

export default class HeaderContainer extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {hide: true};
  }
  _handleChange(evt){
    if (evt.type != 'change') return ;
    if (evt.target.value == '') return ;
    this.props.dispatch(Actions.spotify.searchArtist(evt.target.value)).then(e => {
      this.setState({hide:false});
    });
  }
  _handleSelect(evt){
    console.log(evt.target.id);
    var {id} = evt.target;

    this.setState({hide:true}, () => {
      id ? this.props.dispatch(Actions.spotify.lookupArtist(id)) : null;
    });
  }
  _handleLoginClick(evt){
    console.log('clicked login button');
    var pos = {x:800, y:500};

    var query = querystring.stringify({ response_type: 'code',
      client_id: `21af28a899214cb5b9311fb75e18230a`,
      scope: `user-read-private user-read-email`,
      redirect_uri: 'http://localhost:8000/auth/spotify',
      state: 'abcd'
    });

    var url = `https://accounts.spotify.com/authorize?${query}`;



    var signinWin = window.open(url, "SignIn", "width=780,height=410,toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0,left=" + pos.x + ",top=" + pos.y);
    // setTimeout(CheckLoginStatus, 2000);
    signinWin.focus();
    return false;

  }
  render() {
    return (
      <Header {...this.props}
        {...this.state}
        _handleChange={this._handleChange.bind(this)}
        _handleSelect={this._handleSelect.bind(this)}
        _handleLoginClick={this._handleLoginClick.bind(this)} />
    );
  }
}



function mapStateToProps(store) {
  return {
    auth: store.auth,
    spotify: store.spotify
  };
}

// HeaderContainer.need = [() => Actions.spotify.lookupArtistAlbums('5K4W6rqBFWDnAN6FQUkS6x'), () => Actions.spotify.lookupAlbum('2P2Xwvh2xWXIZ1OWY9S9o5')]


HeaderContainer.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};



// connect <HeaderContainer/> so it has this.props.dispatch defined
export default connect(mapStateToProps)(HeaderContainer);
