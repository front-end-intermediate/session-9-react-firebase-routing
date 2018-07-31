import React, { Component } from 'react';
import * as querystring from 'query-string';

class PirateDetail extends Component {

  constructor(props){
    super(props)
    this.state = {}
    this.renderPirate = this.renderPirate.bind(this);
    this.singlePirate = this.singlePirate.bind(this);
  }

  render() {
    // const qsValues = querystring.parse(this.props.location.search);
    // console.log(qsValues.name)
    const pirates = this.props.pirates;
    console.log('keys: ' + Object.keys(pirates))
    console.log('match id: ' + this.props.match.params.id)

    return (
      <div className="pirate-detail">
        <h2>Pirate Detail</h2>
        {Object.keys(this.props.pirates).filter(
          pirate => {
            return pirate === this.props.match.params.id
          }
        ).map(this.renderPirate)}
      </div>
      )
  }

  onePirate(pname) {
    // const qsValues = querystring.parse(this.props.location.search);
    console.log(pname)
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
    {/* <img src={process.env.PUBLIC_URL + '/img/' + pirate.image} alt="pirate" /> */}
    <p>{pirate.desc}</p>
  </div>
  )
}

}

export default PirateDetail;