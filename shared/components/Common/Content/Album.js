import React from 'react';
import moment from 'moment';
import Track from './Track';

export default class Album extends React.Component {
  componentDidMount(){
    if(this.props.id){

    }
    else if(this.props.album){
      var {images, release_date, name} = this.props.album;
      this.setState({...this.props});
    }
  }

  render(){
    var {images, release_date, name} = this.props.album;
    return (
      <div className="album">
        <div className="album__info">
          <div className="album__info__art">
            <img src={images && images.length > 0 && images[0].url} alt={name} />
          </div>
          <div className="album__info__meta">
            <div className="album__year">{moment(release_date).format('YYYY')}</div>
            <div className="album__name">{name}</div>
            <div className="album__actions">
              <button className="button-light save">Save</button>
              <button className="button-light more">
                <i className="ion-ios-more" />
              </button>
            </div>
          </div>
        </div>
        <div className="album__tracks">
          <div className="tracks">
            <div className="tracks__heading">
              <div className="tracks__heading__number">#</div>
              <div className="tracks__heading__title">Song</div>
              <div className="tracks__heading__length">
                <i className="ion-ios-stopwatch-outline" />
              </div>
              <div className="tracks__heading__popularity">
                <i className="ion-thumbsup" />
              </div>
            </div>
            {/*{this.props.album.tracks.items.map(t => {
                var duration = new moment.duration(t.duration_ms);
                var mins = (duration.minutes() < 10) ? `0${duration.minutes()}` : duration.minutes();
                var secs = (duration.seconds() < 10) ? `0${duration.seconds()}` : duration.seconds();
                return (<Track {...t} mins={mins} secs={secs}/>)
            })}*/}
          </div>
        </div>
      </div>
    )
  }
}
