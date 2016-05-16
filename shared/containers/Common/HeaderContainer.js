import React, {PropTypes} from 'react';
import Actions from '../../redux/actions';
import { connect } from 'react-redux';

import Header from '../../components/Common/Header';


export default class HeaderContainer extends React.Component {
  _handleChange(evt){
    console.log(evt.target.value);

    evt.target.value != '' ? this.props.dispatch(Actions.spotify.searchArtist(evt.target.value)) : '';
  }
  _handleSelect(evt){
    console.log(evt.target.id);
    // evt[0].id ? this.props.dispatch(Actions.spotify.lookupArtist(evt[0].id)) : '';
  }
  render() {
    return (
      <Header {...this.props}
        _handleChange={this._handleChange.bind(this)}
        _handleSelect={this._handleSelect.bind(this)} />
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
