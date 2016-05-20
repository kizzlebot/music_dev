import React from 'react';
import {Link} from 'react-router';





export default class UserHeaderSection extends React.Component {
  render(){
    var menuItems = (this.props.auth && this.props.auth.isAuthenticated) ? [
      <li key={'privatesess'}><a href="#">Private Session</a></li>,
      <li key={'account'}><a href="#">Account</a></li>,
      <li key={'settings'}><a href="#">Settings</a></li>,
      <li key={'logout'}><a href="#">Log Out</a></li>
    ] : [
      <li key={'login'}><Link to="/login">Log In</Link></li>,
      <li key={'register'}><Link to="/register">Register</Link></li>
    ];

    return (
      <div className="user">
        <div className="user__notifications"><i className="ion-android-notifications" /></div>
        <div className="user__inbox"><i className="ion-archive" /></div>
        <div className="user__info">
          <span className="user__info__img">
            <img src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAevAAAAJGFjNDBhZmM2LWE5MzAtNGQyZi1iNGE4LWZkMjZkMGM2ZWY1Mw.jpg" alt="Profile Picture" className="img-responsive" />
          </span>{' '}
          <span className="user__info__name">
            <span className="first">James </span> <span className="last">Choi</span>
          </span>
        </div>
        <div className="user__actions">
          <div className="dropdown">
            <button className="dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              <i className="ion-chevron-down" />
            </button>
            <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
              {menuItems}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
