import React from 'react';
import ContentMiddle from '../../components/Common/Content/ContentMiddle';
import {connect} from 'react-redux';

export class ContentMiddleContainer extends React.Component {
  render() {
    return (
      <ContentMiddle {...this.props} />
    );
  }
}


ContentMiddleContainer.contextTypes = {
  router: React.PropTypes.object,
};

function mapStateToProps(store) {
  return {
    spotify: store.spotify,
    artist: store.spotify.artist
  };
}


export default connect(mapStateToProps)(ContentMiddleContainer);
