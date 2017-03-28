import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import smoothScroll from 'smooth-scroll';
import NewAuthor from './NewAuthor';
import NewIssue from './NewIssue';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentIssue: {
        _id: null,
        title: '',
        posts: []
      },
      user: {
        username: '',
        password: ''
      },
      title: '',
      author: '',
      text: '',
      issue: '',
      authors: [],
      issues: [],
      hideNewauthor: true,
      hideNewissue: true,
      loading: true,
      handleSubmitPost: this.handleSubmitPost,
      handleInputChange: this.handleInputChange,
      getCurrentIssue: this.getCurrentIssue,
      handleLogin: this.handleLogin,
      handleAddAuthor: this.handleAddAuthor,
      handleAddIssue: this.handleAddIssue,
      getAuthors: this.getAuthors,
      getIssues: this.getIssues
    };
        
    this.getAuthors = this.getAuthors.bind(this);
    this.getIssues = this.getIssues.bind(this);
    this.handleAddAuthor = this.handleAddAuthor.bind(this);
    this.handleAddIssue = this.handleAddIssue.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitPost = this.handleSubmitPost.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
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


  handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const hidden = 'hideNew' + target.name;
        console.log('value: ', value);
        console.log('event: ', event);
        console.log('name: ', name);
        console.log('this', this);
        // console.log('this.state.user', this.state.user);

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

  handleSubmitPost = event => {
        event.preventDefault();
        axios.post('http://localhost:3001/api/posts', {
            title: this.state.title,
            text: this.state.text,
            author: this.state.author,
            issue: this.state.issue
        })
        .then(response => {
            // console.log(this.state.currentIssue._id, this.state.issue);
            // console.log('response.data', response.data);
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
                console.log('this', this);
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

  handleLogin = event => {
    event.preventDefault();
    // console.log('user from handleLogin', user);
    axios.post('http://localhost:3001/api/auth/signin', {
      user: this.state.user
    })
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log('Could not log in: ', error);
    })
  }

    handleAddAuthor = event => {
        event.preventDefault();
        axios.post('http://localhost:3001/api/authors', {
            name: this.state.name,
            bio: this.state.bio
        })
        .then(response => {
            this.setState({
                authors: this.state.authors.concat([response.data]),
                author: response.data._id,
                hideNewauthor: true
            });
            console.log('Successful POST to /authors: ', response);
        })
        .catch(error => {
            console.log('Could not POST to /authors: ', error)
        })
    }

    handleAddIssue = event => {
        event.preventDefault();
        axios.post('http://localhost:3001/api/issues', {
            title: this.state.issue,
        })
        .then(response => {
            this.setState({
                issues: this.state.issues.concat([response.data]),
                issue: response.data._id,
                hideNewissue: true
            });
            console.log('Successful POST to /issues: ', response);
        })
        .catch(error => {
            console.log('Could not POST to /issues: ', error)
        })
    }

    getAuthors = () => {
        axios.get(`http://localhost:3001/api/authors`)
        .then(response => {
            // If no authors in DB, render NewAuthor component by default.
            if (!response.data.length) {
                ReactDOM.render(<NewAuthor {...this.props} handleInputChange={this.handleInputChange} handleAddAuthor={this.handleAddAuthor} />, document.getElementById('new-author'));
                this.setState({
                    hideNewauthor: false
                });
            } else {
                this.setState({
                    authors: response.data,
                    author: response.data[0]._id
                })
            }
        })
        .catch(error => {
            console.log('Error: could not GET authors. ', error);
        })
    }

    getIssues = () => {
            // If no issues in DB, render NewIssue component by default.
            if (!this.state.issues.length) {
                ReactDOM.render(<NewIssue {...this.props} handleInputChange={this.handleInputChange} handleAddIssue={this.handleAddIssue} />, document.getElementById('new-issue'));
                this.setState({
                    hideNewissue: false
                });
            } else {
                this.setState({
                    issue: this.state.issues[0]._id
                });
            }
    }

  render() {

    // console.log('currentIssue from App', this.state.currentIssue)

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
                  <li><Link to="/admin">Account</Link></li>
              </ul>
          </nav>
        </div>
        <div id="main">
          {
            (this.state.loading) ? <p>Loading ... </p> : <div>{this.props.children && clonedChildren}</div>
          }
        </div>
      </div>
    );
  }
}

export default App;
