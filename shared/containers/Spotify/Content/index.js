import React from 'react';
import ContentLeft from './ContentLeft';
import ContentMiddle from './ContentMiddle';
import ContentRight from './ContentRight';

export default class Content extends React.Component{
  render(){
    return (
      <div className={'content'}>
        <ContentLeft {...this.props} />
        {this.props.children}
        <ContentRight {...this.props}/>
      </div>
    )
  }
}



export {ContentMiddle};
