import React from 'react';
import ContentMiddle from '../../components/Common/Content/ContentMiddle';
import {connect} from 'react-redux';

export default class ContentMiddleContainer extends React.Component {
  render() {
    return (
      <ContentMiddle {...this.props} />
    );
  }
}


ContentMiddle.contextTypes = {
  router: React.PropTypes.object,
};

function mapStateToProps(store) {
  return {
    spotify: store.spotify
  };
}


export default connect(mapStateToProps)(ContentMiddleContainer);
