import React, { Component } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

import '../assets/css/Pirate.css'
import { Link } from 'react-router-dom';

class Pirate extends Component {
  render(){
    const { details } = this.props;
    let linkUrl = `/detail/${this.props.index}`;
    return (
      // <Router>
      <div className='pirate'>
      <ul>
          <li><Link to={linkUrl} params={{ index: details.index }} >{details.name}</Link></li>
      <li>{details.weapon}</li>
          <li>{details.vessel}</li>
          

      <li>
         <button onClick={() => this.props.removePirate(this.props.index)}>
              X
          </button>
          </li>
          

      </ul>
      </div>
      // </Router>
      )
  }
}
export default Pirate;