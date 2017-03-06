import React from 'react';

const NewAuthor = props => {

    return (
        <form className="form sub-form">
            <h5>New Author</h5>
            <label>Name: 
                <input type="text" name="author" value={props.author} />
            </label>
            <label>Bio: 
                <input type="text" name="author" value={props.author} />
            </label>
            <button className="button">Add</button>
        </form>
    )
}

export default NewAuthor;