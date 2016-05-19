import React from 'react';
import moment from 'moment';
import Track from './Track';

export default class Album extends React.Component {
  render(){
    var {album = {images:['']}, tracks = {items:[]}} = this.props ;
    var {images=[{url:null}]} = album;


    // console.log(this.props);
    if (!album || !tracks || !(tracks.items instanceof Array)) {
      // console.log(album);
      return (<div/>);
    }


    return (
      <div className="album">
        <div className="album__info">
          <div className="album__info__art">
            <img src={images.length > 0 && images[0].url} alt={album.name} />
          </div>
          <div className="album__info__meta">
            <div className="album__year">{moment(this.props.album.release_date).format('YYYY')}</div>
            <div className="album__name">{this.props.album.name}</div>
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
            {tracks.items.map(t => {
                var duration = new moment.duration(t.duration_ms);
                var mins = (duration.minutes() < 10) ? `0${duration.minutes()}` : duration.minutes();
                var secs = (duration.seconds() < 10) ? `0${duration.seconds()}` : duration.seconds();
                return (
                  <div key={t.id} className="track">
                    <div className="track__number">{t.track_number}</div>
                    <div className="track__added">
                      <i className="ion-checkmark-round added" />
                    </div>
                    <div className="track__title">{t.name}</div>
                    <div className="track__explicit">
                      <span className="label">{t.explicit ? 'Explicit' : ''}</span>
                    </div>
                    <div className="track__length">{`${mins}:${secs}`}</div>
                    <div className="track__popularity">
                      <i className="ion-arrow-graph-up-right" />
                    </div>
                  </div>
                )
            })}
          </div>
        </div>
      </div>
    )
  }
}
