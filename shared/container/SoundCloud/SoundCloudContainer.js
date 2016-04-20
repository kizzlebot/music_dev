import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';

class SoundCloudContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }



  componentWillMount() {
    // if (this.props.posts.length === 0) {
    // this.props.dispatch(Actions.fetchPosts());
    // }
    this.props.dispatch(Actions.soundcloudFetch('hiphop'));
  }
  handleScroll(e){

  }
  componentDidMount(){
    if (typeof document !== 'undefined'){
      $(window).scroll(function() {
         if($(window).scrollTop() + $(window).height() == $(document).height()) {
            //  alert("bottom!");
             // getData();
          this.props.dispatch(Actions.soundcloudFetchMore('country', 50, this.props.soundcloud.page))
        }
      }.bind(this));
    }
  }

  componentWillUnmount(){
    if (typeof document !== 'undefined'){
      document.removeEventListener('scroll', this.handleScroll.bind(this), false);
    }
  }





  // TODO: Split into component
  render() {
    return (
      <div>
        <div className="container">
          {this.props.soundcloud.collection && this.props.soundcloud.collection.map((e,i) => {
            return (
              <div key={i} className={'col-xs-1'}>
                <a href={e.permalink_url}><img src={e.artwork_url}/></a>
              </div>
            );
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
  soundcloud: PropTypes.shape({
    collection: PropTypes.array,
    next_href: PropTypes.string,
    page:PropTypes.number.isRequired
  }),
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    soundcloud: store.soundcloud,
  };
}


export default connect(mapStateToProps)(SoundCloudContainer);
