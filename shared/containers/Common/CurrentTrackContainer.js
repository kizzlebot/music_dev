import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import CurrentTrack from '../../components/Common/CurrentTrack';
var noUiSlider = require('nouislider');




export default class CurrentTrackContainer extends React.Component{
  render() {
    return (
      <CurrentTrack />
    );
  }
}
CurrentTrackContainer.need = [() => Actions.spotify.lookupArtist('3nFkdlSjzX9mRTtwJOzDYB')];

CurrentTrackContainer.contextTypes = {
  router: React.PropTypes.object,
};

CurrentTrackContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    spotify: store.spotify,
  };
}


export default connect(mapStateToProps)(CurrentTrackContainer);
