import React from 'react';
import { Link } from 'react-router';

const Contributors = props => {
    let results = props.currentIssue.posts;
    let posts = results.map((post, index) => 
        <Link to={`#${post._id}`} key={index}>
            <li key={post._id}>
                {post.author.name}
            </li>
        </Link>
    );

    return (
        <div id="issue-desc" className="bg-blend">
            {props.issues.length ? <span>New Writing By</span> : <span className="welcome">Welcome! Please visit <Link to="admin">Admin</Link> to add content.</span>}
            <ul id="contributors" className="nav-ul">
                {posts}
            </ul>
        </div>
    );
}

export default Contributors;