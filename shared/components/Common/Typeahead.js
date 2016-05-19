import React from 'react'
import DebounceInput from 'react-debounce-input';



export default class Typeahead extends React.Component {
  render() {
    return (
      <div className="search">
        <div className="bootstrap-typeahead open" style={{position: 'relative'}}>
          <div className="bootstrap-typeahead-input" style={{outline: 'none'}} tabIndex={0}>
            {/*<input className="bootstrap-typeahead-input-main form-control"
                   style={{backgroundColor: 'transparent', display: 'block', position: 'relative', zIndex: 1, borderRadius:0}}
                   type="text"
                   onChange={this.props.onChange}
             />*/}
          <DebounceInput
            className="bootstrap-typeahead-input-main form-control"
            style={{backgroundColor: 'transparent', display: 'block', position: 'relative', zIndex: 1, borderRadius:0}}
            minLength={2}
            debounceTimeout={300}
            onChange={this.props.onChange}
          />
             {/*<input className="bootstrap-typeahead-input-hint form-control"
                    style={{borderColor: 'transparent', bottom: 0, boxShadow: 'none', display: 'block', position: 'absolute', top: 0, width: '100%', zIndex: 0, borderRadius:0, display:'hidden'}}

              />*/}
          </div>
          <ul className={`dropdown-menu bootstrap-typeahead-menu dropdown-menu-justify ${this.props.hide ? 'hide' : ''}`} style={{maxHeight: 300, overflow:'scroll'}}>
            {this.props.options && this.props.options.map(e => {
              return (
                <li key={e.id} onClick={this.props.onSelect} className><a id={e.id} href="#"><span><strong id={e.id} className="highlight">{e.label}</strong></span></a></li>
              )
            })}
          </ul>
        </div>
      </div>
    );

  }
}
