import React from 'react';
import moment from 'moment';


export default class ContentMiddle extends React.Component {
  render() {

    var { images } = this.props.spotify.current.artist;
    var imageUrl = images && images.length > 0 ? images[0].url : '';
    var {followers} = this.props.spotify.current.artist || {};
    var total = (followers && followers.total) ? followers.total : '0';


    return !this.props.spotify.current.artist ? (<div></div>) : (
      <div className="artist is-verified">
          <div className="artist__header">
            <div className="artist__info">
              <div className="profile__img">
                <img src={imageUrl} alt={this.props.spotify.current.artist.name} />
              </div>
              <div className="artist__info__meta">
                <div className="artist__info__type">Artist</div>
                <div className="artist__info__name">{this.props.spotify.current.artist.name}</div>
                <div className="artist__info__actions">
                  <button className="button-dark">
                    <i className="ion-ios-play" />
                    Play
                  </button>
                  <button className="button-light">Follow</button>
                  <button className="button-light more">
                    <i className="ion-ios-more" />
                  </button>
                </div>
              </div>
            </div>
            <div className="artist__listeners">
              <div className="artist__listeners__count">{total}</div>
              <div className="artist__listeners__label">Monthly Listeners</div>
            </div>
            <div className="artist__navigation">
              <ul className="nav nav-tabs" role="tablist">
                <li role="presentation" className="active">
                  <a href="#artist-overview" aria-controls="artist-overview" role="tab" data-toggle="tab">Overview</a>
                </li>
                <li role="presentation">
                  <a href="#related-artists" aria-controls="related-artists" role="tab" data-toggle="tab">Related Artists</a>
                </li>
              </ul>
              <div className="artist__navigation__friends">
                <a href="#">
                  <img src="http://zblogged.com/wp-content/uploads/2015/11/17.jpg" alt />
                </a>
                <a href="#">
                  <img src="http://zblogged.com/wp-content/uploads/2015/11/5.png" alt />
                </a>
                <a href="#">
                  <img src="http://cdn.devilsworkshop.org/files/2013/01/enlarged-facebook-profile-picture.jpg" alt />
                </a>
              </div>
            </div>
          </div>
          <div className="artist__content">
            <div className="tab-content">
              {/* Overview */}
              <div role="tabpanel" className="tab-pane active" id="artist-overview">
                <div className="overview">
                  <div className="overview__artist">
                    {/* Latest Release*/}
                    {/*<div className="section-title">Latest Release</div>
                    <div className="latest-release">
                      <div className="latest-release__art">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/whenDarkOut.jpg" alt="When It's Dark Out" />
                      </div>
                      <div className="latest-release__song">
                        <div className="latest-release__song__title">Drifting (Track Commentary)</div>
                        <div className="latest-release__song__date">
                          <span className="day">4</span>
                          <span className="month">December</span>
                          <span className="year">2015</span>
                        </div>
                      </div>
                    </div>*/}
                    {/* / */}
                    {/* Popular*/}
                    {/*<div className="section-title">Popular</div>
                    <div className="tracks">
                      <div className="track">
                        <div className="track__art">
                          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/whenDarkOut.jpg" alt="When It's Dark Out" />
                        </div>
                        <div className="track__number">1</div>
                        <div className="track__added">
                          <i className="ion-checkmark-round added" />
                        </div>
                        <div className="track__title">Me, Myself &amp; I</div>
                        <div className="track__explicit">
                          <span className="label">Explicit</span>
                        </div>
                        <div className="track__plays">147,544,165</div>
                      </div>
                      <div className="track">
                        <div className="track__art">
                          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/tth.jpg" alt="These Things Happen" />
                        </div>
                        <div className="track__number">2</div>
                        <div className="track__added">
                          <i className="ion-plus not-added" />
                        </div>
                        <div className="track__title">I Mean It</div>
                        <div className="track__explicit">
                          <span className="label">Explicit</span>
                        </div>
                        <div className="track__plays">74,568,782</div>
                      </div>
                      <div className="track">
                        <div className="track__art">
                          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/whenDarkOut.jpg" alt="When It's Dark Out" />
                        </div>
                        <div className="track__number">3</div>
                        <div className="track__added">
                          <i className="ion-checkmark-round added" />
                        </div>
                        <div className="track__title">Calm Down</div>
                        <div className="track__explicit">
                          <span className="label">Explicit</span>
                        </div>
                        <div className="track__plays">13,737,506</div>
                      </div>
                      <div className="track">
                        <div className="track__art">
                          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/whenDarkOut.jpg" alt="When It's Dark Out" />
                        </div>
                        <div className="track__number">4</div>
                        <div className="track__added">
                          <i className="ion-plus not-added" />
                        </div>
                        <div className="track__title">Some Kind Of Drug</div>
                        <div className="track__explicit">
                          <span className="label">Explicit</span>
                        </div>
                        <div className="track__plays">12,234,881</div>
                      </div>
                      <div className="track">
                        <div className="track__art">
                          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/tth.jpg" alt="These Things Happen" />
                        </div>
                        <div className="track__number">5</div>
                        <div className="track__added">
                          <i className="ion-checkmark-round added" />
                        </div>
                        <div className="track__title">Let's Get Lost</div>
                        <div className="track__explicit">
                          <span className="label">Explicit</span>
                        </div>
                        <div className="track__plays">40,882,954</div>
                      </div>
                    </div>
                    <button className="show-more button-light">Show 5 More</button>*/}
                    {/* / */}
                  </div>
                  <div className="overview__related">
                    {/*<div className="section-title">Related Artists</div>
                    <div className="related-artists">
                      <a href="#" className="related-artist">
                        <span className="related-artist__img">
                          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/hoodie.jpg" alt="Hoodie Allen" />
                        </span>
                        <span className="related-artist__name">Hoodie Allen</span>
                      </a>
                      <a href="#" className="related-artist">
                        <span className="related-artist__img">
                          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/mikestud.jpg" alt="Mike Stud" />
                        </span>
                        <span className="related-artist__name">Mike Stud</span>
                      </a>
                      <a href="#" className="related-artist">
                        <span className="related-artist__img">
                          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/drake.jpeg" alt="Drake" />
                        </span>
                        <span className="related-artist__name">Drake</span>
                      </a>
                      <a href="#" className="related-artist">
                        <span className="related-artist__img">
                          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/jcole.jpg" alt="J. Cole" />
                        </span>
                        <span className="related-artist__name">J. Cole</span>
                      </a>
                      <a href="#" className="related-artist">
                        <span className="related-artist__img">
                          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/bigsean.jpg" alt="Big Sean" />
                        </span>
                        <span className="related-artist__name">Big Sean</span>
                      </a>
                      <a href="#" className="related-artist">
                        <span className="related-artist__img">
                          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/wiz.jpeg" alt="Wiz Khalifa" />
                        </span>
                        <span className="related-artist__name">Wiz Khalifa</span>
                      </a>
                      <a href="#" className="related-artist">
                        <span className="related-artist__img">
                          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/yonas.jpg" alt="Yonas" />
                        </span>
                        <span className="related-artist__name">Yonas</span>
                      </a>
                    </div>*/}
                  </div>
                  <div className="overview__albums">
                    <div className="overview__albums__head">
                      <span className="section-title">Albums</span>
                      <span className="view-type">
                        <i className="fa fa-list list active" />
                        <i className="fa fa-th-large card" />
                      </span>
                    </div>
                    {/*<Album album={this.props.spotify.current.album}/>*/}
                  </div>
                </div>
              </div>
              {/* / */}
              {/* Related Artists */}
              <div role="tabpanel" className="tab-pane" id="related-artists">
                <div className="media-cards">
                  <div className="media-card">
                    <div className="media-card__image" style={{backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/hoodie.jpg)'}}>
                      <i className="ion-ios-play" />
                    </div>
                    <a className="media-card__footer">Hoodie Allen</a>
                  </div>
                  <div className="media-card">
                    <div className="media-card__image" style={{backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/mikestud_large.jpg)'}}>
                      <i className="ion-ios-play" />
                    </div>
                    <a className="media-card__footer">Mike Stud</a>
                  </div>
                  <div className="media-card">
                    <div className="media-card__image" style={{backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/drake_large.jpg)'}}>
                      <i className="ion-ios-play" />
                    </div>
                    <a className="media-card__footer">Drake</a>
                  </div>
                  <div className="media-card">
                    <div className="media-card__image" style={{backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/jcole_large.jpg)'}}>
                      <i className="ion-ios-play" />
                    </div>
                    <a className="media-card__footer">J. Cole</a>
                  </div>
                  <div className="media-card">
                    <div className="media-card__image" style={{backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/bigSean_large.jpg)'}}>
                      <i className="ion-ios-play" />
                    </div>
                    <a className="media-card__footer">Big Sean</a>
                  </div>
                  <div className="media-card">
                    <div className="media-card__image" style={{backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/wiz.jpeg)'}}>
                      <i className="ion-ios-play" />
                    </div>
                    <a className="media-card__footer">Wiz Khalifa</a>
                  </div>
                  <div className="media-card">
                    <div className="media-card__image" style={{backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/yonas.jpg)'}}>
                      <i className="ion-ios-play" />
                    </div>
                    <a className="media-card__footer">Yonas</a>
                  </div>
                  <div className="media-card">
                    <div className="media-card__image" style={{backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/childish.jpg)'}}>
                      <i className="ion-ios-play" />
                    </div>
                    <a className="media-card__footer">Childish Gambino</a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
    );
  }
}


ContentMiddle.contextTypes = {
  router: React.PropTypes.object,
};




class Album extends React.Component {
  render(){
    return (
      <div className="album">
        <div className="album__info">
          <div className="album__info__art">
            <img src={this.props.album.images[0].url} alt={this.props.album.name} />
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
            {this.props.album.tracks.items.map(t => {
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
