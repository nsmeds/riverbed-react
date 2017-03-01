import React, { Component } from 'react';
import axios from 'axios';
import Contributors from './Contributors';
import MainContent from './MainContent';

const Home = props => {
  let results = props.data;
  console.log('props', props);

  return (
    <div>
      <Contributors props={props}/>
      <MainContent props={props}/>
    </div>
  )
}

/*class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      issue: this.props
    };
    console.log('this.props', this.props);
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    axios.get(`http://localhost:3001/api/posts`)
      .then(response => {
        this.setState({
          posts: response.data,
          issue: this.props
        });
      })
      .catch(error => {
        console.log('Error: could not GET posts. ', error);
      });
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
}*/

export default Home;