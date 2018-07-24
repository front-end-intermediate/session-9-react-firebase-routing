// import React, { Component } from 'react';

// class PirateDetail extends Component {
  
//   render() {
//     return (
//       <div className="pirate-detail">
//         <h3>Pirate Detail</h3>
//       </div>
//       )
//   }
// }

// export default PirateDetail;
import React, { Component } from 'react';

class PirateDetail extends Component {

  constructor(props){
    super(props)
    this.state = {}
    this.renderPirate = this.renderPirate.bind(this);
  }

  render() {
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