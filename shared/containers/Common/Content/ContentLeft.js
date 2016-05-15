import React from 'react';


export class Playlist extends React.Component {
  render(){
    return (
      <section className="playlist">
        <a href="#">
          <i className="ion-ios-plus-outline" />
          New Playlist
        </a>
      </section>
    );
  }
}

export class Navigation extends React.Component {
  render(){
    return (
      <section className="navigation">
        {/* Main */}
        <div className="navigation__list">

          <div className="navigation__list__header"
            onClick={this._handleHeaderClick}
            role="button" data-toggle="collapse" href="#main" aria-expanded="true" aria-controls="main">
            Main
          </div>
          <div className="collapse in" id="main">
            <a href="#" className="navigation__list__item">
              <i className="ion-ios-browsers" />
              <span>Browse</span>
            </a>
            <a href="#" className="navigation__list__item">
              <i className="ion-person-stalker" />
              <span>Activity</span>
            </a>
            <a href="#" className="navigation__list__item">
              <i className="ion-radio-waves" />
              <span>Radio</span>
            </a>
          </div>
        </div>
        {/* / */}
        {/* Your Music */}
        <div className="navigation__list">
          <div className="navigation__list__header"
            onClick={this._handleHeaderClick}
            role="button" data-toggle="collapse" href="#yourMusic" aria-expanded="true" aria-controls="yourMusic">
            Your Music
          </div>
          <div className="collapse in" id="yourMusic">
            <a href="#" className="navigation__list__item">
              <i className="ion-headphone" />
              <span>Songs</span>
            </a>
            <a href="#" className="navigation__list__item">
              <i className="ion-ios-musical-notes" />
              <span>Albums</span>
            </a>
            <a href="#" className="navigation__list__item">
              <i className="ion-person" />
              <span>Artists</span>
            </a>
            <a href="#" className="navigation__list__item">
              <i className="ion-document" />
              <span>Local Files</span>
            </a>
          </div>
        </div>
        {/* / */}
        {/* Playlists */}
        <div className="navigation__list">
          <div className="navigation__list__header"
            onClick={this._handleHeaderClick}
            role="button" data-toggle="collapse" href="#playlists" aria-expanded="true" aria-controls="playlists">
            Playlists
          </div>
          <div className="collapse in" id="playlists">
            <a href="#" className="navigation__list__item">
              <i className="ion-ios-musical-notes" />
              <span>Doo Wop</span>
            </a>
            <a href="#" className="navigation__list__item">
              <i className="ion-ios-musical-notes" />
              <span>Pop Classics</span>
            </a>
            <a href="#" className="navigation__list__item">
              <i className="ion-ios-musical-notes" />
              <span>Love $ongs</span>
            </a>
            <a href="#" className="navigation__list__item">
              <i className="ion-ios-musical-notes" />
              <span>Hipster</span>
            </a>
            <a href="#" className="navigation__list__item">
              <i className="ion-ios-musical-notes" />
              <span>New Music Friday</span>
            </a>
            <a href="#" className="navigation__list__item">
              <i className="ion-ios-musical-notes" />
              <span>Techno Poppers</span>
            </a>
            <a href="#" className="navigation__list__item">
              <i className="ion-ios-musical-notes" />
              <span>Summer Soothers</span>
            </a>
            <a href="#" className="navigation__list__item">
              <i className="ion-ios-musical-notes" />
              <span>Hard Rap</span>
            </a>
            <a href="#" className="navigation__list__item">
              <i className="ion-ios-musical-notes" />
              <span>Pop Rap</span>
            </a>
            <a href="#" className="navigation__list__item">
              <i className="ion-ios-musical-notes" />
              <span>5 Stars</span>
            </a>
            <a href="#" className="navigation__list__item">
              <i className="ion-ios-musical-notes" />
              <span>Dope Dancin</span>
            </a>
            <a href="#" className="navigation__list__item">
              <i className="ion-ios-musical-notes" />
              <span>Sleep</span>
            </a>
          </div>
        </div>
        {/* / */}
      </section>
    );
  }
}
export class Playing extends React.Component {
  render(){
    return (
      <section className="playing">
        <div className="playing__art">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/cputh.jpg" alt="Album Art" />
        </div>
        <div className="playing__song">
          <a className="playing__song__name">Some Type of Love</a>
          <a className="playing__song__artist">Charlie Puth</a>
        </div>
        <div className="playing__add">
          <i className="ion-checkmark" />
        </div>
      </section>
    );
  }
}
export default class ContentLeft extends React.Component {
  componentDidMount(){
  }
  _handleHeaderClick(tgt){
    // console.log(tgt);
    $(tgt.target).toggleClass( "active" );
  }
  render() {
    return (
      <div className="content__left">
        <Navigation />
        <Playlist/>

        <Playing />

      </div>
    );
  }
}
