import React from 'react';
import axios from 'axios';

const NewIssue = props => {

    let newTitle;

    function handleAddIssue(event) {
        event.preventDefault();
        axios.post('http://localhost:3001/api/issues', {
            title: newTitle,
        })
        .then(response => {
            console.log('Successful POST to /issues: ', response);
        })
        .catch(error => {
            console.log('Could not POST to /issues: ', error)
        })
    }

    function handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        newTitle = value;
    }

    console.log('props from NewIssue', props);

    return (
        <div className="sub-form">
            <label>Issue Date: 
                <input type="text" name="title" value={newTitle} onChange={handleInputChange}/>
            </label>
            <button className="button" onClick={handleAddIssue}>Add</button>
        </div>
    )
}

export default NewIssue;