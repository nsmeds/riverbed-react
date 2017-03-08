import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import NewAuthor from './NewAuthor';
import NewIssue from './NewIssue';

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            author: '',
            issue: '',
            authors: [],
            issues: [],
            hideNewauthor: true,
            hideNewissue: true
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitPost = this.handleSubmitPost.bind(this);
        this.handleAddAuthor = this.handleAddAuthor.bind(this);
        this.handleAddIssue = this.handleAddIssue.bind(this);
        this.getAuthors = this.getAuthors.bind(this);
        this.getIssues = this.getIssues.bind(this);

    }

    componentDidMount() {
        this.getAuthors();
        this.getIssues();
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
            // clear input fields
            this.setState({
                title: '',
                text: '',
                author: '',
                issue: ''
            });
            console.log('Successful POST to /posts: ', response);
        })
        .catch(error => {
            console.log('Could not POST to /posts: ', error)
        })
    }
    
    handleAddAuthor(event) {
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

    handleAddIssue(event) {
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
                ReactDOM.render(<NewAuthor {...this.props} />, document.getElementById('new-author'))
            } else {
                this.setState({
                    authors: response.data
                });
            }
        })
        .then(() => {
            this.setState({
                author: this.state.authors[0]._id
            })
        })
        .catch(error => {
            console.log('Error: could not GET authors. ', error);
        })
    }

    getIssues = () => {
        axios.get(`http://localhost:3001/api/issues`)
        .then(response => {
            // If no issues in DB, render NewIssue component by default.
            if (!response.data.length) {
                ReactDOM.render(<NewIssue {...this.props} />, document.getElementById('new-issue'))
            } else {
                this.setState({
                    issues: response.data,
                });
            }
        })
        .then(() => {
            this.setState({
                issue: this.state.issues[0]._id
            })
        })
        .catch(error => {
            console.log('Error: could not GET issues. ', error);
        })
    }


    render() {
        
        let authorList = this.state.authors.map(author => 
            <option key={author._id} value={author._id}>{author.name}</option>
        );

        let issueList = this.state.issues.map(issue => 
            <option key={issue._id} value={issue._id}>{issue.title}</option>
        );


        return (
            <div className="menu-item">
                <form className="form new-post-form" onSubmit={this.handleSubmitPost}>
                    <h5>New Post</h5>
                    <label>Title: <input type="text" name="title" value={this.state.title} onChange={this.handleInputChange} /></label>
                    <label>Author:         
                        <select name="author" value={this.state.author} onChange={this.handleInputChange}>
                            {authorList}
                            <option value="new">Add New ... </option>
                        </select>
                    </label>
                    <div id="new-author" className={this.state.hideNewauthor ? 'hidden' : ''}></div>
                    <label>Issue: 
                        <select name="issue" value={this.state.issue} onChange={this.handleInputChange}>
                            {issueList}
                            <option value="new">Add New ... </option>
                        </select>
                    </label>
                    <div id="new-issue" className={this.state.hideNewissue ? 'hidden' : ''}></div>
                    <label>Content: <textarea name="text" value={this.state.text} onChange={this.handleInputChange}></textarea></label>
                    <button className="button">Submit</button>
                </form>
            </div>
        );
    }
}

export default Admin;