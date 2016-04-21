import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';

class SoundCloudContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }



  componentWillMount() {
    // this.props.dispatch(Actions.soundcloudFetch('hiphop'));
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
      <div className='container'>
        <div className="row">
          {this.props.soundcloud.collection && this.props.soundcloud.collection.filter((e) => e.artwork_url != null && e.artwork_url != undefined )
          .map((e,i) => {
            return (
              <div key={i} className={'col-lg-2 col-md-3 col-xs-5 thumb'}>
                <a className={'thumbnail'} href={e.permalink_url}>
                  <img className={'img-responsive'} src={e.artwork_url}/>
                </a>
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

SoundCloudContainer.need = [() => Actions.soundcloudFetch('hiphop')];

function mapStateToProps(store) {
  return {
    soundcloud: store.soundcloud,
  };
}



export default connect(mapStateToProps)(SoundCloudContainer);
