import React from 'react';
import axios from 'axios';

const NewAuthor = props => {

    let newAuthor = {
        name: props.name,
        bio: props.bio
    }

    function handleAddAuthor(event) {
        event.preventDefault();
        axios.post('http://localhost:3001/api/authors', {
            name: newAuthor.name,
            bio: newAuthor.bio
        })
        .then(response => {
            console.log('Successful POST to /authors: ', response);
        })
        .catch(error => {
            console.log('Could not POST to /authors: ', error)
        })
    }

    function handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        newAuthor[name] = value;

        console.log(newAuthor);
    }

    return (
        <div className="form sub-form">
            <span>New Author</span>
            <label>Name: 
                <input type="text" name="name" value={newAuthor.name} onChange={handleInputChange} />
            </label>
            <label>Bio: 
                <input type="text" name="bio" value={newAuthor.bio} onChange={handleInputChange} />
            </label>
            <button className="button" onClick={handleAddAuthor}>Add</button>
        </div>
    )
}

export default NewAuthor;