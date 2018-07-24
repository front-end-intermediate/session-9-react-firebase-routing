import React, { Component } from 'react';
import * as querystring from 'query-string';

class PirateDetail extends Component {

  constructor(props){
    super(props)
    this.state = {}
    this.renderPirate = this.renderPirate.bind(this);
  }

  render() {
    // const qsValues = querystring.parse(this.props.location.search);
    return (
      <div className="pirate-detail">
        <h2>Pirate Detail</h2>

        {Object.keys(this.props.pirates).map(this.renderPirate)}

      </div>
      )
  }

renderPirate(key){
  const pirate = this.props.pirates[key]
  const piratePic = pirate.image;
  return (
  <div key={key}>
    <h3>{pirate.name}</h3>
    <img src={process.env.PUBLIC_URL + '/img/' + pirate.image} alt="pirate" />
    <p>{pirate.desc}</p>
  </div>
  )
}

}

export default PirateDetail;