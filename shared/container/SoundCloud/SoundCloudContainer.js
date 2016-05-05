import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';



function splitIntoChunks(arry, chunk_size, transformFunc, filter){
  var arrays = [], size = chunk_size;
  var arr = arry.filter(filter).map(transformFunc);

  while (arr.length > 0) arrays.push(arr.splice(0, size));
  return arrays ;
}





class SoundCloudContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount(){
    if (typeof document !== 'undefined'){
      $(window).bind('scroll', this.handleScroll.bind(this));
    }
  }

  handleScroll(){
    // If bottom of page reached, fetch more
    if (typeof window != 'undefined'){
      if($(window).scrollTop() + $(window).height() == $(document).height()) {
        this.props.dispatch(Actions.soundcloud.soundcloudFetchMore('country', 50, this.props.soundcloud.page))
      }
    }
  }
  componentWillUnmount(){
    if (typeof document !== 'undefined'){
      $(window).unbind('scroll');
    }
  }





  // TODO: Split into component
  render() {
    return (
      <div className={'container'}>
        <div className={'row'}>
          {this.props.soundcloud.collection.map((e) => {
            return (
              <div key={e.link} className='col-sm-3 col-xs-4 clearfix'>
                <a className="thumbnail fancybox" rel="lightbox" href={`${e.permalink_url}`}>
                  <img className={'img-responsive'} src={e.artwork_url}/>
                  <div className='text-center'>
                    <small className='text-muted'>{e.title}</small>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    )
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

SoundCloudContainer.need = [() => Actions.soundcloud.soundcloudFetch('hiphop')];

function mapStateToProps(store) {
  return {
    soundcloud: store.soundcloud,
  };
}

export default connect(mapStateToProps)(SoundCloudContainer);
