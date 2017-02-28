import React from 'react';

const MainContent = props => {

    let results = props.data;
    let posts = results.map(post => 
        <div className="item" key={post._id} id={post._id}>
            <h3>{post.title}</h3>
            <h5>by {post.author.name}</h5>
            <p>{post.text}</p>
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