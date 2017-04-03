import React from 'react';

const NewAuthor = props => {

    // console.log('props NewAuthor', props);

    let newAuthor = {
        name: props.name,
        bio: props.bio
    }

    return (
        <div id="add-author" className="sub-form">
            <h5>New Author</h5>
            <label><span>Name:</span> 
                <input type="text" name="name" value={newAuthor.name} onChange={props.handleInputChange} />
            </label>
            <label><span>Bio:</span>
                <input type="text" name="bio" value={newAuthor.bio} onChange={props.handleInputChange} />
            </label>
            <button className="button" onClick={props.handleAddAuthor}>Add</button>
        </div>
    )
}

export default NewAuthor;