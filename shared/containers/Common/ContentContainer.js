import React from 'react';
import {NavLeft, NavRight} from '../../components/Common/Content';



export default class ContentContainer extends React.Component{
  render(){
    return (
      <section className={'content'}>
        <NavLeft {...this.props} />
        <div className={'content__middle'}>
          {this.props.children}
        </div>
        <NavRight {...this.props}/>
      </section>
    )
  }
}
