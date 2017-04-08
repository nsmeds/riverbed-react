import React from 'react';
import { Editor } from 'draft-js';

const MainContent = props => {
    
    // console.log('props from MainContent', props);

    let results = props.currentIssue.posts;

    let posts = results.map(post => 
        <div className="item" key={post._id} id={post._id}>
            <h3>{post.title}</h3>
            <h5>by {post.author.name}</h5>
            <Editor editorState={post.text} readOnly />
            <p className="bio">{post.author.bio}</p>
        </div>
    );

    return (
        <div id="main-content">
            {posts}
        </div>
    )
}

export default MainContent;