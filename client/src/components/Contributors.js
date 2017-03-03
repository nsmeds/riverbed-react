import React from 'react';
import { Link } from 'react-router';


const Contributors = props => {
    console.log('props from Contributor', props.props.props.posts);
    let results = props.props.props.posts;
    let posts = results.map(post => 
        <Link to={`#${post._id}`} key={post._id}>
            <li key={post._id} id={post._id}>
                {post.author.name}
            </li>
        </Link>
    );

    return (
        <div id="issue-desc" className="bg-blend">
            <span>New Writing By</span>
            <ul id="contributors" className="nav-ul">
                {posts}
            </ul>
        </div>
    );
}

export default Contributors;