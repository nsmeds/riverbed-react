import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import NewAuthor from './NewAuthor';
import NewIssue from './NewIssue';

const Admin = props => {

    // constructor(props) {
    //     super(props);
    //     props = {
    //         title: props.title,
    //         text: props.text,
    //         author: props.author,
    //         issue: props.issue,
    //         authors: [],
    //         issues: props.issues,
    //         handleSubmitPost: props.handleSubmitPost,
    //         hideNewauthor: true,
    //         hideNewissue: true,
    //         currentIssue: props.currentIssue,
    //         handleInputChange: props.handleInputChange
    //     };
    //     handleSubmitPost = props.handleSubmitPost;
    //     handleInputChange = props.handleInputChange;
    //     handleAddAuthor = handleAddAuthor;
    //     handleAddIssue = handleAddIssue;
    //     getAuthors = getAuthors;
    //     getIssues = getIssues;

    // }

    // componentWillMount() {
        console.log('props from Admin', props);
    // }

    // componentDidMount() {
    //     getAuthors();
    //     getIssues();
    // }

    


    // render() {
        
        let authorList = props.authors.map(author => 
            <option key={author._id} value={author._id}>{author.name}</option>
        );

        let issueList = props.issues.map(issue => 
            <option key={issue._id} value={issue._id}>{issue.title}</option>
        );


        return (
            <div id="admin" className="menu-item">
                <h2>ADMIN</h2>
                <form className="form new-post-form" onSubmit={props.handleSubmitPost}>
                    <h5>New Post</h5>
                    <label><span>Title:</span><input type="text" name="title" value={props.title} onChange={props.handleInputChange} /></label>
                    <label><span>Author:</span>         
                        <select name="author" value={props.author} onChange={props.handleInputChange}>
                            {authorList}
                            <option value="new">Add New ... </option>
                        </select>
                    </label>
                    <div id="new-author" className={props.hideNewauthor ? 'hidden' : ''}></div>
                    <label><span>Issue:</span>
                        <select name="issue" value={props.issue} onChange={props.handleInputChange}>
                            {issueList}
                            <option value="new">Add New ... </option>
                        </select>
                    </label>
                    <div id="new-issue" className={props.hideNewissue ? 'hidden' : ''}></div>
                    <label><span>Content:</span><textarea name="text" value={props.text} onChange={props.handleInputChange}></textarea></label>
                    <button className="button">Submit</button>
                </form>
            </div>
        );
    }
// }

export default Admin;