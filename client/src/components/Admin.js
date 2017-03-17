import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import NewAuthor from './NewAuthor';
import NewIssue from './NewIssue';

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            text: this.props.text,
            author: this.props.author,
            issue: this.props.issue,
            keyl: this.props.keyl,
            authors: [],
            issues: this.props.issues,
            handleSubmitPost: this.props.handleSubmitPost,
            hideNewauthor: true,
            hideNewissue: true,
            currentIssue: this.props.currentIssue,
            handleInputChange: this.props.handleInputChange
        };
        this.handleSubmitPost = this.props.handleSubmitPost.bind(this);
        this.handleInputChange = this.props.handleInputChange.bind(this);
        this.handleAddAuthor = this.handleAddAuthor.bind(this);
        this.handleAddIssue = this.handleAddIssue.bind(this);
        this.getAuthors = this.getAuthors.bind(this);
        this.getIssues = this.getIssues.bind(this);

    }

    componentWillMount() {
        console.log('this.props', this.props);
    }

    componentDidMount() {
        this.getAuthors();
        this.getIssues();
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
        
        let authorList = this.state.authors.map(author => 
            <option key={author._id} value={author._id}>{author.name}</option>
        );

        let issueList = this.state.issues.map(issue => 
            <option key={issue._id} value={issue._id}>{issue.title}</option>
        );


        return (
            <div id="admin" className="menu-item">
                <h2>ADMIN</h2>
                <form className="form new-post-form" onSubmit={this.handleSubmitPost}>
                    <h5>New Post</h5>
                    <label><span>Title:</span><input type="text" name="title" value={this.state.title} onChange={this.props.handleInputChange.bind(this)} /></label>
                    <label><span>Author:</span>         
                        <select name="author" value={this.state.author} onChange={this.props.handleInputChange.bind(this)}>
                            {authorList}
                            <option value="new">Add New ... </option>
                        </select>
                    </label>
                    <div id="new-author" className={this.state.hideNewauthor ? 'hidden' : ''}></div>
                    <label><span>Issue:</span>
                        <select name="issue" value={this.state.issue} onChange={this.props.handleInputChange.bind(this)}>
                            {issueList}
                            <option value="new">Add New ... </option>
                        </select>
                    </label>
                    <div id="new-issue" className={this.state.hideNewissue ? 'hidden' : ''}></div>
                    <label><span>Content:</span><textarea name="text" value={this.state.text} onChange={this.props.handleInputChange.bind(this)}></textarea></label>
                    <button className="button">Submit</button>
                </form>
            </div>
        );
    }
}

export default Admin;