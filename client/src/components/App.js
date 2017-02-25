import React, { Component } from 'react';
import { Link } from 'react-router';

class App extends Component {
  render() {
    return ( 
      <div id="header">
        <Link to="index"><h1>Riverbed</h1></Link>
        <h4>Summer 2017 | Vol. 1, No. 1</h4>
        <nav className="nav">
            <ul id="nav-menu-ul" className="nav-ul">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/admin">Admin</Link></li>
            </ul>
        </nav>

      </div>
    );
  }
}

export default App;
