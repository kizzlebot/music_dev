import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';

class SoundCloudContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    };
  }



  componentWillMount() {
    // if (this.props.posts.length === 0) {
      // this.props.dispatch(Actions.fetchPosts());
    // }
    this.props.dispatch(Actions.soundcloudFetch('hiphop'));
  }






  render() {
    return (
      <div>
        <div className="container">
          {this.props.soundcloud.collection && this.props.soundcloud.collection.map((e,i) => {
            return (
              <div key={i} className={'col-xs-1'}>
                <a href={e.permalink_url}>
                  <img src={e.artwork_url}/>
                </a>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}




// SoundCloudContainer.need = [() => Actions.fetchPosts()];

SoundCloudContainer.contextTypes = {
  router: React.PropTypes.object,
};

SoundCloudContainer.propTypes = {
  soundcloud:PropTypes.shape({
    collection: PropTypes.array,
    next_href: PropTypes.string
  }),
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    soundcloud: store.soundcloud,
  };
}


export default connect(mapStateToProps)(SoundCloudContainer);
