import React from 'react';
import {ContentLeft, ContentMiddle, ContentRight} from '../../components/Common/Content';


export default class ContentContainer extends React.Component{
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
