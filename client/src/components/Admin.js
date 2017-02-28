import React, { Component } from 'react';
import axios from 'axios';

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            author: '',
            issue: '',
            authors: [],
            issues: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getAuthors();
        this.getIssues();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('this.state', this.state);
        axios.post('http://localhost:3001/api/posts', {
            title: this.state.title,
            text: this.state.text,
            author: this.state.author,
            issue: this.state.issue
        })
        .then(response => {
            console.log('Successful POST to /posts: ', response);
        })
        .catch(error => {
            console.log('Could not POST to /posts: ', error)
        })
    }

    getAuthors = () => {
        axios.get(`http://localhost:3001/api/authors`)
        .then(response => {
            this.setState({
                authors: response.data
            });
        })
        .catch(error => {
            console.log('Error: could not GET posts. ', error);
        })
    }

    getIssues = () => {
        axios.get(`http://localhost:3001/api/issues`)
        .then(response => {
            this.setState({
                issues: response.data
            });
        })
        .catch(error => {
            console.log('Error: could not GET posts. ', error);
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
                <form className="form new-post-form" onSubmit={this.handleSubmit}>
                    <h5>New Post</h5>
                    <label>Title: <input type="text" name="title" value={this.state.title} onChange={this.handleInputChange} /></label>
                    <label>Author:         
                        <select name="author" value={this.state.author} onChange={this.handleInputChange}>
                            {authorList}
                        </select>
                    </label>
                    <label>Issue: 
                        <select name="issue" value={this.state.issue} onChange={this.handleInputChange}>
                            {issueList}
                        </select>
                    </label>
                    <label>Content: <textarea name="text" value={this.state.text} onChange={this.handleInputChange}></textarea></label>
                    <button className="button">Submit</button>
                </form>
            </div>
        );
    }
}

export default Admin;