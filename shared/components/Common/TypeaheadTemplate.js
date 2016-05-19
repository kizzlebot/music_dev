import React from 'react'
import DebounceInput from 'react-debounce-input';


var cx = require('classnames');

var TypeaheadTemplate = React.createClass({
    displayName: 'OptionTemplate',

    propTypes: {
        data: React.PropTypes.any,
        isSelected: React.PropTypes.bool
    },

    render: function() {
        var classes = cx({
                'option-value': true,
                'selected-option': this.props.isSelected
            }),
            optionData = this.props.data;

        return (
            <div>
                {this.renderHeader(optionData)}
                <div className={classes}>
                    {optionData.value}
                </div>
            </div>
        )
    },

    renderHeader: function(option) {
        // If this option is the first of its type,
        // then render the header.
        if (option.index === 0) {
            return (
                <div className='option-header'>
                    {option.type}
                </div>
            );
        }

        return null;
    }
});
export default TypeaheadTemplate;

// export default class TypeaheadTemplate extends React.Component {
//   render() {
//     return (
//       <div className="search">
//         <div className="bootstrap-typeahead open" style={{position: 'relative'}}>
//           <div className="bootstrap-typeahead-input" style={{outline: 'none'}} tabIndex={0}>
//             {/*<input className="bootstrap-typeahead-input-main form-control"
//                    style={{backgroundColor: 'transparent', display: 'block', position: 'relative', zIndex: 1, borderRadius:0}}
//                    type="text"
//                    onChange={this.props.onChange}
//              />*/}
//           <DebounceInput
//             className="bootstrap-typeahead-input-main form-control"
//             style={{backgroundColor: 'transparent', display: 'block', position: 'relative', zIndex: 1, borderRadius:0}}
//             minLength={2}
//             debounceTimeout={300}
//             onChange={(e) => this.props.onChange(e)}
//           />
//              {/*<input className="bootstrap-typeahead-input-hint form-control"
//                     style={{borderColor: 'transparent', bottom: 0, boxShadow: 'none', display: 'block', position: 'absolute', top: 0, width: '100%', zIndex: 0, borderRadius:0, display:'hidden'}}
//
//               />*/}
//           </div>
//           <ul className={`dropdown-menu bootstrap-typeahead-menu dropdown-menu-justify ${!this.props.options.length > 0 ? 'hide' : ''}`} style={{maxHeight: 300, overflow:'scroll'}}>
//             {this.props.options && this.props.options.map(e => {
//               return (
//                 <li key={e.id} onClick={(e) => this.props.onSelect(e)} className><a href="#"><span><strong id={e.id} className="highlight">{e.label}</strong></span></a></li>
//               )
//             })}
//           </ul>
//         </div>
//       </div>
//     );
//
//   }
// }
