import React, {PropTypes} from 'react';
import Actions from '../../redux/actions';
import { connect } from 'react-redux';

import Header from '../../components/Common/Header';


export default class HeaderContainer extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {hide: true};
  }
  _handleChange(evt){
    if (evt.target.value == '') return ;
    this.props.dispatch(Actions.spotify.searchArtist(evt.target.value)).then(e => {
      this.setState({hide:false});
    });
  }
  _handleSelect(evt){
    console.log(evt.target.id);
    var {id} = evt.target;

    this.setState({hide:true}, () => {
      id ? this.props.dispatch(Actions.spotify.lookupArtistAlbums(id)) : null;
    });
  }
  render() {
    return (
      <Header {...this.props}
        {...this.state}
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
