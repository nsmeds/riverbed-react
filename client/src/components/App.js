import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import smoothScroll from 'smooth-scroll';
import NewAuthor from './NewAuthor';
import NewIssue from './NewIssue';
import { Draft, Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import Auth from '../modules/Auth';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        currentIssue: {
            _id: null,
            title: '',
            posts: []
        },
        username: '',
        password: '',
        isLoggedIn: false,
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
        checkToken: this.checkToken,
        logout: this.logout,
        handleAddAuthor: this.handleAddAuthor,
        handleAddIssue: this.handleAddIssue,
        getAuthors: this.getAuthors,
        getIssues: this.getIssues,
        updateCurrentIssue: this.updateCurrentIssue,
        editorState: EditorState.createEmpty(),
        onChange: this.onChange
    };

        
    this.updateCurrentIssue = this.updateCurrentIssue.bind(this);
    this.getAuthors = this.getAuthors.bind(this);
    this.getIssues = this.getIssues.bind(this);
    this.handleAddAuthor = this.handleAddAuthor.bind(this);
    this.handleAddIssue = this.handleAddIssue.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitPost = this.handleSubmitPost.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.checkToken = this.checkToken.bind(this);
    this.logout = this.logout.bind(this);
    this.onChange = this.onChange.bind(this);
  }

    componentDidMount() {
        this.getCurrentIssue();
        this.checkToken();
        smoothScroll.init({selector: 'a[href^="#"]'});
    }
  
    onChange = (editorState) => {
        this.setState({editorState});
    }

    getCurrentIssue = () => {
        axios.get('http://localhost:3001/api/issues')
        .then(response => {
            if (!response.data.length) {
                this.setState({
                    loading: false
                });
            } else {
                let curr = response.data.find(issue => issue.isCurrentIssue === true);
                this.processPosts(curr);
                // console.log('curr', curr);
                this.setState({
                    issues: response.data,
                    currentIssue: curr,
                    loading: false
                });
            }
        })
        .catch(error => {
            console.log('Error: could not GET current issue. ', error);
        })
    }

  processPosts = currentIssue => {
        let results = currentIssue.posts;
        // console.log('results', results);
        results.map(post => {
            let rawdata = JSON.parse(post.text);
            // console.log('rawdata', rawdata);
            let contentState = convertFromRaw(rawdata);
            // console.log('processed', processed);
            let editorState = EditorState.createWithContent(contentState);
            post.text = editorState;
            return post;
        })
  }


  handleInputChange = event => {
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

    updateCurrentIssue = event => {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let curr = this.state.issues.find(issue => issue.isCurrentIssue === true);
        // console.log('curr - should only ever be one', curr);
        axios.put(`http://localhost:3001/api/issues/${curr._id}`, {
            isCurrentIssue: false
        })
        .then(response => {
            // console.log('response.data', response.data);
            this.setState({
                // [curr]: response.data,
                [name]: value,
                currentIssue: response.data
            });
            // console.log('curr', curr);
            // console.log('value', value);
            // console.log('this.state.issues', this.state.issues);
            const newCurr = this.state.issues.filter(issue => issue._id === value)[0];
            // console.log('newCurr', newCurr);
            axios.put(`http://localhost:3001/api/issues/${newCurr._id}`, {
                isCurrentIssue: true
            })
                .then(response => {
                    this.setState({
                        currentIssue: response.data,
                        // [newCurr]: {
                        //     isCurrentIssue: true
                        // }
                    });
                    this.processPosts(this.state.currentIssue);
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    }

  handleSubmitPost = event => {
        event.preventDefault();
        let rawdata = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
        // console.log(this.rawdata);
        axios.post('http://localhost:3001/api/posts', {
            title: this.state.title,
            // text: this.state.text,
            text: rawdata,
            author: this.state.author,
            issue: this.state.issue
        })
        .then(response => {
            if (this.state.currentIssue._id === this.state.issue) {
                this.setState({
                    currentIssue: {
                        posts: this.state.currentIssue.posts.concat([response.data]),
                        title: response.data.issue.title
                    }
                });
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

    checkToken = () => {
        let token = localStorage.getItem('token');
        if (!token) return this.logout();
        let config = {
            headers: {'Authorization': token}
        };
        axios.get('http://localhost:3001/api/auth/verify', config)
            .then(this.setState({isLoggedIn: true}))
            .catch(() => this.logout());
    }

    logout = () => {
        this.setState({
            isLoggedIn: false
        });
        Auth.deauthenticate();
    }

    handleLogin = event => {
        event.preventDefault();
        axios.post('http://localhost:3001/api/auth/signin', {
            username: this.state.username,
            password: this.state.password
        })
        .then(res => {
            Auth.authenticateUser(res.data.token);
            this.setState({
                isLoggedIn: true
            });
            // console.log('res', res);
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
        let isCurrent = false;
        if (!this.state.issues.length) {
            isCurrent = true
            }
        axios.post('http://localhost:3001/api/issues', {
            title: this.state.issue,
            isCurrentIssue: isCurrent
        })
        .then(response => {
            // console.log(response);
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
