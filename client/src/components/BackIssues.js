import React from 'react';
import { Link } from 'react-router';

const BackIssues = props => {

    let issueList = props.issues.map(issue => 
        <option key={issue._id} value={issue._id}>{issue.title}</option>
    );

    return (
        <div className="menu-item">
            <h2>Issues</h2>
            <p className="description-paragraph">To view a different issue, choose one from the list below.</p>
            <select name="currentIssue" value={props.currentIssue._id} onChange={props.updateCurrentIssue}>
                {issueList}
            </select>
            <Link to="/"><button className="button">Go!</button></Link>
        </div>
    );
}


export default BackIssues;