import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import axios from 'axios';
import smoothScroll from 'smooth-scroll';
import NewAuthor from './NewAuthor';
import NewIssue from './NewIssue';
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
            roles: [],
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
            editorState: EditorState.createEmpty(),

            // map functions to state so that react-router v3 will pass them down as props via clonedElement (see render method of App.js)
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
            onChange: this.onChange,
            handleKeyCommand: this.handleKeyCommand,
            processPost: this.processPost,
            processPosts: this.processPosts
            // focus: this.focus,
            // _onBoldClick: this._onBoldClick
        };
  }

    componentDidMount() {
        this.getCurrentIssue();
        // this.checkToken();
        smoothScroll.init({selector: 'a[href^="#"]'});
    }
  
    onChange = (editorState) => {
        this.setState({editorState});
    }

    getCurrentIssue = () => {
        axios.get('/api/issues')
        .then(response => {
            if (!response.data.length) {
                this.setState({
                    loading: false
                });
            } else {
                let curr = response.data.find(issue => issue.isCurrentIssue === true);
                if (!curr) {                    
                    this.processPosts(response.data[0]);
                    this.setState({
                        currentIssue: response.data[0],
                        loading: false,
                        issues: response.data
                    });
                    let issues = this.state.issues;
                    issues[0].isCurrentIssue = true;
                    this.setState({
                        issues
                    });
                } else {
                    this.processPosts(curr);
                    this.setState({
                        issues: response.data,
                        currentIssue: curr,
                        loading: false
                    });
                }
            }
        })
        .catch(error => {
            console.log('Error: could not GET current issue. ', error);
        })
    }

    convertToEditor = post => {
        let rawdata = JSON.parse(post.text);
        let contentState = convertFromRaw(rawdata);
        let editorState = EditorState.createWithContent(contentState, null);
        post.text = editorState;
        return post;
    }

    processPosts = currentIssue => {
        if (!currentIssue) return;
        let results = currentIssue.posts;
        results.map(post => {
            return this.convertToEditor(post);
        })
    }

    processPost = res => {
        let post = res.data;
        this.convertToEditor(post);
    };

    handleKeyCommand = command => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    // _onBoldClick = event => {
    //     event.preventDefault();
    //     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    // }

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
        const currIndex = this.state.issues.findIndex(issue => issue.isCurrentIssue === true);
        axios.put(`/api/issues/${this.state.issues[currIndex]._id}`, {
            isCurrentIssue: false
        })
        .then(response => {
            let issues = this.state.issues;
            issues[currIndex].isCurrentIssue = false;
            this.setState({
                [name]: value,
                currentIssue: response.data,
                issues
            });
            const newCurrIndex = this.state.issues.findIndex(issue => issue._id === value);
            axios.put(`/api/issues/${this.state.issues[newCurrIndex]._id}`, {
                isCurrentIssue: true
            })
                .then(response => {
                    let issues = this.state.issues;
                    issues[newCurrIndex].isCurrentIssue = true;
                    this.setState({
                        currentIssue: response.data,
                        issues
                    });
                    this.processPosts(this.state.currentIssue);
                })
                .catch(error => console.log('could not PUT new current issue', error));
        })
        .catch(error => console.log('error updating current issue', error));
    }
    
    handleSubmitPost = event => {
        event.preventDefault();
        // if (this.checkToken() === false) return;
        let token = Auth.getToken();
        if (token === false) return;
        // console.log('token', token);
        let config = {
            headers: {'Authorization': token}
        };
        let rawdata = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
        axios.post('/api/posts', {
            title: this.state.title,
            text: rawdata,
            author: this.state.author,
            issue: this.state.issue,
        }, 
        config
        )
        .then(response => {
            this.processPost(response);
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
                text: '',
                editorState: EditorState.createEmpty(),
            });
            console.log('Successful POST to /posts: ', response);
        })
        .catch(error => {
            console.log('Could not POST to /posts: ', error)
        })
    }

    checkToken = () => {
        let token = Auth.getToken();
        if (!token) {
            this.logout();
            return false;
        };
        let config = {
            headers: {'Authorization': token}
        };
        axios.get('/api/auth/verify', config)
            .then(this.setState({isLoggedIn: true}))
            .catch(() => this.logout());
    }

    logout = () => {
        this.setState({
            isLoggedIn: false,
            username: '',
            password: ''
        });
        Auth.deauthenticate();
    }

    handleLogin = event => {
        event.preventDefault();
        axios.post('/api/auth/signin', {
            username: this.state.username,
            password: this.state.password
        })
        .then(res => {
            Auth.authenticateUser(res.data.token);
            console.log('res.data from handleLogin', res.data);
            this.setState({
                isLoggedIn: true,
                roles: res.data.roles
            });
        })
        .catch(error => {
            console.log('Could not log in: ', error);
        })
    }

    handleAddAuthor = event => {
        event.preventDefault();
        axios.post('/api/authors', {
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
        axios.post('/api/issues', {
            title: this.state.issue,
            isCurrentIssue: isCurrent
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
        axios.get('/api/authors')
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

        let clonedChildren = React.cloneElement(this.props.children, this.state);
        let issueIndex = this.state.issues.findIndex(issue => issue._id === this.state.currentIssue._id) + 1;

        return ( 
            <div>
                <div id="header">
                    <Link to="/"><h1>Riverbed</h1></Link>
                    <h4>{this.state.currentIssue.title} | Vol. 1, No. {issueIndex}</h4>
                </div>
                <nav className="nav">
                    <ul id="nav-menu-ul" className="nav-ul">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/issues">Issues</Link></li>
                        <li><Link to="/admin">Account</Link></li>
                    </ul>
                </nav>
                <div id="main">
                    {(this.state.loading) ? <p>Loading ... </p> : <div>{this.props.children && clonedChildren}</div>}
                </div>
            </div>
        );
    }
}

export default App;
