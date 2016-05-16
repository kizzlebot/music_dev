import React from 'react';
var noUiSlider = require('nouislider');



export default class CurrentTrack extends React.Component{
  componentDidMount(){
    var slider = document.getElementById('song-progress');
    noUiSlider.create(this.refs.songprogress, {
    	start: [ 0 ],
    	range: { 'min': [   0 ], 'max': [ 100 ]}
    });

    // var slider = document.getElementById('song-volume');
    noUiSlider.create(this.refs.songvolume, {
    	start: [ 100 ],
    	range: {
    		'min': [   0 ],
    		'max': [ 100 ]
    	}
    });
  }
  render() {
    return (
      <section className="current-track">
        <div className="current-track__actions">
          <a className="ion-ios-skipbackward" />
          <a className="ion-ios-play play" />
          <a className="ion-ios-skipforward" />
        </div>
        <div className="current-track__progress">
          <div className="current-track__progress__start">0:01</div>
          <div className="current-track__progress__bar">
            <div ref='songprogress' id="song-progress" />
          </div>
          <div className="current-track__progress__finish">3:07</div>
        </div>
        <div className="current-track__options">
          <a href="#" className="lyrics">Lyrics</a>
          <span className="controls">
            <a href="#" className="control"><i className="ion-navicon" /></a>
            <a href="#" className="control"><i className="ion-shuffle" /></a>
            <a href="#" className="control"><i className="fa fa-refresh" /></a>
            <a href="#" className="control devices">
              <i className="ion-iphone" />
              <span>Devices Available</span>
            </a>
            <a href="#" className="control volume">
              <i className="ion-volume-high" />
              <div ref='songvolume' id="song-volume" />
            </a>
          </span>
        </div>
      </section>
    );
  }
}
