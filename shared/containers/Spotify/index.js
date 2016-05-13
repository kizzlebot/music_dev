import React from 'react';
import Content from './Content';
import CurrentTrack from './CurrentTrack';
import Header from './Header';


export default class Spotify extends React.Component{
  render(){
    return (
      <div className={'content'}>
        <Header />
        {/*<Content />*/}
        <Content>
          {this.props.children}
        </Content>
        <CurrentTrack />
      </div>
    )
  }
}
