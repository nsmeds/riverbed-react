import React, { Component } from 'react';
import axios from 'axios';
import Contributors from './Contributors';
import MainContent from './MainContent';

class Home extends Component {

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
        return (
            <div>
                <Contributors data={this.state.posts} />
                <MainContent data={this.state.posts} />
                {this.props.children}
            </div>
        );
    }
}

export default Home;