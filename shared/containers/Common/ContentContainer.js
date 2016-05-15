import React from 'react';
import {ContentLeft, ContentMiddle, ContentRight} from './Content';


export default class Content extends React.Component{
  render(){
    return (
      <section className={'content'}>
        <ContentLeft {...this.props} />
        <div className={'content__middle'}>
          {this.props.children}
        </div>
        <ContentRight {...this.props}/>
      </section>
    )
  }
}
