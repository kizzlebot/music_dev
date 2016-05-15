import React from 'react';
import ContentMiddle from '../../components/Common/Content/ContentMiddle';


export default class ContentMiddleContainer extends React.Component {
  render() {
    return (
      <ContentMiddle />
    );
  }
}


ContentMiddle.contextTypes = {
  router: React.PropTypes.object,
};
