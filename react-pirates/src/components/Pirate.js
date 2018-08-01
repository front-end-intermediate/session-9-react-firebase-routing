import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Pirate.css';

class Pirate extends Component {
  render(){
    const { details } = this.props;
    // const linkUrl = `/detail/${this.props.index}`;
    let linkUrl = `/detail/${this.props.index}?name=${details.name}`;

    // console.log(linkUrl)
    return (
      <div className='pirate'>
      <ul>
      <li><Link to={linkUrl}> {details.name}</Link></li>
      <li>{details.weapon}</li>
      <li>{details.vessel}</li>
      <li>
         <button onClick={() => this.props.removePirate(this.props.index)}>
              X
          </button>
      </li>
      </ul>
      </div>
      )
  }
}
export default Pirate;