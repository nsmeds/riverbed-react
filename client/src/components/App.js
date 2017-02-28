import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
class App extends Component {


  constructor() {
    super();
    this.state = {
      currentIssue: {}
    };
  }

  componentDidMount() {
    this.getCurrentIssue();
  }

  getCurrentIssue = () => {
    axios.get('http://localhost:3001/api/issues')
      .then(response => {
        let curr = response.data[response.data.length - 1];
        this.setState({
          currentIssue: curr
        })
      })
      .catch(error => {
        console.log('Error: could not GET current issue. ', error);
      })
  }

  render() {

    let clonedChildren = React.cloneElement(this.props.children, {props: this.state.currentIssue})

    return ( 
      <div>
        <div id="header">
          <Link to="index"><h1>Riverbed</h1></Link>
          <h4>{this.state.currentIssue.title} | Vol. 1, No. 1</h4>
          <nav className="nav">
              <ul id="nav-menu-ul" className="nav-ul">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li><Link to="/admin">Admin</Link></li>
              </ul>
          </nav>
        </div>
        { clonedChildren }
      </div>
    );
  }
}

export default App;
