import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './navbar.css';

class NavBar extends Component {
  render() {
    return (
      <nav>
        <Link to='/' className="navLink">Home</Link>
        <Link to='/detail/foo' className="navLink">Foo</Link>
      </nav>
      )
  }
}

export default NavBar;