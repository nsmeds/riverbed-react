import React from 'react';
import PostEditor from './PostEditor';

const Admin = props => {
        
    let authorList = props.authors.map(author => 
        <option key={author._id} value={author._id}>{author.name}</option>
    );

    let issueList = props.issues.map(issue => 
        <option key={issue._id} value={issue._id}>{issue.title}</option>
    );

    return (
        <div id="admin" className="menu-item">
                <h2>ADMIN</h2>
                <div className="form-wrap">
                    <form className="form new-post-form" onSubmit={props.handleSubmitPost}>
                        <h5>New Post</h5>
                        <label><span className="label-span">Title:</span><input type="text" name="title" value={props.title} onChange={props.handleInputChange} /></label>
                        <label><span className="label-span">Author:</span>         
                            <select name="author" value={props.author} onChange={props.handleInputChange}>
                                {authorList}
                                <option value="new">Add New ... </option>
                            </select>
                        </label>
                        <div id="new-author" className={props.hideNewauthor ? 'hidden' : ''}></div>
                        <label><span className="label-span">Issue:</span>
                            <select name="issue" value={props.issue} onChange={props.handleInputChange}>
                                {issueList}
                                <option value="new">Add New ... </option>
                            </select>
                        </label>
                        <div id="new-issue" className={props.hideNewissue ? 'hidden' : ''}></div>
                        <label>
                            <span className="label-span">Text: </span>
                            <PostEditor {...props} editorState={props.editorState} onChange={props.onChange}/>
                        </label>
                        <button className="button">Submit</button>
                    </form>
                    <div>
                        <span className="label-span select-span">Current issue: </span>
                        <select name="currentIssue" value={props.currentIssue._id} onChange={props.updateCurrentIssue}>
                            {issueList}
                        </select>
                    </div>
                </div>
                <button onClick={props.logout} className="button">Log Out</button>
        </div>
    );
}

export default Admin;