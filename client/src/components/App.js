import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Contributors from './Contributors';

class App extends Component {

  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    axios.get(`http://localhost:3001/api/posts`)
      .then(response => {
        this.setState({
          posts: response.data
        });
      })
      .catch(error => {
        console.log('Error: could not GET posts. ', error);
      })
  }


  render() {
    console.log(this.state.posts);
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
        <Contributors data={this.state.posts} />
        { this.props.children }
      </div>
    );
  }
}

export default App;
