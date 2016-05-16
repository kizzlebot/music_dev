import React, {PropTypes} from 'react';
import Actions from '../../redux/actions';
import { connect } from 'react-redux';

import Header from '../../components/Common/Header';


export default class HeaderContainer extends React.Component {
  render() {
    return (
      <Header {...this.props} />
    );
  }
}



function mapStateToProps(store) {
  return {
    auth: store.auth
  };
}

// HeaderContainer.need = [() => Actions.spotify.lookupArtistAlbums('5K4W6rqBFWDnAN6FQUkS6x'), () => Actions.spotify.lookupAlbum('2P2Xwvh2xWXIZ1OWY9S9o5')]


HeaderContainer.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};



// connect <HeaderContainer/> so it has this.props.dispatch defined
export default connect(mapStateToProps)(HeaderContainer);
