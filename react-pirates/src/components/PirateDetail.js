import React, { Component } from 'react';

class PirateDetail extends Component {
  
  constructor(props){
    super(props);
    this.renderPirate = this.renderPirate.bind(this);
  }
  
  render() {
    const pirates = this.props.pirates;
    return (
      <div  className="pirate-detail">
        {Object.keys(this.props.pirates).filter(
          pirate => {
            return pirate === this.props.match.params.id
          }
        ).map(this.renderPirate)}
      
      </div>
    )
  }
  
  renderPirate(key) {
    const divStyle = {
      display: 'flex',
      border: '3px solid #bada55',
      padding: '0.5rem'
    }
    
    const pirate = this.props.pirates[key]
    return (
      <div style={divStyle} key={key}>
      <h3>{pirate.name}</h3>
      <img src={process.env.PUBLIC_URL + '/img/' + pirate.image} alt="pirate" />
      <p>{pirate.desc}</p>
      </div>
    )
  }
  
}

export default PirateDetail;