import React from 'react'



export default class NavRight extends React.Component {
  render() {
    return (
      <div className="content__right">
        <div className="social">
          <div className="friends">
            <a href="#" className="friend">
              <i className="ion-android-person" />
              Sam Smith
            </a>
          </div>
          <button className="button-light">Find Friends</button>
        </div>
      </div>
    );
  }
}
