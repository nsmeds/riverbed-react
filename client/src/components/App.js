import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import smoothScroll from 'smooth-scroll';
import Admin from './Admin';
import NewAuthor from './NewAuthor';
import NewIssue from './NewIssue';

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentIssue: {
        _id: null,
        title: '',
        posts: []
      },
      title: '',
      author: '',
      text: '',
      issue: '',
      issues: [],
      loading: true,
      handleSubmitPost: this.handleSubmitPost,
      handleInputChange: this.handleInputChange
    };
        
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitPost = this.handleSubmitPost.bind(this);
  }

  componentDidMount() {
    this.getCurrentIssue();
    smoothScroll.init({selector: 'a[href^="#"]'});
  }
  

  getCurrentIssue = () => {
    axios.get('http://localhost:3001/api/issues')
      .then(response => {
        let currRef = response.data[response.data.length - 1];
        if (!response.data.length) {
          this.setState({
            loading: false
          });
        } else {
          this.setState({
            issues: response.data
          })
          axios.get(`http://localhost:3001/api/issues/${currRef._id}`)
            .then(response => {
              this.setState({
                currentIssue: response.data,
                loading: false
              });
            })
        }
      })
      .catch(error => {
        console.log('Error: could not GET current issue. ', error);
      })
  }


  handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const hidden = 'hideNew' + target.name;

        if (value === 'new') {
            this.setState({
                [hidden]: false
            })
            if (name === 'author') {
                    ReactDOM.render(<NewAuthor {...this.props} handleInputChange={this.handleInputChange} handleAddAuthor={this.handleAddAuthor} />, document.getElementById(`new-${name}`));
                } else {
                    ReactDOM.render(<NewIssue {...this.props} handleInputChange={this.handleInputChange} handleAddIssue={this.handleAddIssue} />, document.getElementById(`new-${name}`))
                }
            } else {
                this.setState({
                    [name]: value
                });
            }
    }

  handleSubmitPost(event) {
        event.preventDefault();
        axios.post('http://localhost:3001/api/posts', {
            title: this.state.title,
            text: this.state.text,
            author: this.state.author,
            issue: this.state.issue
        })
        .then(response => {
            console.log(this.state.currentIssue._id, this.state.issue);
            console.log('response.data', response.data);
            // this.setState({
            //       currentIssue: {
            //           posts: this.state.currentIssue.posts.concat([response.data])
            //       }              
            // });
            if (this.state.currentIssue._id === this.state.issue) {
                this.setState({
                    currentIssue: {
                        posts: this.state.currentIssue.posts.concat([response.data])
                    }
                });
                console.log('currentIssue', this.state.currentIssue);
            }

            // clear input fields
            this.setState({
                title: '',
                text: ''
            });
            console.log('Successful POST to /posts: ', response);
        })
        .catch(error => {
            console.log('Could not POST to /posts: ', error)
        })
    }

  render() {

    let clonedChildren = React.cloneElement(this.props.children, this.state)

    return ( 
      <div>
        <div id="header">
          <Link to="/"><h1>Riverbed</h1></Link>
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
        <div id="main">
          {
            (this.state.loading) ? <p>Loading ... </p> : <div>{clonedChildren}</div>
          }
        </div>
      </div>
    );
  }
}

export default App;
