import React, { Component, PropTypes } from 'react';
// import { HeaderContainer }  from './Common';
// import { Footer }  from '../components/Common';
import {ContentContainer, CurrentTrackContainer, Header} from './Common';


import Actions from '../redux/actions';
import { connect } from 'react-redux';
import { RouteTransition } from 'react-router-transition';
import $ from 'jquery';


class App extends React.Component{
  componentDidMount(){
    // Tooltips
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })

    // Viewport Heights
    $(window).on("resize load", function(){

      var totalHeight = $(window).height();
      var width = $(window).width();

      var headerHeight = $('.header').outerHeight();
      var footerHeight = $('.current-track').outerHeight();
      var playlistHeight = $('.playlist').outerHeight();
      var nowPlaying = $('.playing').outerHeight();

      var navHeight = totalHeight - (headerHeight + footerHeight + playlistHeight + nowPlaying);
      var artistHeight = totalHeight - (headerHeight + footerHeight);

      console.log(totalHeight);

      $(".navigation").css("height" , navHeight);
      $(".artist").css("height" , artistHeight);
      $(".social").css("height" , artistHeight);


      // Media Queries
    	if (width <= 768){
        $(".collapse").removeClass("in");
        $(".navigation").css("height" , "auto");
        $(".artist").css("height" , "auto");
    	}
    	else if (width > 768){
        $(".collapse").addClass("in");
    	}
    });
  }
  componentWillUnmount(){
    $(window).off("resize load");
  }
  render(){
    return (
      <div>
        <Header/>
        {/*<section className='content'>*/}
          <ContentContainer>
            {this.props.children}
          </ContentContainer>
        {/*</section>*/}
        <CurrentTrackContainer/>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    spotify: store.spotify
  };
}

App.need = [() => Actions.spotify.lookupArtistAlbums('5K4W6rqBFWDnAN6FQUkS6x')]


App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};



// connect <App/> so it has this.props.dispatch defined
export default connect(mapStateToProps)(App);
