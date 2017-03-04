import React from 'react';
import { Link } from 'react-router';


const Contributors = props => {
    console.log('props from Contributor', props);
    let results = props.posts;
    let posts = results.map((post, index) => 
        <Link to={`#${post._id}`} key={index}>
            <li key={post._id}>
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