import React, { Component } from 'react';
import * as querystring from 'query-string';

class PirateDetail extends Component {

  constructor(props){
    super(props)
    this.state = {}
    this.renderPirate = this.renderPirate.bind(this);
    this.singlePirate = this.singlePirate.bind(this);
    // this.location = this.location
  }

  render() {
    // console.log(this.location)
    // const qsValues = querystring.parse(this.props.location.search);
    return (
      <div className="pirate-detail">
        <h2>Pirate Detail</h2>

        {/* {Object.keys(this.props.pirates).map(this.renderPirate)} */}
        {Object.keys(this.props.pirates).filter(this.singlePirate)}

      </div>
      )
  }

singlePirate(key) {
  const pirate = this.props.pirates[key]
  // console.log(pirate)
  console.log('Pirate name: ' + pirate.name)
  const uRl = new URLSearchParams(window.location.search.substring(1))
  var name = uRl.get("name");
  console.log('Name: ' + name)

  console.log('Key: ' + this.props.pirates[key].name)
  return this.props.pirates[key].name === name;
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