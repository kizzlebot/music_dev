import React from 'react'



export default class ContentRight extends React.Component {
  render() {
    return (

      <div className="content__right">
        <div className="social">
          <div className="friends">
            <a href="#" className="friend">
              <i className="ion-android-person" />
              Sam Smith
            </a>
            <a href="#" className="friend">
              <i className="ion-android-person" />
              Tarah Forsyth
            </a>
            <a href="#" className="friend">
              <i className="ion-android-person" />
              Ricahrd Tomkins
            </a>
            <a href="#" className="friend">
              <i className="ion-android-person" />
              Tony Russo
            </a>
            <a href="#" className="friend">
              <i className="ion-android-person" />
              Alyssa Marist
            </a>
            <a href="#" className="friend">
              <i className="ion-android-person" />
              Ron Samson
            </a>
          </div>
          <button className="button-light">Find Friends</button>
        </div>
      </div>
    );
  }
}
