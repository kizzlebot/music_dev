import React from 'react';
import Typeahead from './Typeahead';
import {Link} from 'react-router';
import UserHeaderSection from './Header/UserHeaderSection';



export default class Header extends React.Component {
  render() {
    var items = this.props.spotify.search.artists.items || [];
    var objs = items.map(e => {
      return {id:e.id, label:e.name};
    });
    return (
      <section className="header">
        <div className="page-flows">
          <span className="flow" onClick={this.props._handleBack}>
            <i className="ion-chevron-left" />
          </span>
          <span className="flow" onClick={this.props._handleForward}>
            <i className="ion-chevron-right" />
          </span>
        </div>
        <div className="search">
          <Typeahead
            {...this.props}
            onInputChange={(e) => this.props._handleChange(e)}
            onChange={e => this.props._handleChange(e)}
            onSelect={e => this.props._handleSelect(e)}
            options={objs || []}
            />
        </div>
        <UserHeaderSection {...this.props} />
      </section>
    );
  }
}
