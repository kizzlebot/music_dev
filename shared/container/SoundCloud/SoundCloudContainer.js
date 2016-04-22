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



  componentWillMount() {
    // this.props.dispatch(Actions.soundcloudFetch('hiphop'));
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
        this.props.dispatch(Actions.soundcloudFetchMore('country', 50, this.props.soundcloud.page))
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
    const toComponent = (e, i) => {
      return (
        <div key={i} className={'col-lg-2 col-md-3 col-xs-5'}>
          <a className={''} href={e.permalink_url}>
            <img className={'img-thumbnail img-responsive'} src={e.artwork_url}/>
          </a>
        </div>
      );
    };
    const filterFunction = (e) => {
      return (e.artwork_url != null && e.artwork_url != undefined);
    };


    var splitUp = splitIntoChunks(this.props.soundcloud.collection, 6, toComponent, filterFunction );


    return (
      <div className='container'>
        {splitUp.map(e => {
          return (<div className={'row'}>{e}</div>);
        })}
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

SoundCloudContainer.need = [() => Actions.soundcloudFetch('hiphop')];

function mapStateToProps(store) {
  return {
    soundcloud: store.soundcloud,
  };
}

export default connect(mapStateToProps)(SoundCloudContainer);
