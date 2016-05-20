import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';
import CurrentTrack from '../../components/Common/CurrentTrack';



export default class CurrentTrackContainer extends React.Component{
  render() {
    return (
      <CurrentTrack />
    );
  }
}


CurrentTrackContainer.contextTypes = {
  router: React.PropTypes.object
};

CurrentTrackContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(store) {
  return {
    spotify: store.spotify
  };
}


export default connect(mapStateToProps)(CurrentTrackContainer);
